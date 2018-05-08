// Setting up new model for rapid string splitting, sorting, replacing and formatting

// First, split the bulk string into testRuns 

// Once we have our test run, do some formatting
// Remove erroneous data: let cleaned = testRun.replace(/\[(.*?)\]/gm, "");

// Create new elements for each testRun
// Use css/jquery to place failing tests up top, passing tests in sidebar? 
// ^^ assign classes determining where these should go


// Remove existing text from dom once stored

// let existingText = document.querySelector('pre');

// existingText.parentNode.removeChild(existingText);




// Create new element in the DOM 

// let newNode = document.createElement('div');
// let textNode = document.createTextNode(cleaned);
// newNode.appendChild(textNode);

// var elem = document.body;
// elem.appendChild(newNode)

const getTestRuns = (callback) => {
  let textBlob = document.querySelector('pre').textContent;
  let testRuns = textBlob.split('------------------------------------------------------------------');

  let lastRun = testRuns[testRuns.length - 1].split('==================================================================');
  let suiteSummary = null

  if(lastRun.length === 2) {
    // disclude summary from final test run
    testRuns[testRuns.length - 1] = lastRun[0];
    // properly format test summary
    suiteSummary = lastRun[lastRun.length - 1];
    suiteSummary = suiteSummary.split('1) ');
    suiteSummary = suiteSummary[0];
  }
  
  // return testRuns;
  callback(testRuns, suiteSummary);
}

const insertElement = (tag, className, appendTarget, value, styles, prepend) => {
  // create element and find target
  let item = document.createElement(tag);
  let target = document.querySelector(appendTarget);

  // Set text if appropriate
  if (value !== undefined) {
    item.textContent = value;
  } else if (styles !== undefined) {
    item.setAttribute('style', styles);
  }

  // set attrs and append to target
  item.setAttribute('class', className);
  
  if(prepend) {
    return target.prepend(item);
  } else {
    return target.appendChild(item);    
  }
}


const cleanAndSortDOM = () => {
  getTestRuns((testRuns, suiteSummary) => {
    // remove existing test results
    let existingText = document.querySelector('pre');
    existingText.parentNode.removeChild(existingText);

    // create session summary
    let summary = insertElement('pre', 'summary', 'body', suiteSummary, 'font-family: helvetica');
    summary.setAttribute('style', 'font-family:helvetica;');

    // create pass and fail boxes
    const fails = insertElement('div', 'failbox', 'body');
    fails.setAttribute('style', 'float:left; width:65%; overflow:hidden; margin-top:-12px;');
    const passes = insertElement('div', 'passbox', 'body');
    passes.setAttribute('style', 'margin-left:65%;');

    // create scrollboxes for p/f
    const passBox = insertElement('div', 'testPasses', 'div[class="passbox"]');
    passBox.setAttribute('style', 'height:90%; overflow: auto;');
    const failBox = insertElement('div', 'testFails', 'div[class="failbox"]');
    failBox.setAttribute('style', 'height:90%; overflow: auto;');

    // counters
    let failCount = 0;
    let passCount = 0;

    // iterate over runs.. payload test runs into boxes
    testRuns.forEach(run => {

      // remove browser/os stamps
      let cleaned = run.replace(/\[(.*?)\]/gm, "");

      // create pre tag to preserve format, set styles
      let newNode = document.createElement('pre');
      let br = document.createElement('br');
      let textNode = document.createTextNode(cleaned);
      newNode.appendChild(textNode);
      newNode.setAttribute('style', 'margin:0px20px; font-family:helvetica; overflow: scroll;');

      // determine if spec failed
      let failing = cleaned.includes('failing');

      // Send run to one of two boxes
      if(failing) {
        newNode.setAttribute('style', 'background-color:#f9a290;')
        failBox.appendChild(newNode);
        failBox.appendChild(br);
        failCount += 1;
      } else {
        newNode.setAttribute('style', 'background-color:#96cc9f;')
        passBox.appendChild(newNode);
        passBox.appendChild(br);
        passCount += 1;
      }
      
    });

    // create titles
    let passtitle = insertElement('h4', 'title pass', 'div[class="passbox"]', `Passing Tests (${passCount})`, 'position:fixed;', true);
    let failtitle = insertElement('h4', 'title fail', 'div[class="failbox"]', `Failing Tests (${failCount})`, 'position:fixed;', true);
    document.body.setAttribute('style', 'font-family: helvetica');

  });
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if(msg.text == "FILTER_BUTTON_CLICKED") { 
  
    cleanAndSortDOM();           
  }
});
