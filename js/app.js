/**
 * 主应用逻辑 — 事件绑定、实时预览、文件上传（md/docx/pdf）、剪贴板复制
 */
(function () {
  'use strict';

  var convert = WxConverter.markdownToWechatHtml;
  var themeList = WxThemes.themeList;
  var currentTheme = 'minimal';
  var debounceTimer = null;

  // DOM refs
  var input = document.getElementById('markdown-input');
  var preview = document.getElementById('preview-content');
  var charCount = document.getElementById('char-count');
  var themeChips = document.getElementById('theme-chips');
  var fileInput = document.getElementById('file-input');
  var dropZone = document.getElementById('drop-zone');
  var dropOverlay = document.getElementById('drop-overlay');
  var loadingOverlay = document.getElementById('loading-overlay');
  var loadingText = document.getElementById('loading-text');

  // ==================== Toast ====================
  function showToast(msg, type) {
    var c = document.getElementById('toast-container');
    var t = document.createElement('div');
    t.className = 'toast toast-' + (type||'info');
    var icons = {success:'✅',error:'❌',info:'ℹ️'};
    t.innerHTML = '<span class="toast-icon">'+(icons[type]||icons.info)+'</span><span>'+msg+'</span>';
    c.appendChild(t);
    requestAnimationFrame(function(){t.classList.add('toast-show');});
    setTimeout(function(){t.classList.remove('toast-show');t.classList.add('toast-hide');setTimeout(function(){t.remove();},300);},2500);
  }

  // ==================== Loading ====================
  function showLoading(msg) { loadingText.textContent = msg || '正在解析...'; loadingOverlay.classList.add('loading-show'); }
  function hideLoading() { loadingOverlay.classList.remove('loading-show'); }

  // ==================== 主题 ====================
  function renderThemeChips() {
    themeChips.innerHTML = '';
    themeList.forEach(function(t){
      var chip = document.createElement('button');
      chip.className = 'theme-chip' + (currentTheme===t.key?' theme-chip-active':'');
      chip.dataset.theme = t.key;
      chip.innerHTML = '<span class="theme-dot" style="background:'+t.color+'"></span>'+t.name;
      chip.addEventListener('click', function(){currentTheme=t.key;renderThemeChips();updatePreview();});
      themeChips.appendChild(chip);
    });
  }

  // ==================== 实时预览 ====================
  var previewWrapper = document.querySelector('.preview-wrapper');

  function syncPreviewBackground() {
    // 从当前主题的 container 样式中提取 background，同步到预览面板
    var s = WxThemes.getThemeStyles(currentTheme);
    var containerStyle = s.container || '';
    var bgMatch = containerStyle.match(/background\s*:\s*([^;]+)/);
    if (bgMatch) {
      previewWrapper.style.background = bgMatch[1].trim();
    } else {
      previewWrapper.style.background = '';
    }
  }

  function updatePreview() {
    var md = input.value;
    charCount.textContent = md.length + ' 字符';
    syncPreviewBackground();
    if (!md.trim()) {
      preview.innerHTML = '<div class="preview-placeholder"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><p>在左侧输入 Markdown 内容</p><p class="preview-placeholder-sub">支持 .md / .docx / .pdf 文件</p></div>';
      return;
    }
    preview.innerHTML = convert(md, currentTheme);
  }

  function debouncedUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updatePreview, 150);
  }

  // ==================== Word docx 转 Markdown ====================
  function htmlToMarkdown(html) {
    // 简易 HTML→Markdown 转换
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    var md = '';
    function walk(node) {
      if (node.nodeType === 3) { md += node.textContent; return; }
      if (node.nodeType !== 1) return;
      var tag = node.tagName.toLowerCase();
      var children = function(){Array.prototype.forEach.call(node.childNodes, walk);};
      switch(tag) {
        case 'h1': md += '\n# '; children(); md += '\n\n'; break;
        case 'h2': md += '\n## '; children(); md += '\n\n'; break;
        case 'h3': md += '\n### '; children(); md += '\n\n'; break;
        case 'h4': md += '\n#### '; children(); md += '\n\n'; break;
        case 'p': children(); md += '\n\n'; break;
        case 'strong': case 'b': md += '**'; children(); md += '**'; break;
        case 'em': case 'i': md += '*'; children(); md += '*'; break;
        case 'code': md += '`'; children(); md += '`'; break;
        case 'pre': md += '\n```\n'; children(); md += '\n```\n\n'; break;
        case 'ul': children(); md += '\n'; break;
        case 'ol': children(); md += '\n'; break;
        case 'li':
          var parent = node.parentElement;
          if (parent && parent.tagName.toLowerCase() === 'ol') {
            var idx = Array.prototype.indexOf.call(parent.children, node) + 1;
            md += idx + '. ';
          } else {
            md += '- ';
          }
          children(); md += '\n'; break;
        case 'a':
          md += '['; children(); md += '](' + (node.getAttribute('href')||'') + ')'; break;
        case 'img':
          md += '![' + (node.getAttribute('alt')||'') + '](' + (node.getAttribute('src')||'') + ')\n'; break;
        case 'br': md += '\n'; break;
        case 'blockquote': md += '> '; children(); md += '\n\n'; break;
        case 'table': md += '\n'; convertTable(node); md += '\n'; break;
        case 'hr': md += '\n---\n\n'; break;
        default: children();
      }
    }
    function convertTable(table) {
      var rows = table.querySelectorAll('tr');
      if (rows.length === 0) return;
      rows.forEach(function(row, ri) {
        var cells = row.querySelectorAll('td, th');
        md += '| ';
        cells.forEach(function(cell) { md += cell.textContent.trim() + ' | '; });
        md += '\n';
        if (ri === 0) {
          md += '| ';
          cells.forEach(function() { md += '--- | '; });
          md += '\n';
        }
      });
    }
    walk(tmp);
    return md.replace(/\n{3,}/g, '\n\n').trim();
  }

  function parseDocx(arrayBuffer) {
    showLoading('正在解析 Word 文档...');
    mammoth.convertToHtml({arrayBuffer: arrayBuffer})
      .then(function(result) {
        var md = htmlToMarkdown(result.value);
        input.value = md;
        updatePreview();
        hideLoading();
        showToast('Word 文档解析成功', 'success');
        if (result.messages.length > 0) {
          console.warn('mammoth warnings:', result.messages);
        }
      })
      .catch(function(err) {
        hideLoading();
        showToast('Word 文档解析失败: ' + err.message, 'error');
        console.error(err);
      });
  }

  // ==================== PDF 解析 ====================
  function parsePdf(arrayBuffer) {
    showLoading('正在解析 PDF 文件...');
    var pdfjsLib = window['pdfjs-dist/build/pdf'] || window.pdfjsLib;
    if (!pdfjsLib) {
      hideLoading();
      showToast('PDF 解析库加载失败', 'error');
      return;
    }
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

    pdfjsLib.getDocument({data: arrayBuffer}).promise
      .then(function(pdf) {
        var totalPages = pdf.numPages;
        var pagePromises = [];
        for (var p = 1; p <= totalPages; p++) {
          pagePromises.push(pdf.getPage(p).then(function(page) {
            return page.getTextContent().then(function(tc) {
              var pageText = '';
              var lastY = null;
              tc.items.forEach(function(item) {
                if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                  pageText += '\n';
                }
                pageText += item.str;
                lastY = item.transform[5];
              });
              return pageText;
            });
          }));
        }
        return Promise.all(pagePromises);
      })
      .then(function(pages) {
        var fullText = pages.join('\n\n---\n\n');
        // 尝试智能识别标题（单独一行、较短的文本）
        var lines = fullText.split('\n');
        var md = '';
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (!line) { md += '\n'; continue; }
          // 短行可能是标题
          if (line.length < 30 && i > 0 && lines[i-1].trim() === '' &&
              (i === lines.length-1 || lines[i+1].trim() === '')) {
            md += '## ' + line + '\n\n';
          } else {
            md += line + '\n';
          }
        }
        input.value = md.trim();
        updatePreview();
        hideLoading();
        showToast('PDF 解析成功（共 ' + pages.length + ' 页）', 'success');
      })
      .catch(function(err) {
        hideLoading();
        showToast('PDF 解析失败: ' + err.message, 'error');
        console.error(err);
      });
  }

  // ==================== 飞书云文档解析 ====================
  function importFeishuDoc() {
    var url = prompt('请输入飞书云文档公开链接：\n（请确保文档权限已设置为“获得链接的人可阅读”）', '');
    if (!url) return;
    if (!url.trim().startsWith('http')) {
      showToast('请输入有效的文档链接', 'error');
      return;
    }
    
    showLoading('正在解析飞书文档（这可能需要几秒钟）...');
    fetch('https://r.jina.ai/' + url.trim(), {
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(res) { 
      if (!res.ok) throw new Error('网络请求失败 (状态码 ' + res.status + ')');
      return res.json(); 
    })
    .then(function(json) {
      if (json && json.data && json.data.content) {
        input.value = json.data.content;
        updatePreview();
        hideLoading();
        showToast('飞书文档解析成功', 'success');
      } else {
        hideLoading();
        showToast('无法读取文档内容，请检查链接是否为公开可见', 'error');
      }
    })
    .catch(function(err) {
      hideLoading();
      showToast('解析失败: ' + err.message, 'error');
      console.error(err);
    });
  }

  // ==================== 文件处理 ====================
  function handleFile(file) {
    if (!file) return;
    var name = file.name.toLowerCase();
    var ext = name.substring(name.lastIndexOf('.'));

    if (ext === '.docx') {
      var reader = new FileReader();
      reader.onload = function(e) { parseDocx(e.target.result); };
      reader.onerror = function() { showToast('文件读取失败', 'error'); };
      reader.readAsArrayBuffer(file);
      return;
    }

    if (ext === '.pdf') {
      var reader2 = new FileReader();
      reader2.onload = function(e) { parsePdf(e.target.result); };
      reader2.onerror = function() { showToast('文件读取失败', 'error'); };
      reader2.readAsArrayBuffer(file);
      return;
    }

    // md / txt 等文本文件
    var reader3 = new FileReader();
    reader3.onload = function(e) {
      input.value = e.target.result;
      updatePreview();
      showToast('已加载: ' + file.name, 'success');
    };
    reader3.onerror = function() { showToast('文件读取失败', 'error'); };
    reader3.readAsText(file);
  }

  // ==================== 复制 ====================
  function copyRichText() {
    var md = input.value;
    if (!md.trim()){showToast('请先输入内容','info');return;}
    var html = convert(md, currentTheme);
    if (navigator.clipboard && window.ClipboardItem) {
      var blob = new Blob([html],{type:'text/html'});
      navigator.clipboard.write([new ClipboardItem({'text/html':blob})]).then(
        function(){showToast('已复制富文本，可直接粘贴到微信编辑器','success');},
        function(){fallbackCopy(html);}
      );
    } else { fallbackCopy(html); }
  }

  function fallbackCopy(html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = html;
    tmp.style.cssText = 'position:fixed;left:-9999px;';
    document.body.appendChild(tmp);
    var range = document.createRange();
    range.selectNodeContents(tmp);
    var sel = window.getSelection();
    sel.removeAllRanges(); sel.addRange(range);
    try{document.execCommand('copy');showToast('已复制','success');}
    catch(e){showToast('复制失败','error');}
    sel.removeAllRanges();
    document.body.removeChild(tmp);
  }

  function copyHtmlSource() {
    var md = input.value;
    if (!md.trim()){showToast('请先输入内容','info');return;}
    var html = convert(md, currentTheme);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(html).then(
        function(){showToast('HTML 源码已复制','success');},
        function(){showToast('复制失败','error');}
      );
    }
  }

  // ==================== 示例 ====================
  function loadSample() {
    input.value = [
      '# OpenClaw 安装指南',
      '',
      '## 功能亮点',
      '',
      '这款工具支持将 **Markdown** 文档一键转换为适配微信公众号的精美排版。',
      '',
      '### 支持的语法',
      '',
      '- 标题（H1 ~ H6）',
      '- **加粗**、*斜体*、`行内代码`',
      '- 代码块（支持语法高亮样式）',
      '- 引用块、有序/无序列表',
      '- [链接](https://github.com) 和图片',
      '- 表格和分隔线',
      '',
      '> 💡 提示：选择不同主题可以改变排版风格，推荐试试**赛博朋克**主题！',
      '',
      '## 使用步骤',
      '',
      '1. 在左侧编辑器输入或粘贴 Markdown',
      '2. 也可以直接上传 Word(.docx) 或 PDF 文件',
      '3. 选择喜欢的主题风格',
      '4. 点击「复制到微信」，在微信编辑器中粘贴',
      '',
      '---',
      '',
      '# 代码示例',
      '',
      '```javascript',
      'function greet(name) {',
      '  console.log("Hello, " + name + "!");',
      '}',
      'greet("微信排版助手");',
      '```',
      '',
      '## 数据对比',
      '',
      '| 功能 | 状态 | 说明 |',
      '| --- | --- | --- |',
      '| 标题转换 | ✅ | H1 ~ H6 |',
      '| 列表合并 | ✅ | 已修复 |',
      '| 代码块 | ✅ | macOS 风格 |',
      '| 表格 | ✅ | 支持 |',
      '| Word 上传 | ✅ | .docx 格式 |',
      '| PDF 上传 | ✅ | 文本提取 |',
      '',
      '> 赛博朋克主题完美复刻了专业排版插件的效果，直接复制到微信即可使用！',
      '',
      '感谢使用微信排版助手！🎉'
    ].join('\n');
    updatePreview();
    showToast('已加载示例内容', 'success');
  }

  // ==================== 拖拽 ====================
  var dragCounter = 0;
  dropZone.addEventListener('dragenter',function(e){e.preventDefault();dragCounter++;dropOverlay.classList.add('drop-overlay-show');});
  dropZone.addEventListener('dragleave',function(e){e.preventDefault();dragCounter--;if(dragCounter<=0){dragCounter=0;dropOverlay.classList.remove('drop-overlay-show');}});
  dropZone.addEventListener('dragover',function(e){e.preventDefault();});
  dropZone.addEventListener('drop',function(e){e.preventDefault();dragCounter=0;dropOverlay.classList.remove('drop-overlay-show');if(e.dataTransfer.files.length>0)handleFile(e.dataTransfer.files[0]);});

  // ==================== 事件绑定 ====================
  input.addEventListener('input', debouncedUpdate);
  document.getElementById('upload-btn').addEventListener('click',function(){fileInput.click();});
  document.getElementById('feishu-btn').addEventListener('click',importFeishuDoc);
  fileInput.addEventListener('change',function(){if(fileInput.files.length)handleFile(fileInput.files[0]);fileInput.value='';});
  document.getElementById('clear-btn').addEventListener('click',function(){input.value='';updatePreview();});
  document.getElementById('sample-btn').addEventListener('click',loadSample);
  document.getElementById('copy-rich-btn').addEventListener('click',copyRichText);
  document.getElementById('copy-html-btn').addEventListener('click',copyHtmlSource);

  // ==================== 面板拖拽 ====================
  var divider = document.getElementById('panel-divider');
  var editorPanel = document.querySelector('.editor-panel');
  var isDragging = false;
  divider.addEventListener('mousedown',function(e){isDragging=true;document.body.style.cursor='col-resize';document.body.style.userSelect='none';e.preventDefault();});
  document.addEventListener('mousemove',function(e){if(!isDragging)return;var rect=document.querySelector('.main-container').getBoundingClientRect();var pct=((e.clientX-rect.left)/rect.width)*100;pct=Math.max(25,Math.min(75,pct));editorPanel.style.flex='none';editorPanel.style.width=pct+'%';});
  document.addEventListener('mouseup',function(){if(isDragging){isDragging=false;document.body.style.cursor='';document.body.style.userSelect='';}});

  // ==================== 初始化 ====================
  renderThemeChips();
  updatePreview();
})();
