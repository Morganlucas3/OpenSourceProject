chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      if (activeTab && activeTab.url && activeTab.url.indexOf('http') == 0) {
        chrome.tabs.executeScript(null, {file: 'content.js'}, function() {
          chrome.tabs.sendMessage(activeTab.id, {text: 'get_content'}, function(response) {
            if (response) {
              console.log('response')
            }
          });
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.text == 'help') {
    console.log('help')
  }
});


