// ========== 基础样式模板 ==========
var baseStyles = {
  img: 'max-width: 100%; height: auto; border-radius: 4px; margin: 10px 0; display: block;',
  table: 'width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 14px;',
  hr: 'border: none; margin: 25px 0;'
};

// ========== 简约主题 ==========
var minimalTheme = {
  container: 'padding: 10px; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif; background: #ffffff;',
  content: 'max-width: 677px; margin: 0 auto; color: #333333; line-height: 1.8; font-size: 15px; letter-spacing: 1px;',
  h1: 'font-size: 22px; font-weight: bold; color: #222222; margin-top: 30px; margin-bottom: 20px; line-height: 1.5; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;',
  h2: 'font-size: 18px; font-weight: bold; color: #333333; margin-top: 25px; margin-bottom: 15px; line-height: 1.5;',
  h3: 'font-size: 16px; font-weight: bold; color: #444444; margin-top: 20px; margin-bottom: 15px; line-height: 1.5;',
  p: 'margin-top: 15px; margin-bottom: 15px; text-align: justify;',
  strong: 'font-weight: bold; color: #111111;',
  em: 'font-style: italic; color: #555555;',
  blockquote: 'margin: 20px 0; padding: 15px 20px; background-color: #f7f7f7; border-left: 4px solid #b3b3b3; color: #666666; font-size: 14px; line-height: 1.7;',
  ul: 'margin-top: 15px; margin-bottom: 15px; padding-left: 20px; list-style-type: disc;',
  ol: 'margin-top: 15px; margin-bottom: 15px; padding-left: 20px; list-style-type: decimal;',
  li: 'margin-bottom: 8px; text-align: justify;',
  pre: 'background: #f6f8fa; border-radius: 4px; padding: 16px; overflow-x: auto; margin: 15px 0; font-size: 13px; line-height: 1.6;',
  code: 'font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; color: #333; background: none; padding: 0;',
  inlineCode: 'background: #f0f0f0; padding: 2px 6px; border-radius: 3px; font-size: 90%; font-family: "SFMono-Regular", Consolas, monospace; color: #c7254e;',
  img: baseStyles.img,
  a: 'color: #576b95; text-decoration: none; border-bottom: 1px solid #d3d8e0;',
  hr: baseStyles.hr + 'border-top: 1px solid #eaeaea;',
  table: baseStyles.table,
  th: 'border: 1px solid #dfe2e5; padding: 8px 12px; background: #f6f8fa; font-weight: bold; text-align: left;',
  td: 'border: 1px solid #dfe2e5; padding: 8px 12px; text-align: left;'
};

// ========== 优雅主题 ==========
var elegantTheme = {
  container: 'padding: 10px; font-family: "Georgia", "Songti SC", "SimSun", "PingFang SC", serif; background: #fefcf9;',
  content: 'max-width: 677px; margin: 0 auto; color: #3d3229; line-height: 2; font-size: 15px; letter-spacing: 1.2px;',
  h1: 'font-size: 24px; font-weight: bold; color: #5b3a1a; margin-top: 35px; margin-bottom: 20px; line-height: 1.5; text-align: center; border-bottom: 2px solid #d4a76a; padding-bottom: 12px;',
  h2: 'font-size: 19px; font-weight: bold; color: #6b4423; margin-top: 28px; margin-bottom: 16px; line-height: 1.5; border-left: 4px solid #d4a76a; padding-left: 12px;',
  h3: 'font-size: 17px; font-weight: bold; color: #7a5533; margin-top: 22px; margin-bottom: 14px; line-height: 1.5;',
  p: 'margin-top: 16px; margin-bottom: 16px; text-align: justify; text-indent: 2em;',
  strong: 'font-weight: bold; color: #5b3a1a;',
  em: 'font-style: italic; color: #8b6f4e;',
  blockquote: 'margin: 20px 0; padding: 18px 24px; background-color: #faf5ee; border-left: 4px solid #d4a76a; color: #6b5b4e; font-size: 14px; line-height: 1.8; font-style: italic;',
  ul: 'margin-top: 16px; margin-bottom: 16px; padding-left: 22px; list-style-type: disc;',
  ol: 'margin-top: 16px; margin-bottom: 16px; padding-left: 22px; list-style-type: decimal;',
  li: 'margin-bottom: 10px; text-align: justify; text-indent: 0;',
  pre: 'background: #faf5ee; border: 1px solid #e8ddd0; border-radius: 6px; padding: 16px; overflow-x: auto; margin: 16px 0; font-size: 13px; line-height: 1.6;',
  code: 'font-family: "SFMono-Regular", Consolas, Menlo, monospace; color: #6b4423; background: none; padding: 0;',
  inlineCode: 'background: #f5ebe0; padding: 2px 6px; border-radius: 3px; font-size: 90%; font-family: Consolas, monospace; color: #9b5c2e;',
  img: baseStyles.img,
  a: 'color: #9b5c2e; text-decoration: none; border-bottom: 1px solid #d4a76a;',
  hr: baseStyles.hr + 'border-top: 1px dashed #d4a76a;',
  table: baseStyles.table,
  th: 'border: 1px solid #e0d5c7; padding: 10px 14px; background: #faf5ee; font-weight: bold; text-align: left; color: #5b3a1a;',
  td: 'border: 1px solid #e0d5c7; padding: 10px 14px; text-align: left;'
};

