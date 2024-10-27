document.addEventListener('DOMContentLoaded', () => {
    const statusText = document.getElementById('status');
    const toggleButton = document.getElementById('toggle');
  
    chrome.storage.local.get(['isBlocking'], (data) => {
      updateUI(data.isBlocking);
    });
  
    toggleButton.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'toggleBlocking' }, (response) => {
        updateUI(response.isBlocking);
      });
    });
  
    function updateUI(isBlocking) {
      statusText.textContent = isBlocking ? 'On' : 'Off';
      toggleButton.textContent = isBlocking ? 'Disable' : 'Enable';
    }
  });
  