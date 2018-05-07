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
  
  // return testRuns;
  callback(testRuns);
}

const insertElement = (tag, className, appendTarget, value, styles) => {
  // create element and find target
  let item = document.createElement(tag);
  let target = document.querySelector(appendTarget);

  console.log(`current style eval: ${styles !== undefined} . . . retrieved styles: ${styles}`);

  // Set text if appropriate
  if (value !== undefined) {
    item.textContent = value;
  } else if (styles !== undefined) {
    console.log(`set styles: ${styles}`);
    item.setAttribute('style', styles);
  }

  // set attrs and append to target
  item.setAttribute('class', className);
  
  return target.appendChild(item);
}


const cleanAndSortDOM = () => {
  getTestRuns(testRuns => {
    // remove existing test results
    let existingText = document.querySelector('pre');
    existingText.parentNode.removeChild(existingText);

    // create pass and fail boxes
    const fails = insertElement('div', 'failbox', 'body');
    fails.setAttribute('style', 'float:left; width:65%; overflow:hidden;');
    const passes = insertElement('div', 'passbox', 'body');
    passes.setAttribute('style', 'margin-left:65%;');

    insertElement('h2', 'title pass', 'div[class="passbox"]', 'Passing Runs', 'position:fixed;');
    insertElement('h2', 'title fail', 'div[class="failbox"]', 'Failing Runs', 'position:fixed;');

    const passBox = insertElement('div', 'testPasses', 'div[class="passbox"]');
    passBox.setAttribute('style', 'height:90%; overflow: auto;');
    const failBox = insertElement('div', 'testFails', 'div[class="failbox"]');
    failBox.setAttribute('style', 'height:90%; overflow: auto;');


    // payload test runs into body
    testRuns.forEach(run => {

      let cleaned = run.replace(/\[(.*?)\]/gm, "");

      console.log('logging new cleaned var: ')
      console.log(cleaned);

      let newNode = document.createElement('pre');
      let br = document.createElement('br');
      let textNode = document.createTextNode(cleaned);

      newNode.appendChild(textNode);
      newNode.setAttribute('style', 'margin:0px20px; font-family:helvetica; background-color:#ddd');

      console.log(`running failing check: ${cleaned.includes('failing')}`);

      let failing = cleaned.includes('failing');

      // Send run to one of two boxes
      if(failing) {
        failBox.appendChild(newNode);
        failBox.appendChild(br);
      } else {
        passBox.appendChild(newNode);
        passBox.appendChild(br);
      }
      
    });
  });
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {

  if(msg.text == "FILTER_BUTTON_CLICKED") { 
  
    cleanAndSortDOM();           
  }
});
