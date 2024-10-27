chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ isBlocking: true });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'toggleBlocking') {
      chrome.storage.local.get('isBlocking', (data) => {
        const newStatus = !data.isBlocking;
        chrome.storage.local.set({ isBlocking: newStatus });
        chrome.declarativeNetRequest.updateEnabledRulesets({
          enableRulesetIds: newStatus ? ["ruleset_1"] : [],
          disableRulesetIds: newStatus ? [] : ["ruleset_1"]
        });
        sendResponse({ isBlocking: newStatus });
      });
      return true; // Required for asynchronous `sendResponse`
    }
  });
  