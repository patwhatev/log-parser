document.addEventListener('DOMContentLoaded', function() {

  var loadButton = document.getElementById('loadData');
  loadButton.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { text: "BUTTON_CLICKED" });
    });
    
    document.body.classList.add("animation", "animation-gif"); 
  });



  chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.text == "EVENTS_LOADED") {
    console.log("event load msg received");
    document.body.classList.remove("animation", "animation-gif");
   }
});


  var filterButton = document.getElementById('filterData');
  filterButton.addEventListener('click', function() {
  	console.log("filter button clicked");
    chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { text: "FILTER_BUTTON_CLICKED", filter: document.querySelector('.text').value });
    });

  });

  }, false);