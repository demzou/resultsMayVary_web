let cnv;
let socket;
const serverURL = 'https://resultsmayvary.herokuapp.com/';
//const serverURL = 'localhost:8080';

let mode = 1000;
let fontSize20;
let fontSize24;
let fontSize45;

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

    fontSize14 = 14 * height / 700;
    fontSize20 = 20 * height / 700;
    fontSize24 = 24 * height / 700;
    fontSize45 = 45 * height / 700;

    //Socket.io
    socket = io.connect(serverURL);

    socket.on('mode', function(data) {
        mode = data;
    });

}


//--------------------------------------------------------------------
function draw() {
    background(0);

    textAlign(CENTER, CENTER);
    fill(color(0, 255, 255));
    textFont(futuraBold);
    textSize(fontSize45);
    text("RESULTS MAY VARY", 20, height/8, width-20, height/4);

    if (mode == 1000) {

        textAlign(CENTER, CENTER);
        fill(color(255));
        textFont(futuraBook);
        textSize(fontSize24);
        text("Performances:\n THU 17 SEPT: 21.00\n FRI 18 SEPT: 18:05\n SAT 19 SEPT: 12.55 & 20.50\n SUN 20 SEPT: 11.05", 20, height/3, width-20, height/4);
        
        button("MORE INFO", height/4*3, "https://resultsmayvary.eventbrite.co.uk");

        textAlign(CENTER, TOP);
        fill(color(0, 255, 255));
        textFont(futuraBook);
        textSize(fontSize14);
        text("If your performance is due to start soon, please stay on this page, it will automatically refresh when we are ready to start", 20, height/4*3 + height/10+ 40, width-20, height/4);
        

    } else {

        textAlign(CENTER, CENTER);
        fill(color(255));
        textFont(futuraBold);
        textSize(fontSize24);
        text("Where are you joining the performance from?", 20, height/3, width-20, height/4);

        button("From home, on a computer", height/2+height/10, "/viewer");
        button("From Goldsmiths, on a mobile phone", height/2+30+2*height/10, "/mobile");
    
    }
}

//--------------------------------------------------------------------

function button(_buttonText, _locY, _URL) {

    let buttonWidth;
    if (width > 1000) {
        buttonWidth = 600;
    } else {
        buttonWidth = width-40;
    }
    let buttonHeight = height/10;
    let startX = (width-buttonWidth)/2;
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
    textSize(fontSize20);
    fill(buttonMainCol);
    text(_buttonText, startX, startY+buttonHeight/4, buttonWidth, buttonHeight/2);
    pop();


}



function windowResized() {
    centerCanvas();
  }