// ========== 科技主题 ==========
var techTheme = {
  container: 'padding: 10px; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", Arial, sans-serif; background: #f5f7fa;',
  content: 'max-width: 677px; margin: 0 auto; color: #2c3e50; line-height: 1.8; font-size: 15px; letter-spacing: 0.8px;',
  h1: 'font-size: 22px; font-weight: 700; color: #1a73e8; margin-top: 32px; margin-bottom: 18px; line-height: 1.4; padding-bottom: 10px; border-bottom: 2px solid #1a73e8;',
  h2: 'font-size: 18px; font-weight: 700; color: #1565c0; margin-top: 26px; margin-bottom: 14px; line-height: 1.4; background: linear-gradient(90deg, #e8f0fe 0%, transparent 100%); padding: 6px 12px; border-radius: 4px;',
  h3: 'font-size: 16px; font-weight: 600; color: #1976d2; margin-top: 22px; margin-bottom: 12px; line-height: 1.4;',
  p: 'margin-top: 14px; margin-bottom: 14px; text-align: justify;',
  strong: 'font-weight: 700; color: #1a73e8;',
  em: 'font-style: italic; color: #5f6368;',
  blockquote: 'margin: 18px 0; padding: 14px 20px; background-color: #e8f0fe; border-left: 4px solid #1a73e8; color: #3c4858; font-size: 14px; line-height: 1.7; border-radius: 0 6px 6px 0;',
  ul: 'margin-top: 14px; margin-bottom: 14px; padding-left: 20px; list-style-type: none;',
  ol: 'margin-top: 14px; margin-bottom: 14px; padding-left: 20px; list-style-type: decimal;',
  li: 'margin-bottom: 8px; text-align: justify; position: relative; padding-left: 6px;',
  pre: 'background: #1e293b; border-radius: 8px; padding: 18px; overflow-x: auto; margin: 16px 0; font-size: 13px; line-height: 1.6;',
  code: 'font-family: "Fira Code", "SFMono-Regular", Consolas, monospace; color: #e2e8f0; background: none; padding: 0;',
  inlineCode: 'background: #e8f0fe; padding: 2px 8px; border-radius: 4px; font-size: 90%; font-family: "Fira Code", Consolas, monospace; color: #1a73e8;',
  img: baseStyles.img + ' border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08);',
  a: 'color: #1a73e8; text-decoration: none; font-weight: 500;',
  hr: baseStyles.hr + 'border-top: 2px solid #e8f0fe;',
  table: baseStyles.table,
  th: 'border: 1px solid #d2e3fc; padding: 10px 14px; background: #e8f0fe; font-weight: 600; text-align: left; color: #1565c0;',
  td: 'border: 1px solid #d2e3fc; padding: 10px 14px; text-align: left;'
};

// ========== 清新主题 ==========
var freshTheme = {
  container: 'padding: 10px; font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Microsoft YaHei", Arial, sans-serif; background: #f0faf5;',
  content: 'max-width: 677px; margin: 0 auto; color: #2d3436; line-height: 1.9; font-size: 15px; letter-spacing: 1px;',
  h1: 'font-size: 22px; font-weight: bold; color: #00897b; margin-top: 32px; margin-bottom: 18px; line-height: 1.5; border-bottom: 2px solid #80cbc4; padding-bottom: 10px; text-align: center;',
  h2: 'font-size: 18px; font-weight: bold; color: #00796b; margin-top: 26px; margin-bottom: 14px; line-height: 1.5; padding-left: 12px; border-left: 4px solid #4db6ac;',
  h3: 'font-size: 16px; font-weight: bold; color: #00897b; margin-top: 22px; margin-bottom: 12px; line-height: 1.5;',
  p: 'margin-top: 15px; margin-bottom: 15px; text-align: justify;',
  strong: 'font-weight: bold; color: #00695c;',
  em: 'font-style: italic; color: #546e7a;',
  blockquote: 'margin: 18px 0; padding: 16px 22px; background-color: #e0f2f1; border-left: 4px solid #4db6ac; color: #37474f; font-size: 14px; line-height: 1.8; border-radius: 0 8px 8px 0;',
  ul: 'margin-top: 15px; margin-bottom: 15px; padding-left: 20px; list-style-type: disc;',
  ol: 'margin-top: 15px; margin-bottom: 15px; padding-left: 20px; list-style-type: decimal;',
  li: 'margin-bottom: 8px; text-align: justify;',
  pre: 'background: #e8f5e9; border: 1px solid #c8e6c9; border-radius: 8px; padding: 16px; overflow-x: auto; margin: 16px 0; font-size: 13px; line-height: 1.6;',
  code: 'font-family: "SFMono-Regular", Consolas, Menlo, monospace; color: #2e7d32; background: none; padding: 0;',
  inlineCode: 'background: #e0f2f1; padding: 2px 6px; border-radius: 4px; font-size: 90%; font-family: Consolas, monospace; color: #00796b;',
  img: baseStyles.img + ' border-radius: 8px;',
  a: 'color: #00897b; text-decoration: none; border-bottom: 1px solid #80cbc4;',
  hr: baseStyles.hr + 'border-top: 1px solid #b2dfdb;',
  table: baseStyles.table,
  th: 'border: 1px solid #b2dfdb; padding: 10px 14px; background: #e0f2f1; font-weight: bold; text-align: left; color: #00695c;',
  td: 'border: 1px solid #b2dfdb; padding: 10px 14px; text-align: left;'
};

// ========== 主题注册 ==========
var themes = {
  minimal: minimalTheme,
  elegant: elegantTheme,
  tech: techTheme,
  fresh: freshTheme
};

var themeList = [
  { key: 'minimal', name: '简约' },
  { key: 'elegant', name: '优雅' },
  { key: 'tech', name: '科技' },
  { key: 'fresh', name: '清新' }
];

function getThemeStyles(themeName) {
  return themes[themeName] || themes.minimal;
}

module.exports = {
  getThemeStyles: getThemeStyles,
  themes: themes,
  themeList: themeList
};
