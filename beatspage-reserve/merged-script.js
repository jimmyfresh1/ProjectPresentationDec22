function createButton (buttonClass, buttonImageSource) {
    console.log("I'm here!")
    let addButton = document.createElement('button');
    addButton.className= buttonClass;
    let addIcon = document.createElement('img');
    addIcon.src = buttonImageSource;
    addButton.appendChild(addIcon);
    addButton.addEventListener('click', buttonPress);
    return addButton;
    
}

const pTags = document.querySelectorAll('#main-text p');
pTags.forEach (notebookLine => {
    notebookLine.appendChild(createButton('add-button', './images/add.png'));
});

const existingSpans = document.querySelectorAll ('#main-text span')
existingSpans.forEach (insideContent=> {
    console.log('I am doing my job')
    insideContent.setAttribute ('contenteditable', 'true');
})

function buttonPress (){
    let button= this;
    if (drawMode === true)
    {return}
    else if (button.classList.contains('add-button'))
    {
        console.log("I'm here! Super here!")
        lineContainer = createLineType ()
        button.parentNode.insertBefore(lineContainer, button);
        button.style.display ='none';
    }

    else if (button.classList.contains('swing-button'))
    { 
        console.log("Hold me!");
        createLine('swing', button);
    }

    else if (button.classList.contains('beat-button'))
    { 
        console.log("This beat is cool!")
        console.log(lineContainer);
        beatContainer = beatType();
        console.log(beatContainer);
        lineContainer.parentNode.insertBefore(beatContainer, lineContainer)
        lineContainer.remove();
    }

    else if (button.classList.contains('beat-button-1'))
        { 
            console.log("eighth note")
            createLine('beat1', button);
            beatContainer.remove();
        }
    else if (button.classList.contains('beat-button-2'))
    { 
        console.log("quarter note")
        createLine('beat2', button);
        beatContainer.remove();
    }

    else if (button.classList.contains('beat-button-3'))
    { 
        console.log("half note")
        createLine('beat3', button);
        beatContainer.remove();
    }

    else if (button.classList.contains('rest-button-1'))
    { 
        console.log("quarter rest")
        createLine('rest1', button);
        beatContainer.remove();
    }

    else if (button.classList.contains('rest-button-2'))
    { 
        console.log("half rest")
        createLine('rest2', button);
        beatContainer.remove();
    }
    

    else if (button.classList.contains('admonition-button'))
    { 
        console.log("Don't do it!")
        createLine('admonition', button);
    }
}



const buttons = document.querySelectorAll ('button');
buttons.forEach(button => {
    button.addEventListener('click', buttonPress)
})



function createLineType (){
    let lineStyleContainer = document.createElement('div');
    lineStyleContainer.className='line-style-container';
    lineStyleContainer.appendChild(createButton ('swing-button', './images/swingLast.png'));
    lineStyleContainer.appendChild(createButton ('beat-button', './images/beat-take3.png'));
    lineStyleContainer.appendChild(createButton ('admonition-button', './images/admonition-take3.png'));
    return lineStyleContainer;
}

function beatType () {
    let beatOptionsContainer = document.createElement('div');
    
    beatOptionsContainer.className='beat-options-container';
    beatOptionsContainer.appendChild(createButton ('beat-button-1', './images/eighth.png'));
    beatOptionsContainer.appendChild(createButton ('beat-button-2', './images/quarter-beat.png'));
    beatOptionsContainer.appendChild(createButton ('beat-button-3', './images/half-beat.png'));
    beatOptionsContainer.appendChild(createButton ('rest-button-1', './images/quarter-rest.png'));
    beatOptionsContainer.appendChild(createButton ('rest-button-2' ,  './images/half-rest.png'));
    return beatOptionsContainer
}


function createLine (lineClass, button){
    let newLine = document.createElement('p');
    let newSpan= document.createElement('span');
    newSpan.setAttribute ('contenteditable', 'true');
    newSpan.textContent = 'Click to Edit';
    newLine.className = lineClass;
    newLine.appendChild(newSpan);
    button.parentNode.parentNode.insertAdjacentElement('afterend', newLine);
    newLine.appendChild(createButton('add-button', './images/add.png'));
    lineContainer.remove();
}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
ctx.lineWidth=2
let isPainting = false; 
let lineWidth=2;
let startX;
let startY;
var drawMode=false;
console.log(drawMode)


function drawToggle(element){
    if (element.innerText==='DrawModeOn'){
        element.innerText = "DrawModeOff";
        drawMode=false;
        console.log(drawMode)
        existingSpans.forEach (insideContent=> {
            console.log('Thank you for leaving me alone!')
            insideContent.setAttribute ('contenteditable', 'true');
        })
}
    else if (element.innerText === 'DrawModeOff'){
        element.innerText ="DrawModeOn";
        drawMode=true;
        console.log(drawMode)
        // buttons.forEach( button => {
        //     button.removeEventListener('click')
        // })
        existingSpans.forEach (insideContent=> {
            console.log('I am trying to do my job!')
            insideContent.setAttribute ('contenteditable', 'false');
    })
}
}




canvas.addEventListener("mousedown", (e) => {
    if (drawMode===true){
    const rect = e.target.getBoundingClientRect();
    isPainting = true
    ctx.beginPath;
    ctx.moveTo(e.clientX-rect.left, e.clientY-rect.top)
}
    // startX=e.clientX -rect.left;
    // startY=e.clientY -rect.top;
});

const draw = (e) => {
    if(!isPainting){
        return;
    }

    const rect = e.target.getBoundingClientRect();
    ctx.lineWidth=lineWidth;
    ctx.lineTo(e.clientX-rect.left, e.clientY-rect.top)
    ctx.stroke();

canvas.addEventListener("mouseup", (e) => {
isPainting = false
ctx.stroke();
ctx.beginPath;
});


}
canvas.addEventListener ("mousemove", draw); 

document.getElementById('print-pdf').addEventListener('click', () => {
    window.print();
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