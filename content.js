function loadEvents() {
  setInterval(function() {
    var btn = document.querySelector('.load-more');
    if(btn) {
      btn.click();
    }
  }, 500);
}

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if (msg.text == "BUTTON_CLICKED") {
	   loadEvents();
   }
});
