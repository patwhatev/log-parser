document.addEventListener('DOMContentLoaded', function() {

  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.text == "EVENTS_LOADED") {
    console.log("event load msg received");
    document.body.classList.remove("animation", "animation-gif");
   }
});


  var filterButton = document.getElementById('filterData');
  filterButton.addEventListener('click', function() {
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { text: "FILTER_BUTTON_CLICKED", filter: document.querySelector('.undesiredWord').value, replace: document.querySelector('.replaceWith').value });
    });

  });

  }, false);