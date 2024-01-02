function createButton(buttonClass, buttonImageSource) {
    console.log("I'm here!")
    let newButton = document.createElement('button');
    newButton.className = buttonClass;
    let addIcon = document.createElement('img');
    addIcon.src = buttonImageSource;
    newButton.appendChild(addIcon);
    newButton.addEventListener('click', buttonPress);
    return newButton;

}

const pTags = document.querySelectorAll('#main-text p');
pTags.forEach(notebookLine => {
    notebookLine.appendChild(createButton('add-button', './images/add.png'));
});

pTags.forEach(notebookLine => {
    notebookLine.appendChild(createButton('minus-button', './images/MINUS.png'));
});

const existingSpans = document.querySelectorAll('#main-text span')
existingSpans.forEach(insideContent => {
    console.log('I am doing my job')
    insideContent.setAttribute('contenteditable', 'true');
})

function buttonPress() {
    let button = this;
    if (drawMode === true) { return }
    else if (button.classList.contains('add-button')) {
        console.log("I'm here! Super here!")
        lineContainer = createLineType()
        button.parentNode.insertBefore(lineContainer, button);
    }

    else if (button.classList.contains('minus-button')) {
        console.log("Now, we're cooking.")
        button.parentNode.remove()
    }

    else if (button.classList.contains('swing-button')) {
        console.log("Hold me!");
        createLine('swing', button);

    }

    else if (button.classList.contains('beat-button')) {
        console.log("This beat is cool!")
        createLine('beat2', button);

    }

    //I'm only allowing quarter notes in this version

    else if (button.classList.contains('beat-button-1')) {
        console.log("eighth note")
        createLine('beat1', button);
    }
    // else if (button.classList.contains('beat-button-2'))
    // { 
    //     console.log("quarter note")
    //     createLine('beat2', button);
    //     beatContainer.remove();
    // }

    else if (button.classList.contains('beat-button-3')) {
        console.log("half note")
        createLine('beat3', button);
    }

    else if (button.classList.contains('rest-button-1')) {
        console.log("quarter rest")
        createLine('rest1', button);
    }

    // else if (button.classList.contains('rest-button-2'))
    // { 
    //     console.log("half rest")
    //     createLine('rest2', button);
    //     beatContainer.remove();
    // }


    else if (button.classList.contains('admonition-button')) {
        console.log("Don't do it!")
        createLine('admonition', button);

    }
}



const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', buttonPress)
})



function createLineType() {
    let lineStyleContainer = document.createElement('div');
    lineStyleContainer.className = 'line-style-container';
    lineStyleContainer.appendChild(createButton('swing-button', './images/swingLast.png'));
    lineStyleContainer.appendChild(createButton('beat-button', './images/beat-take3.png'));
    lineStyleContainer.appendChild(createButton('beat-button-1', './images/eighth2.png'));
    lineStyleContainer.appendChild(createButton('beat-button-3', './images/half2.png'));
    lineStyleContainer.appendChild(createButton('rest-button-1', './images/rest2.png'));

    lineStyleContainer.appendChild(createButton('admonition-button', './images/admonition-take3.png'));
    return lineStyleContainer;
}

// function beatType () {
//     let beatOptionsContainer = document.createElement('div');

//     beatOptionsContainer.className='beat-options-container';
//     beatOptionsContainer.appendChild(createButton ('beat-button-1', './images/eighth.png'));
//     beatOptionsContainer.appendChild(createButton ('beat-button-2', './images/quarter-beat.png'));
//     beatOptionsContainer.appendChild(createButton ('beat-button-3', './images/half-beat.png'));
//     beatOptionsContainer.appendChild(createButton ('rest-button-1', './images/quarter-rest.png'));
//     beatOptionsContainer.appendChild(createButton ('rest-button-2' ,  './images/half-rest.png'));
//     return beatOptionsContainer
// }


function createLine(lineClass, button) {
    let newLine = document.createElement('p');
    let newSpan = document.createElement('span');
    newSpan.setAttribute('contenteditable', 'true');
    newSpan.textContent = 'Click to Edit';
    newLine.className = lineClass;
    newLine.appendChild(newSpan);
    button.parentNode.parentNode.insertAdjacentElement('afterend', newLine);
    newLine.appendChild(createButton('add-button', './images/add.png'));
    newLine.appendChild(createButton('minus-button', './images/MINUS.png'));
    lineContainer.remove();
}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.lineWidth = 2
let isPainting = false;
let lineWidth = 2;
let startX;
let startY;
var drawMode = false;
console.log(drawMode)


