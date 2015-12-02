var replacementPairs = new Object();

function storeUndesired(k,v) {
  replacementPairs[k] = v;
};

function replaceWord(node) { 
  for(var key in replacementPairs) { 
      var value = replacementPairs[key];
        node.nodeValue = node.nodeValue.replace(new RegExp("\\b"+key+"\\b", 'g' ), String(value));
  }

};

// traverse the DOM, ignoring all but text nodes
function walk(root){
  var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  // Modify each text node's value
  var n;
  while (n = walker.nextNode()) {
    replaceWord(n);
  }
}

// walk when new text nodes are added to the DOM
function handleMutations(mutations) {
  mutations.forEach(function(mutation) {
    Array.prototype.slice.call(mutation.addedNodes).forEach(function(node){
      if (node.nodeType === 3){  // TEXT_NODE
  replaceWord(node);
      } else {
  walk(node);
      }
    });
  });    
}

// Alter the inital page source


//walk(document.body);
setInterval(function(){ walk(document.body); }, 3000);


// use a MutationObserver to replace new DOM nodes
var observerConfig = {
  childList: true, 
  subtree: true,
  characterData: true
};

var bodyObserver = new MutationObserver(handleMutations);
bodyObserver.observe(document.body, observerConfig);

// and if there's a title, replace it too
var docTitle = document.getElementsByTagName("title")[0];
if (docTitle){
  walk(docTitle);
  var titleObserver = new MutationObserver(handleMutations);
  titleObserver.observe(docTitle, observerConfig);
}


chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if(msg.text == "FILTER_BUTTON_CLICKED") { 
  
    storeUndesired(String(msg.filter), String(msg.replace));           
  }
});
