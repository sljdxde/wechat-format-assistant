/**
 * Markdown → 微信公众号 HTML 转换器（含赛博朋克特殊渲染）
 */
(function (root) {
  'use strict';
  var getThemeStyles = root.WxThemes.getThemeStyles;

  function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  // 渲染扩展由主题配置接管

  function markdownToWechatHtml(md, themeName) {
    if (!md) return '';
    
    // 预处理：修复可能因为复制导致的图片/链接换行问题
    md = md.replace(/!\[([^\]]*)\]\n\s*\(([^)]+)\)/g, '![$1]($2)');
    md = md.replace(/\[([^\]]*)\]\n\s*\(([^)]+)\)/g, '[$1]($2)');

    var s = getThemeStyles(themeName || 'minimal');
    if (s.init) s.init();
    
    var lines = md.split('\n'), html = '', i;
    var inCode = false, codeBuf = '';
    var inList = false, lType = '', lItems = [];
    var inTbl = false, tRows = [];
    var inBq = false, bqLines = [];

    function pInline(t) {
      if (!t) return '';
      return t
        .replace(/`([^`]+)`/g, '<code style="' + s.inlineCode + '">$1</code>')
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="' + s.img + '" />')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="' + s.a + '">$1</a>')
        .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong style="' + s.strong + '"><em style="' + s.em + '">$1</em></strong>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong style="' + s.strong + '">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em style="' + s.em + '">$1</em>');
    }

    function fList() {
      if (!inList) return '';
      var r = '';
      if ((lType === 'ol' && s.renderOlLi) || (lType === 'ul' && s.renderUlLi)) {
        r = '<div style="' + (s.listContainer || 'margin:16px 0;') + '">';
        for (var j=0; j<lItems.length; j++) {
          r += lType === 'ol' ? s.renderOlLi(pInline(lItems[j]), j+1) : s.renderUlLi(pInline(lItems[j]));
        }
        r += '</div>';
      } else {
        var tag = lType, st = lType==='ul'?s.ul:s.ol;
        r = '<'+tag+' style="'+st+'">';
        for (var j=0;j<lItems.length;j++) r+='<li style="'+s.li+'">'+pInline(lItems[j])+'</li>';
        r += '</'+tag+'>';
      }
      inList=false; lItems=[]; lType=''; return r;
    }

    function fBq() {
      if (!inBq) return '';
      var c='';
      for (var j=0;j<bqLines.length;j++){c+=pInline(bqLines[j]);if(j<bqLines.length-1)c+='<br/>';}
      var r;
      if (s.renderBlockquote) {
        r = s.renderBlockquote(c);
      } else {
        r = '<blockquote style="'+s.blockquote+'">'+c+'</blockquote>';
      }
      inBq=false; bqLines=[]; return r;
    }

    function fTbl() {
      if (!inTbl||tRows.length===0) return '';
      var r='<table style="'+s.table+'"><thead><tr>';
      for (var j=0;j<tRows[0].length;j++) r+='<th style="'+s.th+'">'+pInline(tRows[0][j])+'</th>';
      r+='</tr></thead>';
      if (tRows.length>1){r+='<tbody>';
        for(var k=1;k<tRows.length;k++){r+='<tr>';for(var l=0;l<tRows[k].length;l++)r+='<td style="'+s.td+'">'+pInline(tRows[k][l])+'</td>';r+='</tr>';}
        r+='</tbody>';}
      r+='</table>'; inTbl=false; tRows=[]; return r;
    }

    function fAll(){return fList()+fBq()+fTbl();}

    for (i=0;i<lines.length;i++){
      var line=lines[i];
      if(line.trim().indexOf('```')===0){
        if(inCode){
          if(s.renderPre){html+=s.renderPre(codeBuf);}
          else{html+='<pre style="'+s.pre+'"><code style="'+s.code+'">'+codeBuf+'</code></pre>';}
          codeBuf='';inCode=false;
        } else{html+=fAll();inCode=true;}continue;}
      if(inCode){if(codeBuf)codeBuf+='\n';codeBuf+=esc(line);continue;}
      if(line.trim()===''){html+=fAll();continue;}

      var hm=line.match(/^(#{1,6})\s+(.*)/);
      if(hm){html+=fAll();var lv=hm[1].length;
        var ht='h'+lv,hs=s[ht]||s.h3;
        var content = pInline(hm[2]);
        if(s['renderH'+lv]) { html+=s['renderH'+lv](content); continue; }
        html+='<'+ht+' style="'+hs+'">'+content+'</'+ht+'>';continue;}

      if(/^[-*_]{3,}\s*$/.test(line.trim())){html+=fAll();html+='<hr style="'+s.hr+'" />';continue;}

      var tr=line.trim();
      if(tr.charAt(0)==='|'&&tr.charAt(tr.length-1)==='|'){
        if(!inTbl){html+=fList()+fBq();inTbl=true;tRows=[];}
        if(/^\|[\s\-:|]+\|$/.test(tr))continue;
        var cs=tr.split('|'),cl=[];for(var c=1;c<cs.length-1;c++)cl.push(cs[c].trim());tRows.push(cl);continue;}
      if(inTbl)html+=fTbl();

      var bm=line.match(/^>\s?(.*)/);
      if(bm){if(!inBq){html+=fList();inBq=true;bqLines=[];}bqLines.push(bm[1]);continue;}
      if(inBq)html+=fBq();

      var um=line.match(/^\s*[-*+]\s+(.*)/);
      if(um){if(inList&&lType!=='ul')html+=fList();inList=true;lType='ul';lItems.push(um[1]);continue;}
      var om=line.match(/^\s*\d+\.\s+(.*)/);
      if(om){if(inList&&lType!=='ol')html+=fList();inList=true;lType='ol';lItems.push(om[1]);continue;}

      html+=fAll();
      html+='<p style="'+s.p+'">'+pInline(line)+'</p>';
    }
    html+=fAll();
    if(inCode){
      if(s.renderPre){html+=s.renderPre(codeBuf);}
      else{html+='<pre style="'+s.pre+'"><code style="'+s.code+'">'+codeBuf+'</code></pre>';}
    }
    return '<section style="'+s.container+'"><section style="'+s.content+'">'+html+'</section></section>';
  }

  root.WxConverter = { markdownToWechatHtml: markdownToWechatHtml };
})(window);
