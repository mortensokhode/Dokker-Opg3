// DOM elements are for a great part done here, some elements are generated
// further down, closer to it's actual use.
//  --------------------------------------------------------------
const toggle01Btn = document.getElementById("toggle01-btn")
const toggle02Btn = document.getElementById("toggle02-btn")
const errorMsg = document.getElementById("error-msg")
const audioMsgElm = document.getElementById("audiomsg-elm")
const referenceElm = document.getElementById("reference-elm")
const seasonInput = document.getElementById("season-inp")
const shoecolorElm = document.getElementById("shoecolor-elm")
const audioSourceElm = document.getElementById("audiosource-elm")
const pageHeadingElm = document.getElementById("pageheading-elm")
const videoSourceElm = document.getElementById("videosource-elm")
const audiovisualElm = document.getElementById("audiovisual-elm")
const textbasedElm = document.getElementById("textbased-elm")
const fileInputElm = document.getElementById("fileBrowse")
const oppgave3Div = document.getElementById("oppgave3-div")
const grandis = document.querySelectorAll(".parent")

// Most global constants are defined here 
//  --------------------------------------------------------------
const iRoundFactor = 100 // rounding factor & dividend to handle 2 decimals
const sWordSearchArr = [`if`,`as`,`and`,`notes`]
const sWordReplacementArr = [`hvis`, `som`, `og`, `notater`]
const nNumberOfChars = 5 // number of chars to the left and right of a word
// The chosen text is littered with " and ' hence the use of `
var sTextBuffer = `Network Working Group                                                 4689
RFC-3                                                           April 1969
                                                             Steve Crocker
                                                                      UCLA


                        DOCUMENTATION CONVENTIONS



The Network Working Group seems to consist of Steve Carr of Utah, Jeff
Rulifson and Bill Duvall at SRI, and Steve Crocker and Gerard Deloche
at UCLA.  Membership is not closed.

The Network Working Group (NWG) is concerned with the HOST software, the
strategies for using the network, and initial experiments with the network.

Documentation of the NWG's effort is through notes such as this.  Notes
may be produced at any site by anybody and included in this series.
                        

CONTENT

The content of a NWG note may be any thought, suggestion, etc. related to
the HOST software or other aspect of the network.  Notes are encouraged to
be timely rather than polished.  Philosophical positions without examples
or other specifics, specific suggestions or implementation techniques
without introductory or background explication, and explicit questions
without any attempted answers are all acceptable.  The minimum length for 
a NWG note is one sentence.

These standards (or lack of them) are stated explicitly for two reasons.
First, there is a tendency to view a written statement as ipso facto 
authoritative, and we hope to promote the exchange and discussion of 
considerably less than authoritative ideas.  Second, there is a natural
hesitancy to publish something unpolished, and we hope to ease this
inhibition.

FORM

Every NWG note should bear the following information:

        1.  "Network Working Group"
            "Request for Comments:" x
            where x is a serial number.
            Serial numbers are assigned by Bill Duvall at SRI

        2.  Author and affiliation

        3.  Date

        4.  Title.  The title need not be unique.

DISTRIBUTION

One copy only will be sent from the author's site to"

        1.  Bob Kahn, BB&N
        2.  Larry Roberts, ARPA
        3.  Steve Carr, UCLA
        4.  Jeff Rulifson, UTAH
        5.  Ron Stoughton, UCSB
        6.  Steve Crocker, UCLA

Reproduction if desired may be handled locally.  

OTHER NOTES

Two notes (1 & 2) have been written so far.  These are both titled HOST
Software and are by Steve Crocker and Bill Duvall, separately.

Other notes planned are on

        1.  Network Timetable
        2.  The Philosophy of NIL
        3.  Specifications for NIL
        4.  Deeper Documentation of HOST Software.`
// ---------------------------------------------------------------------

// Global vars 
let currentWindow = location.pathname.slice(1) 
let fileList = []
let nTextBufferWC = 400
let sConstructedWordArr = []


//  --------------------------------------------------------------
// Program Main:
//  --------------------------------------------------------------
pageHeadingElm.textContent = `Current page:  ${currentWindow}`

// Toggle buttons initial textContent
toggle01Btn.textContent  = "Audiovisual page"
toggle02Btn.textContent = "Toggle error msg"


// Used prior to this exercise, and still used  for the audio visual part
shoecolorElm.textContent = ` Shoe color will reflect the chosen season.<br><br> ...and btw, chosen season will provide a matching piece of music to be played.`

referenceElm.innerHTML = `Performed by: <a href="https://freemusicarchive.org/music/John_Harrison_with_the_Wichita_State_University_Chamber_Players/" target="_blank">John Harrison with the Wichita State University Chamber Players</a><br>
  Provided by: <a href="https://freemusicarchive.org/home" target="_blank">Free Music Archive</a><br>
  Licensed: <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank">CC BY-SA</a>`

  // this one is just an old friend still joining our company
errorMsg.innerHTML = `ERROR for Christ's sake!!!!  <span class="subText">
  pretty stupid reference for an atheist, but nevertheless..</span><br><br> Not if (but when) shit happens, the error message will display itself here. This line is extended to see what happens when line breaks have to be used. This dodgy text is found in the bible of the Nonsensical, a guide to the outer space of mental activities.`

