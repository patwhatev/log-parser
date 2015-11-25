function loadEvents(e) {
var intervalFunc = setInterval(function() {
    var btn = document.querySelector('.load-more');
    if(btn) {
      btn.click();
      console.log("new page rendered");
    }
    else {
    	clearInterval(intervalFunc);
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendMessage(tab.id, { text: "EVENTS_LOADED" });
      });
    }
  }, 500);  
}

function hideViewsAndClicks(e) {
  console.log(e);
  var events = document.querySelectorAll('.events li');
    for(var i = 0; i < events.length; i++) {
      var given_event = events[i].querySelector('.name');
      var regex = new RegExp( e, 'g' );
        if ( given_event.innerHTML.match(regex) ) {
          
        }
        else {
          given_event.parentNode.parentNode.style.display="none";
        }
  }
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.text == "BUTTON_CLICKED") {
    loadEvents();
   }
   else if(msg.text == "FILTER_BUTTON_CLICKED") {
    hideViewsAndClicks(msg.filter);
           
  }
});
