function loadEvents(e) {
var intervalFunc = setInterval(function() {
    var btn = document.querySelector('.load-more');
    if(btn) {
      btn.click();
    }
    else {
    	alert("Events have finished loading");
    	clearInterval(intervalFunc);
    }
  }, 500);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.text == "BUTTON_CLICKED") {
	   loadEvents();
   }
});
