var themeModule = require('../themes/index.js');
var getThemeStyles = themeModule.getThemeStyles;

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function markdownToWechatHtml(markdown, themeName) {
  if (!markdown) {
    return '';
  }

  var styles = getThemeStyles(themeName || 'minimal');
  var lines = markdown.split('\n');
  var html = '';
  var i;

  // State tracking
  var inCodeBlock = false;
  var codeContent = '';
  var inList = false;
  var listType = '';
  var listItems = [];
  var inTable = false;
  var tableRows = [];
  var inBlockquote = false;
  var blockquoteLines = [];

  function processInline(text) {
    if (!text) return '';
    return text
      .replace(/`([^`]+)`/g, '<code style="' + styles.inlineCode + '">$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="' + styles.img + '" />')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="' + styles.a + '">$1</a>')
      .replace(/\*\*\*([^*]+)\*\*\*/g, '<strong style="' + styles.strong + '"><em style="' + styles.em + '">$1</em></strong>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong style="' + styles.strong + '">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em style="' + styles.em + '">$1</em>');
  }

  function flushList() {
    if (!inList) return '';
    var tag = listType;
    var style = listType === 'ul' ? styles.ul : styles.ol;
    var result = '<' + tag + ' style="' + style + '">';
    for (var j = 0; j < listItems.length; j++) {
      result += '<li style="' + styles.li + '">' + processInline(listItems[j]) + '</li>';
    }
    result += '</' + tag + '>';
    inList = false;
    listItems = [];
    listType = '';
    return result;
  }

  function flushBlockquote() {
    if (!inBlockquote) return '';
    var content = '';
    for (var j = 0; j < blockquoteLines.length; j++) {
      content += processInline(blockquoteLines[j]);
      if (j < blockquoteLines.length - 1) {
        content += '<br/>';
      }
    }
    var result = '<blockquote style="' + styles.blockquote + '">' + content + '</blockquote>';
    inBlockquote = false;
    blockquoteLines = [];
    return result;
  }

  function flushTable() {
    if (!inTable || tableRows.length === 0) return '';
    var result = '<table style="' + styles.table + '">';
    // First row is header
    result += '<thead><tr>';
    var headerRow = tableRows[0];
    for (var j = 0; j < headerRow.length; j++) {
      result += '<th style="' + styles.th + '">' + processInline(headerRow[j]) + '</th>';
    }
    result += '</tr></thead>';
    // Remaining rows are body
    if (tableRows.length > 1) {
      result += '<tbody>';
      for (var k = 1; k < tableRows.length; k++) {
        result += '<tr>';
        for (var l = 0; l < tableRows[k].length; l++) {
          result += '<td style="' + styles.td + '">' + processInline(tableRows[k][l]) + '</td>';
        }
        result += '</tr>';
      }
      result += '</tbody>';
    }
    result += '</table>';
    inTable = false;
    tableRows = [];
    return result;
  }

  function flushAll() {
    var result = '';
    result += flushList();
    result += flushBlockquote();
    result += flushTable();
    return result;
  }

  for (i = 0; i < lines.length; i++) {
    var line = lines[i];

    // --- Code block toggle ---
    if (line.trim().indexOf('```') === 0) {
      if (inCodeBlock) {
        html += '<pre style="' + styles.pre + '"><code style="' + styles.code + '">' + codeContent + '</code></pre>';
        codeContent = '';
        inCodeBlock = false;
      } else {
        html += flushAll();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      if (codeContent) {
        codeContent += '\n';
      }
      codeContent += escapeHtml(line);
      continue;
    }

    // --- Empty line ---
    if (line.trim() === '') {
      html += flushAll();
      continue;
    }

    // --- Headings ---
    var headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      html += flushAll();
      var level = headingMatch[1].length;
      var hTag = 'h' + level;
      var hStyle = styles[hTag] || styles.h3;
      html += '<' + hTag + ' style="' + hStyle + '">' + processInline(headingMatch[2]) + '</' + hTag + '>';
      continue;
    }

    // --- Horizontal rule ---
    if (/^[-*_]{3,}\s*$/.test(line.trim())) {
      html += flushAll();
      html += '<hr style="' + styles.hr + '" />';
      continue;
    }

    // --- Table row ---
    var trimmed = line.trim();
    if (trimmed.charAt(0) === '|' && trimmed.charAt(trimmed.length - 1) === '|') {
      if (!inTable) {
        html += flushList();
        html += flushBlockquote();
        inTable = true;
        tableRows = [];
      }
      // Skip separator row like |---|---|
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        continue;
      }
      var cells = trimmed.split('|');
      var cleaned = [];
      for (var c = 1; c < cells.length - 1; c++) {
        cleaned.push(cells[c].trim());
      }
      tableRows.push(cleaned);
      continue;
    }
    if (inTable) {
      html += flushTable();
    }

    // --- Blockquote ---
    var bqMatch = line.match(/^>\s?(.*)/);
    if (bqMatch) {
      if (!inBlockquote) {
        html += flushList();
        inBlockquote = true;
        blockquoteLines = [];
      }
      blockquoteLines.push(bqMatch[1]);
      continue;
    }
    if (inBlockquote) {
      html += flushBlockquote();
    }

    // --- Unordered list ---
    var ulMatch = line.match(/^\s*[-*+]\s+(.*)/);
    if (ulMatch) {
      if (inList && listType !== 'ul') {
        html += flushList();
      }
      inList = true;
      listType = 'ul';
      listItems.push(ulMatch[1]);
      continue;
    }

    // --- Ordered list ---
    var olMatch = line.match(/^\s*\d+\.\s+(.*)/);
    if (olMatch) {
      if (inList && listType !== 'ol') {
        html += flushList();
      }
      inList = true;
      listType = 'ol';
      listItems.push(olMatch[1]);
      continue;
    }

    // --- Paragraph ---
    html += flushAll();
    html += '<p style="' + styles.p + '">' + processInline(line) + '</p>';
  }

  // Flush any remaining state
  html += flushAll();
  if (inCodeBlock) {
    html += '<pre style="' + styles.pre + '"><code style="' + styles.code + '">' + codeContent + '</code></pre>';
  }

  return (
    '<section style="' + styles.container + '">' +
      '<section style="' + styles.content + '">' +
        html +
      '</section>' +
    '</section>'
  );
}

module.exports = {
  markdownToWechatHtml: markdownToWechatHtml
};
