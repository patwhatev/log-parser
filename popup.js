document.addEventListener('DOMContentLoaded', function() {

  var loadButton = document.getElementById('loadData');
  loadButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { text: "BUTTON_CLICKED" });
    });

  });

  }, false);
