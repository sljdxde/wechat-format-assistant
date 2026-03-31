var markdownConverter = require('../../converter/markdownToHtml.js');
var markdownToWechatHtml = markdownConverter.markdownToWechatHtml;
var themeModule = require('../../themes/index.js');
var themeList = themeModule.themeList;

function getHost() {
  if (typeof tt !== 'undefined') {
    return tt;
  }

  return null;
}

function showToast(title, icon) {
  var host = getHost();

  if (host && typeof host.showToast === 'function') {
    host.showToast({
      title: title,
      icon: icon || 'none'
    });
    return;
  }

  console.log('[toast]', title);
}

function invokeHostMethod(method, options, onSuccess, onFail) {
  if (typeof method !== 'function') {
    if (typeof onFail === 'function') {
      onFail(new Error('API unavailable'));
    }
    return;
  }

  var request = {};
  var key;

  if (options) {
    for (key in options) {
      if (Object.prototype.hasOwnProperty.call(options, key)) {
        request[key] = options[key];
      }
    }
  }

  request.success = function (res) {
    if (typeof onSuccess === 'function') {
      onSuccess(res || {});
    }
  };

  request.fail = function (err) {
    if (typeof onFail === 'function') {
      onFail(err || new Error('API call failed'));
    }
  };

  try {
    method(request);
  } catch (error) {
    if (typeof onFail === 'function') {
      onFail(error);
    }
  }
}

function getDocMarkdownMethod(host) {
  if (!host) {
    return null;
  }

  if (typeof host.getDocAsMarkdown === 'function') {
    return function (options) {
      host.getDocAsMarkdown(options);
    };
  }

  if (host.doc && typeof host.doc.getAsMarkdown === 'function') {
    return function (options) {
      host.doc.getAsMarkdown(options);
    };
  }

  if (host.doc && typeof host.doc.getMarkdown === 'function') {
    return function (options) {
      host.doc.getMarkdown(options);
    };
  }

  if (host.docs && typeof host.docs.getAsMarkdown === 'function') {
    return function (options) {
      host.docs.getAsMarkdown(options);
    };
  }

  return null;
}

Page({
  data: {
    loading: false,
    generateButtonText: '生成排版',
    content: '',
    htmlStructure: '<div style="text-align: center; color: #999; margin-top: 50px;">点击下方按钮生成排版</div>',
    currentTheme: 'minimal',
    themeList: themeList
  },

  onLoad: function () {
    console.log('App loaded');
  },

  setLoadingState: function (loading) {
    this.setData({
      loading: !!loading,
      generateButtonText: loading ? '读取中...' : '生成排版'
    });
  },

  generateFormat: function () {
    var that = this;
    var host = getHost();
    var getMarkdown = getDocMarkdownMethod(host);

    if (!getMarkdown) {
      showToast('当前环境不支持读取文档', 'none');
      return;
    }

    this.setLoadingState(true);

    invokeHostMethod(
      getMarkdown,
      {},
      function (res) {
        var markdown = res && res.markdown ? res.markdown : '';

        if (!markdown) {
          console.error('getDocAsMarkdown err', new Error('Markdown content is empty'));
          that.setLoadingState(false);
          showToast('读取文档失败', 'fail');
          return;
        }

        console.log('Got markdown length:', markdown.length);

        var html = markdownToWechatHtml(markdown, that.data.currentTheme);

        that.setData({
          content: markdown,
          htmlStructure: html
        });
        that.setLoadingState(false);
        showToast('排版生成成功', 'success');
      },
      function (error) {
        console.error('getDocAsMarkdown err', error);
        that.setLoadingState(false);
        showToast('读取文档失败', 'fail');
      }
    );
  },

  switchTheme: function (e) {
    var theme = e.currentTarget.dataset.theme;
    if (!theme || theme === this.data.currentTheme) {
      return;
    }
    this.setData({ currentTheme: theme });
    // Re-generate if content exists
    if (this.data.content) {
      var html = markdownToWechatHtml(this.data.content, theme);
      this.setData({ htmlStructure: html });
    }
  },

  copyToClipboard: function () {
    var that = this;
    var host = getHost();

    if (!this.data.htmlStructure || this.data.htmlStructure.indexOf('点击下方按钮') !== -1) {
      showToast('请先生成排版', 'none');
      return;
    }

    if (!host || typeof host.setClipboardData !== 'function') {
      showToast('当前环境不支持复制', 'none');
      return;
    }

    invokeHostMethod(
      function (options) {
        host.setClipboardData({
          data: that.data.htmlStructure,
          success: options.success,
          fail: options.fail
        });
      },
      {},
      function () {
        showToast('已复制到剪贴板', 'success');
      },
      function (error) {
        console.error('Copy failed', error);
        showToast('复制失败', 'fail');
      }
    );
  }
});