// Loop counting to 10, it also provides an adjusted output to the web page
const textelement01Elm = document.getElementById("textelement01") // HTML element to receive the output
let sWorkBuffer = "Counting loop to 10: "
// the actual loop - not exactly rocket science
for (let i = 0; i<10; i++) {
  sWorkBuffer += parseInt(i+1) + ", " // 0 to 9 is perfectly fine, but 1 to 10 still looks better in this context
}
textelement01Elm.textContent = sWorkBuffer.slice(0,-2) // remove the last comma & space
addOppgaveContent(oppgave3Div, `<h3> ------------------------------------------------------------------ </h3>`,"p")


// let's do some string based SAR operations
// split into words (using single space as delimiter), remove empty strings and establish a coarse word count. And also try to get rid of some white space chars along the way.
const wordArray = sTextBuffer.split(' ').filter(function(word)  { 
  word = word.replace(/(\s[^ ]|\n)/gm,'')
  if (word !== '') 
    return word})

addOppgaveContent(oppgave3Div, "Antall ord i teksten: " + wordArray.length,"p" )

// The words to search for are held in the array sWordSearchArr. Do the search, make new strings based on the word found and nNumberOfChars chars to both sides of it (nNumberOfChars happens to hold 5)
for (let i = 0; i < sWordSearchArr.length; i++) {
  var position = sTextBuffer.search(sWordSearchArr[i])
  var startPos = 0
  var endPos = 0

  addOppgaveContent(oppgave3Div, `<h3> ------------------------------------------------------------------ </h3>`) // draw a line 
  addOppgaveContent(oppgave3Div, `${sWordSearchArr[i]} - found in position: ${position}`) // Write to website 

  // establish start and end positions of new string for slice(ing)
  startPos = position - nNumberOfChars
  endPos = position + sWordSearchArr[i].length + nNumberOfChars 
  sConstructedWordArr.push(sTextBuffer.slice(startPos, endPos)) // save new string to array

  addOppgaveContent(oppgave3Div, `<br>New constructed word:  ${sConstructedWordArr[i]}`)
}
addOppgaveContent(oppgave3Div, `<h3> ------------------------------------------------------------------ </h3>`)

// establish document elements where text is to be displayed
const changedTextSect = document.getElementById("changedText-sct")

// Let's make 'changes' to the text, I know, strings are immutable so we have to take care of the resulting string - and so we do.
// I want to keep the working scope of variables as local as possible, thus I define the vars within the loop, and hence the use of <var> vs <let>.
for (let i = 0; i < sWordSearchArr.length; i++) {
  var regex  = new RegExp(sWordSearchArr[i], 'gi')
  var sTextBuffer = sTextBuffer.replace(regex, `<strong style="color: darkgrey">${sWordReplacementArr[i]}</strong>`)
}
// Now populate changedTextSect with the changed text. 
addOppgaveContent(changedTextSect, 
` Presentation of the changed text:<br>   ------------------------------------ <br>`, "h3")
addOppgaveContent(changedTextSect, sTextBuffer, "pre") // using HTML tag 'pre' to keep the original formatting intact.

// -------------------------------------------------------------------
// Del 2:
// 6. lag et lite spill hvor spilleren har 3 liv. Hint: while loops
// -------------------------------------------------------------------
const lifeCount = 3
var i=0

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                }
            }
        }
    }
}
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            if (y = y - paddleHeight) {
                dy = -dy;
            }
        }
        else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}


var interval = setInterval(draw, 25);


while (i < lifeCount) {
	console.log(i)
	i++
}
// -------------------------------------------------------------------
//  Game Over
// -------------------------------------------------------------------



// Del 3:
// 7. lag en array med 10 ord og en med 10 tall.
const arrayOfWords = []
const numberArray = []
const arrayLimit = 10

for (i=0; i<arrayLimit; i++) {
  var randNumber = Math.round(Math.random()*wordArray.length)

  arrayOfWords.push(wordArray[randNumber])
  numberArray.push(randNumber)

}

const oppgave3Del4 = document.getElementById("oppgave3-del4")
const oppgave3Section = document.getElementById("oppgave3-sect")
addOppgaveContent(oppgave3Del4, `7. lag en array med 10 ord og en med 10 tall.`, "p")

let textString = ""
arrayOfWords.forEach(makeAstring)
addOppgaveContent(oppgave3Section, textString, "p")
textString= ""

numberArray.forEach(makeAstring)
addOppgaveContent(oppgave3Section, textString, "p")

// Del 4:
// 8. Sett alle tallene i arrayet med 10 tall til å bli det samme. Dette skal gjøres vha en built in method og en loop. Et tall skal endres fo hver iteration av loopen. Det første og det siste tallet i arrayet skal forbli uendret.





//  --------------------------------------------------------------
//  Program code end 
//  --------------------------------------------------------------



