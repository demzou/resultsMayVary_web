let cnv;
let socket;
//const serverURL = 'https://resultsmayvary.herokuapp.com/';
const serverURL = 'localhost:8080';

let mode = 0;

function preload() {
    futuraBold = loadFont('assets/Futura-CondensedExtraBold-05.ttf');
    futuraBook = loadFont('assets/futura_book.otf');
}

function centerCanvas() {
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
  }

//--------------------------------------------------------------------
function setup() {
    createCanvas(windowWidth, windowHeight);
    cnv = createCanvas(windowWidth, windowHeight);
    centerCanvas();

        //Socket.io
        socket = io.connect(serverURL);

        socket.on('mode', function(data) {
        /////////// Do something here if pre-pre show
        });

}


//--------------------------------------------------------------------
function draw() {
    background(0);

    textAlign(CENTER, CENTER);
    fill(color(0, 255, 255));
    textFont(futuraBold);
    textSize(50);
    text("RESULTS MAY VARY", 20, height/8, width-20, height/4);

    textAlign(CENTER, CENTER);
    fill(color(255));
    textFont(futuraBold);
    textSize(24);
    text("Where are you joining the performance from?", 20, height/3, width-20, height/4);

    button("From home, on a computer", height/2+height/10, "/viewer");
    button("From Goldsmiths, on a mobile phone", height/2+20+2*height/10, "/mobile");
    
}

//--------------------------------------------------------------------

function button(_buttonText, _locY, _URL) {

    let buttonWidth = width-40;
    let buttonHeight = height/10;
    let startX = 20;
    let startY = _locY;

    let buttonBgCol = color(0);
    let buttonMainCol = color(0);

    //Check hover and clicks
        if(mouseX > startX && mouseX < startX+buttonWidth) {
            if(mouseY > startY && mouseY < startY+buttonHeight) {
                if(mouseIsPressed) {    
                    buttonBgCol = color(0, 255, 255);
                    buttonMainCol = color(0);
                    window.open(_URL, "_self");
                } else {
                    buttonBgCol = color(255);
                    buttonMainCol = color(0);
                }
            } else {
                buttonBgCol = color(0);
                buttonMainCol = color(255);
            }
        } else {
            buttonBgCol = color(0);
            buttonMainCol = color(255);
        }

    //Draw button
    push();
    stroke(buttonMainCol);
    fill(buttonBgCol)
    rect(startX, startY, buttonWidth, buttonHeight);
    textFont(futuraBook);
    textSize(20);
    fill(buttonMainCol);
    text(_buttonText, startX, startY+buttonHeight/4, buttonWidth, buttonHeight/2);
    pop();


}



function windowResized() {
    centerCanvas();
  }