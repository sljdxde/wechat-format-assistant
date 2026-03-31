App({
  onLaunch: function (args) {
    console.log('App Launch');
    console.log(args && args.query ? args.query : {});
  },

  onShow: function (args) {
    console.log('App Show');
    console.log(args || {});
    console.log('-------------');
    this.setupUpdateManager();
  },

  onHide: function () {
    console.log('App Hide');
  },

  setupUpdateManager: function () {
    if (typeof tt === 'undefined' || typeof tt.getUpdateManager !== 'function') {
      return;
    }

    try {
      var updateManager = tt.getUpdateManager();

      if (!updateManager) {
        return;
      }

      if (typeof updateManager.onCheckForUpdate === 'function') {
        updateManager.onCheckForUpdate(function (result) {
          console.log('is there any update?: ' + !!(result && result.hasUpdate));
        });
      }

      if (typeof updateManager.onUpdateReady === 'function') {
        updateManager.onUpdateReady(function () {
          if (typeof tt.showModal !== 'function') {
            if (typeof updateManager.applyUpdate === 'function') {
              updateManager.applyUpdate();
            }
            return;
          }

          tt.showModal({
            title: '更新提示',
            content: '新版本已准备好，是否立即重启？',
            success: function (res) {
              if (res && res.confirm && typeof updateManager.applyUpdate === 'function') {
                updateManager.applyUpdate();
              }
            }
          });
        });
      }

      if (typeof updateManager.onUpdateFailed === 'function') {
        updateManager.onUpdateFailed(function () {
          console.warn('Gadget update failed');
        });
      }
    } catch (error) {
      console.warn('Update manager is unavailable in the current host.', error);
    }
  },

  globalData: {
    hasLogin: false,
    openid: null
  }
});
