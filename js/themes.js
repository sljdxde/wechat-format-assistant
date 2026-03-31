/**
 * 主题定义 — 每个主题为一套内联 CSS 样式 + 可选的自定义渲染函数
 */
(function (root) {
  'use strict';

  // ========== 简约主题 ==========
  var minimalTheme = {
    container: 'padding: 10px; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif; background: #ffffff;',
    content: 'max-width: 677px; margin: 0 auto; color: #333; line-height: 1.8; font-size: 15px; letter-spacing: 1px; word-wrap: break-word; word-break: break-word;',
    h1: 'font-size: 22px; font-weight: bold; color: #222; margin: 30px 0 20px; line-height: 1.5; border-bottom: 1px solid #eaeaea; padding-bottom: 10px; word-break: break-word;',
    h2: 'font-size: 18px; font-weight: bold; color: #333; margin: 25px 0 15px; line-height: 1.5; word-break: break-word;',
    h3: 'font-size: 16px; font-weight: bold; color: #444; margin: 20px 0 15px; line-height: 1.5; word-break: break-word;',
    p: 'margin: 15px 0; text-align: justify; word-break: break-word;',
    strong: 'font-weight: bold; color: #111;',
    em: 'font-style: italic; color: #555;',
    blockquote: 'margin: 20px 0; padding: 15px 20px; background: #f7f7f7; border-left: 4px solid #b3b3b3; color: #666; font-size: 14px; line-height: 1.7;',
    ul: 'margin: 15px 0; padding-left: 20px; list-style-type: disc;',
    ol: 'margin: 15px 0; padding-left: 20px; list-style-type: decimal;',
    li: 'margin-bottom: 8px; text-align: justify; word-break: break-word;',
    pre: 'background: #f6f8fa; border-radius: 4px; padding: 16px; overflow-x: auto; margin: 15px 0; font-size: 13px; line-height: 1.6; word-break: break-all;',
    code: 'font-family: Consolas, Monaco, monospace; color: #333; font-size: 13px; white-space: pre-wrap; word-break: break-all;',
    inlineCode: 'background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 90%; font-family: Consolas, monospace; color: #c7254e; word-break: break-all;',
    img: 'max-width: 100%; height: auto; border-radius: 4px; margin: 10px 0; display: block;',
    a: 'color: #576b95; text-decoration: none; border-bottom: 1px solid #d3d8e0;',
    hr: 'border: none; margin: 25px 0; border-top: 1px solid #eaeaea;',
    table: 'width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px; word-break: break-word;',
    th: 'border: 1px solid #dfe2e5; padding: 8px 12px; background: #f6f8fa; font-weight: bold; text-align: left; word-break: break-word;',
    td: 'border: 1px solid #dfe2e5; padding: 8px 12px; text-align: left; word-break: break-word;'
  };

  // ========== 优雅主题 ==========
  var elegantTheme = {
    container: 'padding: 10px; font-family: "Georgia", "Songti SC", "SimSun", "PingFang SC", serif; background: #fefcf9;',
    content: 'max-width: 677px; margin: 0 auto; color: #3d3229; line-height: 2; font-size: 15px; letter-spacing: 1.2px; word-wrap: break-word; word-break: break-word;',
    h1: 'font-size: 24px; font-weight: bold; color: #5b3a1a; margin: 35px 0 20px; line-height: 1.5; text-align: center; border-bottom: 2px solid #d4a76a; padding-bottom: 12px; word-break: break-word;',
    h2: 'font-size: 19px; font-weight: bold; color: #6b4423; margin: 28px 0 16px; line-height: 1.5; border-left: 4px solid #d4a76a; padding-left: 12px; word-break: break-word;',
    h3: 'font-size: 17px; font-weight: bold; color: #7a5533; margin: 22px 0 14px; line-height: 1.5; word-break: break-word;',
    p: 'margin: 16px 0; text-align: justify; text-indent: 2em; word-break: break-word;',
    strong: 'font-weight: bold; color: #5b3a1a;',
    em: 'font-style: italic; color: #8b6f4e;',
    blockquote: 'margin: 20px 0; padding: 18px 24px; background: #faf5ee; border-left: 4px solid #d4a76a; color: #6b5b4e; font-size: 14px; line-height: 1.8; font-style: italic;',
    ul: 'margin: 16px 0; padding-left: 22px; list-style-type: disc;',
    ol: 'margin: 16px 0; padding-left: 22px; list-style-type: decimal;',
    li: 'margin-bottom: 10px; text-align: justify; text-indent: 0; word-break: break-word;',
    pre: 'background: #faf5ee; border: 1px solid #e8ddd0; border-radius: 6px; padding: 16px; overflow-x: auto; margin: 16px 0; font-size: 13px; line-height: 1.6; word-break: break-all;',
    code: 'font-family: Consolas, Menlo, monospace; color: #6b4423; font-size: 13px; white-space: pre-wrap; word-break: break-all;',
    inlineCode: 'background: #f5ebe0; padding: 2px 6px; border-radius: 3px; font-size: 90%; font-family: Consolas, monospace; color: #9b5c2e; word-break: break-all;',
    img: 'max-width: 100%; height: auto; border-radius: 4px; margin: 10px 0; display: block;',
    a: 'color: #9b5c2e; text-decoration: none; border-bottom: 1px solid #d4a76a;',
    hr: 'border: none; margin: 25px 0; border-top: 1px dashed #d4a76a;',
    table: 'width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px; word-break: break-word;',
    th: 'border: 1px solid #e0d5c7; padding: 10px 14px; background: #faf5ee; font-weight: bold; text-align: left; color: #5b3a1a; word-break: break-word;',
    td: 'border: 1px solid #e0d5c7; padding: 10px 14px; text-align: left; word-break: break-word;'
  };

  // ========== 赛博朋克主题 ==========
  var cyberpunkTheme = {
    partCounter: 0,
    init: function() { this.partCounter = 0; },
    renderH1: function(text) {
      this.partCounter++;
      var num = this.partCounter < 10 ? '0' + this.partCounter : '' + this.partCounter;
      return '<section style="margin:30px 0 20px;position:relative;">' +
        '<div style="background:#001a33;border:1px solid #145b9e;border-radius:4px;padding:30px 20px 20px;position:relative;' +
          'background-image:linear-gradient(rgba(20,91,158,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(20,91,158,0.3) 1px,transparent 1px);background-size:20px 20px;">' +
          '<div style="position:absolute;top:-14px;left:12px;background:#ffd700;color:#000;font-weight:900;font-size:14px;padding:4px 14px;border-radius:2px;font-family:Consolas,monospace;letter-spacing:2px;">PART.' + num + '</div>' +
          '<div style="text-align:center;font-size:22px;font-weight:700;color:#00ffff;text-shadow:0 0 12px rgba(0,255,255,0.5);margin-top:8px;">' + text + '</div>' +
        '</div>' +
        '<div style="text-align:right;margin-top:4px;"><span style="font-size:11px;font-weight:700;color:#333;background:#e8e8e8;padding:2px 8px;border:1px solid #bbb;letter-spacing:2px;font-family:Consolas,monospace;">THUMB</span> ' +
        '<span style="font-size:11px;font-weight:700;color:#333;background:#e8e8e8;padding:2px 8px;border:1px solid #bbb;letter-spacing:2px;font-family:Consolas,monospace;">STOPPING</span></div>' +
      '</section>';
    },
    renderPre: function(code) {
      return '<div style="margin:20px 0;border:1px solid #ffd700;border-radius:8px;overflow:hidden;">' +
        '<div style="background:#2a2a2a;padding:8px 14px;display:flex;align-items:center;gap:6px;">' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#ff5f57;display:inline-block;"></span>' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#28c840;display:inline-block;"></span>' +
        '</div>' +
        '<pre style="background:#1a1a2e;padding:16px;margin:0;overflow-x:auto;font-size:13px;line-height:1.6;"><code style="font-family:\'Fira Code\',Consolas,monospace;color:#e2e8f0;font-size:13px;">' + code + '</code></pre>' +
      '</div>';
    },
    renderOlLi: function(text, idx) {
      return '<div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;">' +
        '<span style="color:#ffd700;font-weight:700;font-size:16px;flex-shrink:0;min-width:24px;">' + idx + '.</span>' +
        '<span style="color:#d0d0d0;">' + text + '</span></div>';
    },
    renderUlLi: function(text) {
      return '<div style="display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;">' +
        '<span style="color:#ffd700;font-size:14px;flex-shrink:0;margin-top:3px;">●</span>' +
        '<span style="color:#d0d0d0;">' + text + '</span></div>';
    },
    container: 'padding: 3px; background: linear-gradient(135deg, #ff007f, #00ffff, #ff007f); border-radius: 4px;',
    content: 'background: #0d0a1a; color: #e0e0e0; padding: 30px 24px; line-height: 1.9; font-size: 15px; letter-spacing: 0.8px; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", Arial, sans-serif; word-wrap: break-word; word-break: break-word;',
    h2: 'font-size: 18px; font-weight: 700; color: #00ffff; margin: 30px 0 15px; line-height: 1.5; text-shadow: 0 0 8px rgba(0,255,255,0.3);',
    h3: 'font-size: 16px; font-weight: 600; color: #00ffff; margin: 22px 0 12px; line-height: 1.5;',
    p: 'margin: 18px 0; text-align: justify; color: #d0d0d0;',
    strong: 'font-weight: 700; color: #00ffff;',
    em: 'font-style: italic; color: #ff79c6;',
    blockquote: 'margin: 20px 0; padding: 16px 20px; background: #1a1040; border-left: 4px solid #00ffff; color: #b0b0d0; font-size: 14px; line-height: 1.8; border-radius: 0 6px 6px 0;',
    ul: 'margin: 16px 0; padding-left: 20px; list-style-type: none;',
    ol: 'margin: 16px 0; padding-left: 8px; list-style-type: none;',
    li: 'margin-bottom: 12px; text-align: justify; color: #d0d0d0;',
    pre: 'background:#1a1a2e;padding:16px;margin:20px 0;overflow-x:auto;font-size:13px;line-height:1.6;border-radius:8px;word-break:break-all;',
    code: 'font-family: "Fira Code", "SFMono-Regular", Consolas, monospace; color: #e2e8f0; font-size: 13px;',
    inlineCode: 'background: #2a1a4a; padding: 2px 8px; border-radius: 4px; font-size: 90%; font-family: Consolas, monospace; color: #00ffff; border: 1px solid #3a2a5a;',
    img: 'max-width: 100%; height: auto; margin: 15px 0; display: block; border: 2px solid #00ffff; border-radius: 4px; box-shadow: 0 0 15px rgba(0,255,255,0.3);',
    a: 'color: #00ffff; text-decoration: none; border-bottom: 1px solid rgba(0,255,255,0.4); font-weight: 500;',
    hr: 'border: none; margin: 30px 0; height: 2px; background: linear-gradient(90deg, transparent, #ff007f, #00ffff, #ff007f, transparent);',
    table: 'width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; word-break: break-word;',
    th: 'border: 1px solid #3a2a6a; padding: 10px 14px; background: #1a1040; font-weight: 600; text-align: left; color: #00ffff; word-break: break-word;',
    td: 'border: 1px solid #3a2a6a; padding: 10px 14px; text-align: left; color: #d0d0d0; word-break: break-word;'
  };

  // ========== 清新主题 ==========
  var freshTheme = {
    container: 'padding: 10px; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", Arial, sans-serif; background: #f0faf5;',
    content: 'max-width: 677px; margin: 0 auto; color: #2d3436; line-height: 1.9; font-size: 15px; letter-spacing: 1px; word-wrap: break-word; word-break: break-word;',
    h1: 'font-size: 22px; font-weight: bold; color: #00897b; margin: 32px 0 18px; line-height: 1.5; border-bottom: 2px solid #80cbc4; padding-bottom: 10px; text-align: center; word-break: break-word;',
    h2: 'font-size: 18px; font-weight: bold; color: #00796b; margin: 26px 0 14px; line-height: 1.5; padding-left: 12px; border-left: 4px solid #4db6ac; word-break: break-word;',
    h3: 'font-size: 16px; font-weight: bold; color: #00897b; margin: 22px 0 12px; line-height: 1.5; word-break: break-word;',
    p: 'margin: 15px 0; text-align: justify; word-break: break-word;',
    strong: 'font-weight: bold; color: #00695c;',
    em: 'font-style: italic; color: #546e7a;',
    blockquote: 'margin: 18px 0; padding: 16px 22px; background: #e0f2f1; border-left: 4px solid #4db6ac; color: #37474f; font-size: 14px; line-height: 1.8; border-radius: 0 8px 8px 0;',
    ul: 'margin: 15px 0; padding-left: 20px; list-style-type: disc;',
    ol: 'margin: 15px 0; padding-left: 20px; list-style-type: decimal;',
    li: 'margin-bottom: 8px; text-align: justify; word-break: break-word;',
    pre: 'background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 8px; padding: 16px; overflow-x: auto; margin: 16px 0; font-size: 13px; line-height: 1.6; word-break: break-all;',
    code: 'font-family: Consolas, Menlo, monospace; color: #2e7d32; font-size: 13px; white-space: pre-wrap; word-break: break-all;',
    inlineCode: 'background: #e0f2f1; padding: 2px 6px; border-radius: 4px; font-size: 90%; font-family: Consolas, monospace; color: #00796b; word-break: break-all;',
    img: 'max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; display: block;',
    a: 'color: #00897b; text-decoration: none; border-bottom: 1px solid #80cbc4;',
    hr: 'border: none; margin: 25px 0; border-top: 1px solid #b2dfdb;',
    table: 'width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px; word-break: break-word;',
    th: 'border: 1px solid #b2dfdb; padding: 10px 14px; background: #e0f2f1; font-weight: bold; text-align: left; color: #00695c; word-break: break-word;',
    td: 'border: 1px solid #b2dfdb; padding: 10px 14px; text-align: left; word-break: break-word;'
  };

  // ========== 赛博月刊 — 白卡片浮在暖色背景上，橙色标题，✦菱形列表 ==========
  var cyberMonthlyTheme = {
    // 白色圆角卡片悬浮
    container: 'padding: 24px 12px; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", sans-serif; background: #f0ebe3;',
    content: 'max-width: 677px; margin: 0 auto; background: #ffffff; border-radius: 24px; padding: 36px 28px; box-shadow: 0 8px 40px rgba(0,0,0,0.06); color: #333333; line-height: 2; font-size: 15px; letter-spacing: 0.8px; word-wrap: break-word; word-break: break-word;',
    // H1: 居中大标题
    renderH1: function(text) {
      return '<h1 style="font-size: 24px; font-weight: 900; color: #1a1a1a; margin: 40px 0 28px; line-height: 1.5; text-align: center; letter-spacing: 2px;">' + text + '</h1>';
    },
    h1: 'font-size: 24px; font-weight: 900; color: #1a1a1a; margin: 40px 0 28px; line-height: 1.5; text-align: center; letter-spacing: 2px;',
    // H2: 带序号的橙红色标题
    renderH2: function(text) {
      return '<h2 style="font-size: 19px; font-weight: 800; color: #d35400; margin: 36px 0 18px; line-height: 1.5; word-break: break-word;">' + text + '</h2>';
    },
    h2: 'font-size: 19px; font-weight: 800; color: #d35400; margin: 36px 0 18px; line-height: 1.5;',
    // H3: 带小图标装饰
    renderH3: function(text) {
      return '<div style="display:flex;align-items:center;gap:8px;margin:28px 0 14px;">' +
        '<span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#fdf6ee;border-radius:50%;border:2px solid #e67e22;color:#e67e22;font-size:14px;flex-shrink:0;">▼</span>' +
        '<h3 style="font-size: 17px; font-weight: 700; color: #e67e22; margin: 0; line-height: 1.5;">' + text + '</h3></div>';
    },
    h3: 'font-size: 17px; font-weight: 700; color: #e67e22; margin: 28px 0 14px; line-height: 1.5; word-break: break-word;',
    p: 'margin: 20px 0; text-align: justify; word-break: break-word;',
    // 加粗 = 荧光笔高亮效果
    strong: 'font-weight: 800; color: #1a1a1a; background: linear-gradient(to top, rgba(230,126,34,0.25) 40%, transparent 40%); padding: 0 2px; box-decoration-break: clone; -webkit-box-decoration-break: clone;',
    em: 'font-style: italic; color: #888888;',
    // 引用：柔和圆角卡片
    renderBlockquote: function(content) {
      return '<blockquote style="margin: 24px 0; padding: 20px 24px; background: #fdf6ee; border-left: 4px solid #e67e22; border-radius: 0 12px 12px 0; color: #6b5b4a; font-size: 14px; line-height: 1.9;">' + content + '</blockquote>';
    },
    blockquote: 'margin: 24px 0; padding: 20px 24px; background: #fdf6ee; border-left: 4px solid #e67e22; border-radius: 0 12px 12px 0; color: #6b5b4a; font-size: 14px; line-height: 1.9;',
    // 列表：✦菱形图标
    renderUlLi: function(text) {
      return '<div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;line-height:2;">' +
        '<span style="color:#e67e22;font-size:13px;flex-shrink:0;margin-top:5px;">✦</span>' +
        '<span style="color:#333333;">' + text + '</span></div>';
    },
    renderOlLi: function(text, idx) {
      return '<div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start;line-height:2;">' +
        '<span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:#e67e22;color:#fff;font-size:12px;font-weight:700;flex-shrink:0;margin-top:5px;">' + idx + '</span>' +
        '<span style="color:#333333;">' + text + '</span></div>';
    },
    ul: 'margin: 16px 0; padding-left: 0; list-style-type: none;',
    ol: 'margin: 16px 0; padding-left: 0; list-style-type: none;',
    li: 'margin-bottom: 14px; word-break: break-word;',
    // 代码块：深色 + macOS 圆角
    renderPre: function(code) {
      return '<div style="margin:24px 0;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">' +
        '<div style="background:#2d2d2d;padding:10px 16px;display:flex;align-items:center;gap:8px;">' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#ff5f57;display:inline-block;"></span>' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#28c840;display:inline-block;"></span>' +
        '</div>' +
        '<pre style="background:#1e1e1e;padding:18px;margin:0;overflow-x:auto;font-size:13px;line-height:1.7;"><code style="font-family:Consolas,\'Fira Code\',monospace;color:#d4d4d4;font-size:13px;">' + code + '</code></pre>' +
      '</div>';
    },
    pre: 'background: #1e1e1e; border-radius: 12px; padding: 18px; overflow-x: auto; margin: 24px 0; font-size: 13px; line-height: 1.7; word-break: break-all;',
    code: 'font-family: Consolas, "Fira Code", monospace; color: #d4d4d4; font-size: 13px; white-space: pre-wrap; word-break: break-all;',
    inlineCode: 'background: #fdf6ee; padding: 2px 8px; border-radius: 4px; font-size: 90%; font-family: Consolas, monospace; color: #d35400; word-break: break-all;',
    img: 'max-width: 100%; height: auto; border-radius: 12px; margin: 24px 0; display: block; box-shadow: 0 4px 16px rgba(0,0,0,0.06);',
    a: 'color: #d35400; text-decoration: none; border-bottom: 1px solid #e67e22; font-weight: 500;',
    hr: 'border: none; margin: 40px auto; width: 80px; border-top: 3px solid #f0ebe3; border-radius: 2px;',
    table: 'width: 100%; border-collapse: separate; border-spacing: 0; margin: 24px 0; font-size: 14px; word-break: break-word; border: 1px solid #f0ebe3; border-radius: 12px; overflow: hidden;',
    th: 'border-bottom: 2px solid #f0ebe3; padding: 14px 16px; background: #fdf6ee; font-weight: 700; text-align: left; color: #d35400; word-break: break-word;',
    td: 'border-bottom: 1px solid #f0ebe3; padding: 14px 16px; text-align: left; word-break: break-word;'
  };

  // ========== 赛博警戒 — 黑底+黄色警报标题+红边引用 ==========
  var cyberAlertTheme = {
    container: 'padding: 10px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0a0a0a;',
    content: 'max-width: 677px; margin: 0 auto; color: #e0e0e0; line-height: 1.85; font-size: 15px; letter-spacing: 1px; word-wrap: break-word; word-break: break-word; padding: 10px;',
    // H1: 黄色大字 + 虚线底边
    renderH1: function(text) {
      return '<h1 style="font-size: 24px; font-weight: 900; color: #f1c40f; margin: 40px 0 22px; line-height: 1.4; text-transform: uppercase; letter-spacing: 3px; text-align: center; border-bottom: 3px dashed #f1c40f; padding-bottom: 14px;">' + text + '</h1>';
    },
    h1: 'font-size: 24px; font-weight: 900; color: #f1c40f; margin: 40px 0 22px;',
    // H2: 黄底黑字的标签式标题
    renderH2: function(text) {
      return '<div style="margin: 34px 0 18px;">' +
        '<span style="display:inline-block;background:#f1c40f;color:#0a0a0a;font-size:17px;font-weight:900;padding:6px 18px;border-radius:4px;letter-spacing:1px;text-transform:uppercase;">' + text + '</span>' +
      '</div>';
    },
    h2: 'font-size: 17px; font-weight: 900; color: #0a0a0a; background: #f1c40f; padding: 6px 18px; display: inline-block; border-radius: 4px;',
    // H3: 红色左边框
    renderH3: function(text) {
      return '<h3 style="font-size: 16px; font-weight: 700; color: #e74c3c; margin: 28px 0 14px; line-height: 1.5; padding-left: 12px; border-left: 4px solid #e74c3c;">' + text + '</h3>';
    },
    h3: 'font-size: 16px; font-weight: 700; color: #e74c3c; margin: 28px 0 14px;',
    p: 'margin: 16px 0; text-align: justify; word-break: break-word;',
    strong: 'font-weight: bold; color: #f1c40f;',
    em: 'font-style: italic; color: #e74c3c;',
    // 引用：深底+粗红左边框+警告感
    renderBlockquote: function(content) {
      return '<blockquote style="margin: 24px 0; padding: 20px 24px; background: #141414; border: 1px solid #2a2a2a; border-left: 6px solid #e74c3c; color: #cccccc; font-size: 14px; line-height: 1.85; border-radius: 0 6px 6px 0;">' +
        content + '</blockquote>';
    },
    blockquote: 'margin: 24px 0; padding: 20px 24px; background: #141414; border: 1px solid #2a2a2a; border-left: 6px solid #e74c3c; color: #cccccc; font-size: 14px; line-height: 1.85;',
    // 列表：⚡闪电图标
    renderUlLi: function(text) {
      return '<div style="display:flex;gap:10px;margin-bottom:12px;align-items:flex-start;">' +
        '<span style="color:#f1c40f;font-size:14px;flex-shrink:0;margin-top:2px;">⚡</span>' +
        '<span style="color:#e0e0e0;">' + text + '</span></div>';
    },
    renderOlLi: function(text, idx) {
      return '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start;">' +
        '<span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;border:2px solid #f1c40f;color:#f1c40f;font-size:13px;font-weight:900;flex-shrink:0;margin-top:2px;font-family:Consolas,monospace;">' + idx + '</span>' +
        '<span style="color:#e0e0e0;">' + text + '</span></div>';
    },
    ul: 'margin: 16px 0; padding-left: 0; list-style-type: none;',
    ol: 'margin: 16px 0; padding-left: 0; list-style-type: none;',
    li: 'margin-bottom: 12px; word-break: break-word;',
    // 代码块：黑底+黄色顶部条
    renderPre: function(code) {
      return '<div style="margin:24px 0;border-radius:6px;overflow:hidden;border:1px solid #2a2a2a;">' +
        '<div style="background:#f1c40f;height:4px;"></div>' +
        '<pre style="background:#000000;padding:18px;margin:0;overflow-x:auto;font-size:13px;line-height:1.6;"><code style="font-family:Consolas,Monaco,monospace;color:#f1c40f;font-size:13px;">' + code + '</code></pre>' +
      '</div>';
    },
    pre: 'background: #000000; border-radius: 6px; padding: 18px; overflow-x: auto; margin: 24px 0; font-size: 13px; line-height: 1.6; word-break: break-all;',
    code: 'font-family: Consolas, Monaco, monospace; color: #f1c40f; font-size: 13px; white-space: pre-wrap; word-break: break-all;',
    inlineCode: 'background: #1a1a1a; padding: 2px 8px; border: 1px solid #333; border-radius: 4px; font-size: 90%; font-family: Consolas, monospace; color: #e74c3c; word-break: break-all;',
    img: 'max-width: 100%; height: auto; border-radius: 6px; border: 1px solid #2a2a2a; margin: 24px 0; display: block;',
    a: 'color: #3498db; text-decoration: none; font-weight: 600; border-bottom: 1px solid #3498db;',
    hr: 'border: none; margin: 40px 0; height: 2px; background: repeating-linear-gradient(90deg, #f1c40f 0, #f1c40f 8px, transparent 8px, transparent 16px);',
    table: 'width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 14px; border: 2px solid #222; word-break: break-word;',
    th: 'border: 1px solid #333; padding: 12px 14px; background: #141414; font-weight: bold; text-align: left; color: #f1c40f; word-break: break-word;',
    td: 'border: 1px solid #333; padding: 12px 14px; text-align: left; word-break: break-word;'
  };

  // ========== 赛博技术 — 蓝色渐变H2 + 浅灰卡片 + 竖条H3 ==========
  var cyberTechTheme = {
    container: 'padding: 14px 10px; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; background: #eef2f7;',
    content: 'max-width: 677px; margin: 0 auto; background: #ffffff; border-radius: 10px; padding: 32px 26px; box-shadow: 0 2px 16px rgba(9,30,66,0.06); color: #253858; line-height: 1.85; font-size: 15px; letter-spacing: 0.5px; word-wrap: break-word; word-break: break-word;',
    // H1: 居中蓝
    renderH1: function(text) {
      return '<h1 style="font-size: 23px; font-weight: 800; color: #0052cc; margin: 35px 0 22px; line-height: 1.5; text-align: center; word-break: break-word;">' + text + '</h1>' +
        '<div style="width:60px;height:4px;background:linear-gradient(90deg,#0052cc,#4c9aff);border-radius:2px;margin:-14px auto 24px;"></div>';
    },
    h1: 'font-size: 23px; font-weight: 800; color: #0052cc; margin: 35px 0 22px; text-align: center;',
    // H2: 渐变蓝色胶囊
    renderH2: function(text) {
      return '<div style="margin: 32px 0 18px;">' +
        '<span style="display:inline-block;background:linear-gradient(135deg,#0052cc 0%,#4c9aff 100%);color:#ffffff;font-size:16px;font-weight:700;padding:7px 20px;border-radius:20px;box-shadow:0 4px 12px rgba(0,82,204,0.2);letter-spacing:0.5px;">' + text + '</span>' +
      '</div>';
    },
    h2: 'font-size: 16px; font-weight: 700; color: #fff; background: linear-gradient(135deg,#0052cc,#4c9aff); padding: 7px 20px; border-radius: 20px; display: inline-block;',
    // H3: 竖条装饰
    renderH3: function(text) {
      return '<h3 style="font-size: 16px; font-weight: 700; color: #172b4d; margin: 26px 0 14px; line-height: 1.5; display: flex; align-items: center; gap: 10px;">' +
        '<span style="display:inline-block;width:4px;height:18px;background:linear-gradient(180deg,#0052cc,#4c9aff);border-radius:2px;flex-shrink:0;"></span>' +
        text + '</h3>';
    },
    h3: 'font-size: 16px; font-weight: 700; color: #172b4d; margin: 26px 0 14px;',
    p: 'margin: 16px 0; text-align: justify; word-break: break-word;',
    strong: 'font-weight: 700; color: #0052cc;',
    em: 'font-style: italic; color: #5e6c84;',
    // 引用：浅蓝底
    renderBlockquote: function(content) {
      return '<blockquote style="margin: 22px 0; padding: 18px 22px; background: #f0f5ff; border-left: 4px solid #0052cc; border-radius: 0 8px 8px 0; color: #42526e; font-size: 14px; line-height: 1.85;">' + content + '</blockquote>';
    },
    blockquote: 'margin: 22px 0; padding: 18px 22px; background: #f0f5ff; border-left: 4px solid #0052cc; border-radius: 0 8px 8px 0; color: #42526e; font-size: 14px; line-height: 1.85;',
    // 列表：蓝色圆点/数字
    renderUlLi: function(text) {
      return '<div style="display:flex;gap:10px;margin-bottom:12px;align-items:flex-start;">' +
        '<span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#0052cc;flex-shrink:0;margin-top:8px;"></span>' +
        '<span style="color:#253858;">' + text + '</span></div>';
    },
    renderOlLi: function(text, idx) {
      return '<div style="display:flex;gap:12px;margin-bottom:14px;align-items:flex-start;">' +
        '<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,#0052cc,#4c9aff);color:#fff;font-size:12px;font-weight:700;flex-shrink:0;margin-top:3px;">' + idx + '</span>' +
        '<span style="color:#253858;">' + text + '</span></div>';
    },
    ul: 'margin: 16px 0; padding-left: 0; list-style-type: none;',
    ol: 'margin: 16px 0; padding-left: 0; list-style-type: none;',
    li: 'margin-bottom: 12px; word-break: break-word;',
    // 代码块：深蓝底 + 圆角
    renderPre: function(code) {
      return '<div style="margin:22px 0;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(9,30,66,0.08);">' +
        '<div style="background:#0d1b2a;padding:10px 16px;display:flex;align-items:center;gap:8px;">' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#ff5f57;display:inline-block;"></span>' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#ffbd2e;display:inline-block;"></span>' +
          '<span style="width:12px;height:12px;border-radius:50%;background:#28c840;display:inline-block;"></span>' +
          '<span style="flex:1;text-align:center;color:#5e6c84;font-size:12px;font-family:Consolas,monospace;">Code</span>' +
        '</div>' +
        '<pre style="background:#091e42;padding:18px;margin:0;overflow-x:auto;font-size:13px;line-height:1.7;"><code style="font-family:Consolas,Monaco,monospace;color:#b3d4ff;font-size:13px;">' + code + '</code></pre>' +
      '</div>';
    },
    pre: 'background: #091e42; border-radius: 10px; padding: 18px; overflow-x: auto; margin: 22px 0; font-size: 13px; line-height: 1.7; word-break: break-all;',
    code: 'font-family: Consolas, Monaco, monospace; color: #b3d4ff; font-size: 13px; white-space: pre-wrap; word-break: break-all;',
    inlineCode: 'background: #deebff; padding: 2px 8px; border-radius: 4px; font-size: 90%; font-family: Consolas, monospace; color: #0052cc; border: 1px solid #b3d4ff; word-break: break-all;',
    img: 'max-width: 100%; height: auto; border-radius: 8px; margin: 20px 0; display: block; border: 1px solid #dfe1e6;',
    a: 'color: #0052cc; text-decoration: none; border-bottom: 2px solid #deebff; font-weight: 500;',
    hr: 'border: none; margin: 34px 0; border-top: 2px solid #ebecf0;',
    table: 'width: 100%; border-collapse: separate; border-spacing: 0; margin: 22px 0; font-size: 14px; border-radius: 8px; overflow: hidden; box-shadow: 0 0 0 1px #dfe1e6; word-break: break-word;',
    th: 'padding: 14px 16px; background: #f4f5f7; font-weight: 700; text-align: left; color: #172b4d; word-break: break-word; border-bottom: 2px solid #dfe1e6;',
    td: 'padding: 14px 16px; text-align: left; word-break: break-word; border-bottom: 1px solid #ebecf0;'
  };

  var themes = {
    minimal: minimalTheme,
    elegant: elegantTheme,
    cyberpunk: cyberpunkTheme,
    fresh: freshTheme,
    "cyber-monthly": cyberMonthlyTheme,
    "cyber-alert": cyberAlertTheme,
    "cyber-tech": cyberTechTheme
  };

  var themeList = [
    { key: 'minimal',       name: '简约', color: '#6366f1' },
    { key: 'elegant',       name: '优雅', color: '#d4a76a' },
    { key: 'cyberpunk',     name: '赛博朋克', color: '#00ffff' },
    { key: 'fresh',         name: '清新', color: '#00897b' },
    { key: 'cyber-monthly', name: '赛博月刊', color: '#e67e22' },
    { key: 'cyber-alert',   name: '赛博警戒', color: '#f1c40f' },
    { key: 'cyber-tech',    name: '赛博技术', color: '#0052cc' }
  ];

  function getThemeStyles(n) { return themes[n] || themes.minimal; }

  root.WxThemes = { getThemeStyles: getThemeStyles, themes: themes, themeList: themeList };
})(window);
