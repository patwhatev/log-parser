document.addEventListener('DOMContentLoaded', function() {

  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.text == "EVENTS_LOADED") {
    console.log("event load msg received");
    document.body.classList.remove("animation", "animation-gif");
   }
});


  // Grab button id
  var filterButton = document.getElementById('filterData');
  // When button is clicked
  filterButton.addEventListener('click', function() {
    // Get selected tabs, send current tab, a job name, and some vars
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { text: "FILTER_BUTTON_CLICKED", filter: 'failing' });
    });

  });

  }, false);