//  --------------------------------------------------------------
// Event listeners 
//  --------------------------------------------------------------
// toggle between the display of text based page and audio visual page
toggle01Btn.addEventListener("click", function() {
  let buttonText = ""
  buttonText = (toggleVisibility(textbasedElm, 'flex') == 'none') ? 'Text page' : 'Audiovisual page'
  toggleVisibility(audiovisualElm, 'flex')
  toggle01Btn.textContent = buttonText
})

// toggle an error message example - visual message on/off
toggle02Btn.addEventListener("click", function() {
  toggleVisibility(errorMsg, 'block')
})

// Not actively used in this exercise (yet) wanted to read a text file
fileInputElm.addEventListener("change", function(event) {
  fileList = event.target.files

// ----------------------------------------------
  console.log("Name", fileList[0].name)
  console.log("Size", fileList[0].size)
  console.log("Type", fileList[0].type)
// ----------------------------------------------
})

// ----------------------------------------------
// event listeners for audio visual part
// ----------------------------------------------

// clean up element value when it gets focus
seasonInput.addEventListener("focus", function() {
  seasonInput.value=""
})

// do some magic to text, audio & visuals when season is changed. Also loose focus (blur). Function process_Season is responsible for the actual processing
seasonInput.addEventListener("change", function() {
  const colorVar = process_Season(seasonInput.value)

  // 
  console.log("chosen season", seasonInput.value)
  console.log("color deducted",colorVar)
  // ----------------------------------------------
 
  shoecolorElm.style.color = colorVar
  audioMsgElm.style.color = colorVar
  seasonInput.blur()
  shoecolorElm.innerHTML = ` Shoe color for ${seasonInput.value} is reflected in this text.<br><br> ...and btw, click on play below to play matching music.`
})


//  --------------------------------------------------------------
// Functions defined below
//  --------------------------------------------------------------

// Write stuff to a HTML section identified by sectionElm. textContent is self-explanatory and elementType represents HTML tag
function addOppgaveContent(sectionElm, textContent, elementType) {
  elementType = (elementType === '') ? "p" : elementType
  const sectionContentElm = document.createElement(elementType)
  sectionContentElm.innerHTML = textContent
  sectionElm.appendChild(sectionContentElm)
}

// do some stuff to audio & visual parts through use of a switch construction. Multiple case elements are used to handle norwegia, english (uk) and english (am)
// default values at 'failure to match' cleans up some element content
function process_Season(season) {
  audioMsgElm.innerHTML = `<br><strong>Note:</strong> ` //Initial value
  referenceElm.style.display="block"

  switch(season.toLowerCase()){
      case "vinter":
      case "winter":
            audioSourceElm.setAttribute("src", "audio/Winter Mvt 2 Largo.mp3");
            audioMsgElm.innerHTML += `Le quattro stagioni: Winter (Concerto No. 4 in F Minor) Largo`
            videoSourceElm.setAttribute("src", "https://www.youtube.com/embed/YN8VpT4rJuY")
        
        return "var(--crispyWhite)"
      // the ubiquitous break will never be reached hence it i dropped
      case "spring":
      case "vår":
            audioSourceElm.setAttribute("src", "audio/Spring Mvt 1 Allegro.mp3")
            audioMsgElm.innerHTML += `Le quattro stagioni: Spring (Concerto No. 1 in E Major) Allegro`
            videoSourceElm.setAttribute("src", "https://www.youtube.com/embed/e3nSvIiBNFo")
        return "var(--springGreen)"
      case "sommer":
      case "summer":
            audioSourceElm.setAttribute("src", "audio/Summer Mvt 3 Presto.mp3")
            audioMsgElm.innerHTML += `Le quattro stagioni: Summer (Concerto No. 2 in G Minor) Adagio`
            videoSourceElm.setAttribute("src", "https://www.youtube.com/embed/I9yU8tDTGk8")
        return "var(--goldenSummer)"
      case "høst":
      case "autumn":
      case "fall":
            audioSourceElm.setAttribute("src", "audio/Autumn Mvt 1 Allegro.mp3")
            audioMsgElm.innerHTML += `Le quattro stagioni: Autumn (Concerto No. 3 in F Major)  Allegro`
            videoSourceElm.setAttribute("src", "https://www.youtube.com/embed/QUPo5OBnZk0")
            return "var(--brownish)"
      default:
            audioSourceElm.setAttribute("src", "")
            videoSourceElm.setAttribute("src", "")
            toggleVisibility(referenceElm, 'none')

            return "var(--theDarkside)"
  }
}

// This function uses the ternary operator
function toggleVisibility(sDOMelement, attributeValue) {
  // Ternaries
    let displayOff = (sDOMelement.style.display == 'none') ? true : false
    let displaySetting = (displayOff) ? attributeValue : 'none'
    
    sDOMelement.style.display = displaySetting
    return displaySetting
}

// yea, not in use this time - just an old friend =)
function convertValue(baseValue, conversionFactor) {
  return Math.round(baseValue * conversionFactor * iRoundFactor) / iRoundFactor
}

// make a string of data from an array (forEach()) for writing to a HTML page
function makeAstring(item, index) {
  textString += index + ": " + item + "<br>"
}
