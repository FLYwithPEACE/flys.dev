function oAuthInitDeviceId() {
    if (!localStorage.getItem('_deviceId2') && window.NativeShell && window.NativeShell.AppHost) {
      const deviceId = window.NativeShell.AppHost.deviceId();
      if (deviceId) {
        console.log('[OAuth] Adding device id to local storage...')
        localStorage.setItem('_deviceId2', deviceId);
      }
    }
  }
  
  function oAuthDisableButton(button) {
    button.disabled = true;
    button.style.opacity = 0.5;
    setTimeout(() => {
      button.disabled = false;
      button.style.opacity = 1;
    }, 3000);
  }
  
  (() => {
  
    function getContainer() {
      return document.querySelector('#loginPage .disclaimer');
    }  
  
    function createButton(container) {
      if (!document.querySelector('#loginPage #OAuthStyle')) {
        console.log('[OAuth] Adding button to login page...');
        container.innerHTML = `
          <style id="OAuthStyle">
            .disclaimer {
              display: contents;
            }
            .emby-button:not(.btnOAuth) {
              filter: grayscale();
            }
            .btnOAuth {
              margin-top: 1rem;
            }
          </style>
          <a class="raised cancel block btnOAuth emby-button"
             onclick="oAuthDisableButton(this); oAuthInitDeviceId();"
             href="/sso/OID/start/OAuth" target="_self">
            Sign in with OAuth
          </a>`;
      }
    }
  
    function waitForContainer() {
      console.log('[OAuth] On login page, waiting for the login form...')
  
      const observer = new MutationObserver((mutations) => {
        const container = getContainer();
        if (container) {
          observer.disconnect();
          createButton(container);
        }
      })
  
      observer.observe(document.body, {
        childList: true, subtree: true, attributes: false, characterData: false
      })
    }
  
    addEventListener("DOMContentLoaded", (event) => {
      setTimeout(() => {
        if (location.href.includes('login.html')) {
          console.log('[OAuth] Waiting to add the OAuth button to the login page...');
          const container = getContainer();
          if (container) {
            createButton(container);
          } else {
            waitForContainer();
          }
        }
      }, 2000);
    });
  
  })();