function drawToggle(element) {
    if (element.innerText === 'DrawModeOn') {
        element.innerText = "DrawModeOff";
        drawMode = false;
        canvas.style.zIndex = 1;
        console.log(drawMode)
        existingSpans.forEach(insideContent => {
            console.log('Thank you for leaving me alone!')
            insideContent.setAttribute('contenteditable', 'true');
        })
    }
    else if (element.innerText === 'DrawModeOff') {
        element.innerText = "DrawModeOn";
        drawMode = true;
        canvas.style.zIndex = 100;
        console.log(drawMode)
        // buttons.forEach( button => {
        //     button.removeEventListener('click')
        // })
        existingSpans.forEach(insideContent => {
            console.log('I am trying to do my job!')
            insideContent.setAttribute('contenteditable', 'false');
        })
    }
}

function disableTextSelection() {
    document.body.style.userSelect = 'none';
}

function enableTextSelection() {
    document.body.style.userSelect = '';
}


canvas.addEventListener("mousedown", (e) => {
    if (drawMode === true) {
        console.log("drawing")
        disableTextSelection();
        e.preventDefault();
        const rect = e.target.getBoundingClientRect();
        isPainting = true
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
    }
    // startX=e.clientX -rect.left;
    // startY=e.clientY -rect.top;
});

const draw = (e) => {
    if (!isPainting) {
        return;
    }
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    ctx.lineWidth = lineWidth;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
    ctx.stroke();

    canvas.addEventListener("mouseup", (e) => {
        enableTextSelection();
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
    });


}
canvas.addEventListener("mousemove", draw);

document.getElementById('print-pdf').addEventListener('click', () => {
    window.print();
});


//saving function
function saveState() {
    // Get the entire inner HTML of the 'main-text' div
    const mainTextContent = document.getElementById('passage-paper').innerHTML;

    // Save this HTML content to local storage
    localStorage.setItem('myOutlinerContent', mainTextContent);
}


function loadState() {
    // Load the saved HTML content from local storage
    const savedContent = localStorage.getItem('myOutlinerContent');

    // If there is saved content, set it as the inner HTML of the 'main-text' div
    if (savedContent) {
        document.getElementById('passage-paper').innerHTML = savedContent;
    }
}

function exportState() {
    // Get the state from local storage
    const state = localStorage.getItem('myOutlinerContent');

    // Create a Blob from the state string
    const blob = new Blob([state], { type: 'application/json' });

    // Create a link element
    const downloadLink = document.createElement('a');
    downloadLink.download = 'myOutlinerState.json';
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.style.display = 'none';

    // Append the link to the DOM and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Clean up
    document.body.removeChild(downloadLink);
    window.URL.revokeObjectURL(downloadLink.href);
}

document.getElementById('export').addEventListener('click', exportState);

function importStateFromJson(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const savedState = e.target.result;
            localStorage.setItem('myOutlinerContent', savedState);
            loadState(); // Assuming loadState is your function to apply the state to your page
        };
        reader.readAsText(file);
    }
}

// Event listener for the file input
document.getElementById('importJson').addEventListener('change', importStateFromJson);

// Trigger file input when import button is clicked
document.getElementById('importButton').addEventListener('click', function () {
    document.getElementById('importJson').click();
});


//defunct

// buttons.addEventListener('click', () => console.log("I'm here! Super here!"))
// buttons.onclick =

// buttonPress.forEach (button =>{
//     button.onclick=(console.log('I am still here! Really!'))
//         if (button.className == 'add-button'){
//             button.onclick=(console.log('I am still here!'));
//             button.onclick = (createLineType ());
//     }
// })
// function pressAdd (buttonPress) {
//     if (button.className == 'add-button'){
//         button.onclick(console.log('I am still here! Really!'));
//         button.onclick (createLineType ());
//         addButton.parentNode.insertBefore(lineStyleContainer, addButton);
//     }
// }

//