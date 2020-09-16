
let cnv;
let el;
let cnvW;
let cnvH;
let cnvX;
let cnvY;
let socket;
const serverURL = 'https://resultsmayvary.herokuapp.com/';
//const serverURL = 'localhost:8080';

let mode = 0;
let numPeople = 10;
// let shapes = [];
// let startTime;
let audienceClick = [] ;

let fontSize14;
let fontSize18;
let fontSize20;
let fontSize24;
let fontSize45;

let audienceIcon;
let audienceIconSize;

let time;
let startTime;
let duration = 10*1000;

// Mode 1 --> Intro
let question1 = "Pick the top 3 emotions you've been feeling during the lockdown";
let options1 = ['Focused', 'Unmotivated', 'Lonely', 'Stressed', 'In limbo', 'Depressed', 'Thankful', 'Lucky'];

// Mode 2 --> Vote WORK
let question2 = 'How have you felt about your work and/or your financial situation?';
let options2 = ['Safe', 'Uncertain'];

// Mode 5 --> List statements UNCERTAIN
let question5 = 'Select all the statements that apply to you';
let options5 = ['I have been furloughed', 'The business/industry took a hit', "I can't find a new job", 'I have lost my job', 'My salary has been reduced', 'Work is way more intense', 'My visa situation is precarious'];

// Mode 7 --> List statements SAFE
let question7 = 'Select all the statements that apply to you';
let options7 = ['I work for a supportive company', 'I have enough wealth/savings', 'I have maintained my job', 'My visa situation is secured', "I've felt lucky", 'New opportunities appeared', 'I feel safe but trapped in my job'];

// Mode 8 --> Input WORK Stressful
let question8 = "Give an example of something you have written at work, in an email or an online chat, during the lockdown";
let input8;

// Mode 9 --> Vote TIME
let question9 = 'How busy have you been?';
let options9 = ["It's been full-on", "I've had some extra time"];

// Mode 12 --> List of statements FULL-ON
let question12 = 'What are the main activities that kept you busy?';
let options12 = ['Exercising', 'Hobbies/Projects', 'Cooking', 'Work/Studies', 'Kids/Family', 'House chores', 'Relaxing', 'Distanced socialising'];

// Mode 14 --> Statements MORE TIME
let question14 = "What did you do with this extra time? Click on the statement if true";
let statement14 = ['Exercise / Yoga', 'Cook / Bake', 'Watch TV / Netflix or play games', 'Hobbies / Craft / Personal projects', 'Grow plants', 'Take more time for myself', 'Learn new skills'];

// Mode 15 --> Vote HUMAN CONTACT
let question15 = 'How did being isolated from others make you feel?';
let options15 = ['Lonely or anxious', 'Comfortable on my own or the people I live with'];

// Mode 18 --> Statements LONELY
let question18 = "Click on the statement if true";
let statement18 = ["I am usually a very social person", "I miss happy accidents and unplanned encounters",  "I miss physical contact", "I miss talking to people", "I am afraid to be forgotten", "I haven't had enough people around to interact"];

// Mode 21 --> Vote SOCIAL CIRCLES
let question21 = "How have your social circles been impacted?";
let options21 = ["Stayed steady or increased", "Became smaller"];

// Mode 24 --> List of statements STEADY
let question24 = 'Select all the statements that apply to you';
let options24 = ["Circles were fairly small to start with", "I cultivate few but strong relationships", "People have made an effort to stay in touch", "Some people reach out more than before", "I organised activities to maintain my circles", "I have felt the need to reconnect with people"];

// Mode 26 --> Statements SMALLER
let question26 = "Click on the statement if true";
let statement26 = ["I have had more meaningful interactions with the people I interacted with", "This made me realise who my real friends are",  "People have been focusing on themselves", "I haven't interacted with some people at all", "This made me worried about the quality of my relationships", "My circles are related to activities that stopped"];

// Mode 27 --> Input SOCIAL CIRCLES Family
let question27 = "Give an example of a message you would like to send to a family member or a special person";
let input27;

// Mode 28 --> Vote HEALTHY HABITS
let question28 = "Looking at your health habits (eating, sleeping, exercising), how have they evolved?";
let options28 = ["Same or healthier", "Getting worse"];

// Mode 31 --> Statements HEALTHIER
let question31 = "Click on the statement if true";
let statement31 = ["I have used this time to put new healthy habits in place", "I started a new physical activity", "I have been eating food carefully", "I made sure I was exercising regularly", "I have been meditating"];

// Mode 33 --> Statements WORSE
let question33 = "Click on the statement if true";
let statement33 = ["I haven't been able to maintain my usual level of physical activity", "It got difficult to stay motivated", "I have been cooking too much", "I don't have the space or the time to relax or exercise", "My sleep pattern has been affected"];

// Mode 36 --> Input FUTURE
let question36 = "Considering what you've learned, enjoyed or missed, if you could make a promise to yourself when approaching the 'new normal', what would it be?";
let input36;

let statementCount = 0;

let optionsSelected = [false, false, false, false, false, false, false, false];
let optionsCol
let optionsBgCol;
let questionCol;
let choiceMade;
let maxReached;
let choice = [];
let maxSelected = 1;
let resultSent = false;
let keepPressing = false;
let statementClicked = false;


function preload() {
    futuraBold = loadFont('assets/Futura-CondensedExtraBold-05.ttf');
    futuraBook = loadFont('assets/futura_book.otf');
}
  
function centerCanvas() {

    if (el.getBoundingClientRect().width > 500) {
        let x = (windowWidth - width) / 2;
        let y = (windowHeight - height) / 2;
        cnv.position(x, y);
    } else {
        cnvX = el.getBoundingClientRect().x;
        cnvY = el.getBoundingClientRect().y;
        cnv.position(cnvX, cnvY);
    }

}

//--------------------------------------------------------------------
function setup() {

    // createCanvas(windowWidth, windowHeight);
    // cnv = createCanvas(windowWidth, windowHeight);
    // centerCanvas();

    el = document.getElementById("sketch-container");

    if (el.getBoundingClientRect().width > 500) {
        createCanvas(windowWidth, windowHeight);
        cnv = createCanvas(windowWidth, windowHeight);
        centerCanvas();
        cnvW = width;
        cnvH = height;
    } else {
        cnvW = el.getBoundingClientRect().width;
        cnvH = el.getBoundingClientRect().height;
        createCanvas(cnvW, cnvH);
        cnv = createCanvas(cnvW, cnvH);
        centerCanvas();
        cnv.parent('sketch-container');
    }

    //getAudioContext().suspend();

    //Variables
    optionsBgCol = [color(0), color(0)];
    optionsCol = [color(255), color(255)];
    questionCol = color(255);
    choiceMade = false;

    fontSize14 = 14 * cnvW / 400;
    fontSize18 = 18 * cnvW / 400;
    fontSize20 = 20 * cnvW / 400;
    fontSize24 = 24 * cnvW / 400;
    fontSize45 = 45 * cnvW / 400;
    audienceIconSize = 50 * cnvW / 400;

    //Input
    input8 = createInput();
    input8.position(cnvX+20, cnvH/2);
    input8.size(cnvW-40, cnvH/4);
    input8.value(' ');
    input8.style('background-color', '#111111');
    input8.style('font-family', 'futura');
    input8.style('font-size', fontSize18 + 'px');
    input8.style('color', 'white');
    input8.style('border-color', 'white');
    input8.style('display', 'none');

    input27 = createInput();
    input27.position(cnvX+20, cnvH/2);
    input27.size(cnvW-40, cnvH/4);
    input27.value(' ');
    input27.style('background-color', '#111111');
    input27.style('font-family', 'futura');
    input27.style('font-size', fontSize18 + 'px');
    input27.style('color', 'white');
    input27.style('border-color', 'white');
    input27.style('display', 'none');

    input36 = createInput();
    input36.position(cnvX+20, cnvH/2);
    input36.size(cnvW-40, cnvH/4);
    input36.value(' ');
    input36.style('background-color', '#111111');
    input36.style('font-family', 'futura');
    input36.style('font-size', fontSize18 + 'px');
    input36.style('color', 'white');
    input36.style('border-color', 'white');
    input36.style('display', 'none');

    //Icons
    audienceIcon = loadImage('assets/people.png');

    //Socket.io
    socket = io.connect(serverURL);

    socket.on('numClients', function(data) {
        numPeople = data;
        console.log(numPeople);
    });

    socket.on('mode', function(data) {

        startTime = millis();

      input8.style('display', 'none');
      input27.style('display', 'none');
      input36.style('display', 'none');

      console.log("Mode: " + data);
      mode = data;

      optionsSelected = [false, false, false, false, false, false, false, false];
      resultSent = false;
      keepPressing = false;
      statementClicked = false;
      statementCount = 0;
      for(let i=0; i<audienceClick.length; i++) {
        audienceClick = false;
      }
      
    });

    socket.on('nextStatement', function(data) {
        startTime = millis();
        statementClicked = false;
        statementCount++;
        // if(statementCount >= statement.length-1) {
        //     statementCount = 0;
        // }
    });

    // socket.on('someoneClicked', function(data) {
    //     audienceClick[data] = true;
    //     console.log("client index: " + data);
    // });

    socket.on('duration', function(data) {
        duration = data;
    });

 //   socket.emit('checkNumClients', 1);
 //   startTime = millis();
    
}

//--------------------------------------------------------------------
function draw() {

    time = millis();
    // if((time-startTime) < 10000) {
    //     socket.emit('checkNumClients', 1); 
    //     console.log("checking num client...");
    // } 

    background(0);
    //push();
    drawAudience();
    //pop();

   // push();

   if (mode == 49 || mode ==50) {

    textAlign(CENTER, CENTER);
        fill(color(255));
        textFont(futuraBold);
        textSize(fontSize24);
        text("The performance will start shortly", 20, height/3, width-40, height/4);

        textAlign(CENTER, CENTER);
        fill(color(0, 255, 255));
        textFont(futuraBook);
        textSize(fontSize14);
        text("Please stay on this page, it will automatically refresh when we are ready to start", 40, height/3+120, width-80, height/4);
        

   }

    if (mode==1) drawList(question1, options1, 3, 3);

   if (mode==100) {
    textAlign(CENTER, CENTER);
    fill(color(255));
    textFont(futuraBook);
    textSize(fontSize20);
    text("Take a deep breath.\n\n Think about where you were when the lockdown started.\n\n And how you've felt since.", 40, height/4, width-80, height/2);
    
   }

    if (mode==2) drawChoice(question2, options2);
    if (mode==5) drawList(question5, options5, 1, options5.length+1);
    if (mode==7) drawList(question7, options7, 1, options7.length+1);
    if (mode==8) drawInput(question8, input8);
    if (mode==9) drawChoice(question9, options9);
    if (mode==12) drawList(question12, options12, 1, options12.length+1);
    if (mode==14) buttonStatement(question14, statement14);
    if (mode==15) drawChoice(question15, options15);
    if (mode==18) buttonStatement(question18, statement18);

   if (mode ==20) {
    textAlign(CENTER, CENTER);
    fill(color(255));
    textFont(futuraBook);
    textSize(fontSize20);
    text("She seems ok on her own, let's give her some space", 40, height/4, width-80, height/2);
    
   }

    if (mode==21) drawChoice(question21, options21);
    if (mode==24) drawList(question24, options24, 1, options24.length+1);
    if (mode==26) buttonStatement(question26, statement26);
    if (mode==27) drawInput(question27, input27);
    if (mode==28) drawChoice(question28, options28);
    if (mode==31) buttonStatement(question31, statement31);
    if (mode==33) buttonStatement(question33, statement33);
    if (mode==36) drawInput(question36, input36);
    //pop();

    if(mode!=0 && mode < 37) {
        if (!statementClicked && !resultSent) {
            progressBar();
        }
    }

    if(mode === 1000 ) {
        textAlign(CENTER, TOP);
        fill(color(255));
        textFont(futuraBold);
        textSize(fontSize20);
        text("Want to continue the conversation after the show? Get in touch!", 40, height/4, width-80, height/4);
    
        socialLinks('instagram', height/2*0.75, 'https://www.instagram.com/demzou_art/');
        socialLinks('twitter', height/2, 'https://twitter.com/clemencedebaig');
        socialLinks('facebook', height/2*1.25, 'https://www.facebook.com/demzouart/');
        socialLinks('website', height/2*1.5, 'http://www.clemencedebaig.com/');
    }

}


//--------------------------------------------------------------------
function drawChoice(_question, _options) {

    if(resultSent) {
        questionCol = color(100);
    } else {
        questionCol = color(255);
    }
    
    //Count if options are fullfilled
    let count = 0;
    for (let i=0; i<optionsSelected.length; i++) {
        if (optionsSelected[i] === true) {
            count++;
        }
    }
    if (count > 0) {
        choiceMade = true;
    } else {
        choiceMade = false;
    }

    push();
    textAlign(CENTER, TOP);

    //Question
    fill(questionCol);
    textFont(futuraBold);
    textSize(fontSize24);
    text(_question, 20, height/4, width-20, height/4);

    //Buttons
    buttonSquare(_options, 0);
    buttonSquare(_options, 1);
    if(!resultSent) submitButton('selection', _options);
    pop();

}

//--------------------------------------------------------------------
function buttonSquare(_options, _optionNum) {

    let buttonWidth = width/2-20;
    let buttonHeight = height/4;
    let startX = 20+_optionNum*buttonWidth;
    let startY = height/2;
    let isHovered = false;

    //Check hover and clicks
    if(!resultSent) {
        if(mouseX > startX && mouseX < startX+buttonWidth*(1+_optionNum)) {
            if(mouseY > startY && mouseY < startY+buttonHeight) {
                if(mouseIsPressed) {
                    if(choiceMade === true) {
                        for (let i = 0; i < optionsSelected.length; i++) {
                            optionsSelected[i] = false;
                        }
                        optionsSelected[_optionNum] = true;
                    } else {
                        optionsSelected[_optionNum] = !optionsSelected[_optionNum];
                    }
                } else {
                    isHovered = true;
                }
            }
        } else {
            isHovered = false;
        }
    }

    //Change colours accordingly
    if (optionsSelected[_optionNum] === true) {
        optionsBgCol[_optionNum] = color(0, 255, 255);
        optionsCol[_optionNum] = color(0);
    } else if (isHovered === true) {
        optionsBgCol[_optionNum] = color(50);
        optionsCol[_optionNum] = color(255);
    } else {
        optionsBgCol[_optionNum] = color(0);
        optionsCol[_optionNum] = color(255);
    }

    if(resultSent && !optionsSelected[_optionNum]) optionsCol[_optionNum] = color(100);
    
    //Draw button 
    push(); 
    fill(optionsBgCol[_optionNum]);
    rect(startX, startY, buttonWidth, buttonHeight);

    textAlign(CENTER, CENTER);
    textFont(futuraBook);
    textSize(fontSize24);
    fill(optionsCol[_optionNum]);
    text(_options[_optionNum], startX, 2.25*buttonHeight, buttonWidth, buttonHeight/2);
    pop();
}


//--------------------------------------------------------------------
function drawList(_question, _options, _min, _max) {

    if(resultSent) {
        questionCol = color(100);
    } else {
        questionCol = color(255);
    }

    //Count if options are fullfilled
    let count = 0;
    for (let i=0; i<optionsSelected.length; i++) {
        if (optionsSelected[i] === true) {
            count++;
        }
    }
    if (count >= _min) {
        choiceMade = true;
    } else {
        choiceMade = false;
    }

    if (count >= _max) {
        maxReached = true;
    } else {
        maxReached = false;
    }

    textAlign(CENTER, CENTER);

    //Question
    fill(questionCol);
    textFont(futuraBold);
    textSize(fontSize24);
    text(_question, 20, 20, width-20, height/4);

    //Buttons
    for (let i=0; i<_options.length; i++) {
        buttonList(_options, i);
    }
    if(!resultSent) submitButton('selection', _options);

}

//--------------------------------------------------------------------
function buttonList(_options, _optionNum) {

    let buttonWidth = width-40;
    let buttonHeight = height/16;
    let startX = 20;
    let startY = height/4+ 10 + _optionNum*(buttonHeight+10);
    let isHovered = false;
    let isActive = true;

    if (maxReached === true && optionsSelected[_optionNum] === false) {
        isActive = false;
    } 

    //Check hover and clicks
    if(!resultSent && isActive) {
        if(mouseX > startX && mouseX < startX+buttonWidth*(1+_optionNum)) {
            if(mouseY > startY && mouseY < startY+buttonHeight) {
                if(mouseIsPressed && keepPressing == false) {
                    optionsSelected[_optionNum] = !optionsSelected[_optionNum];
                    keepPressing = true;
                } else {
                    isHovered = true;
                }
            }
        } else {
            isHovered = false;
        }
    } 

    //Change colours accordingly
    if(isActive == false) {
        optionsBgCol[_optionNum] = color(0);
        optionsCol[_optionNum] = color(100);
    } else if (optionsSelected[_optionNum] === true) {
        optionsBgCol[_optionNum] = color(0, 255, 255);
        optionsCol[_optionNum] = color(0);
    } else if (isHovered === true) {
        optionsBgCol[_optionNum] = color(50);
        optionsCol[_optionNum] = color(255);
    } else {
        optionsBgCol[_optionNum] = color(0);
        optionsCol[_optionNum] = color(255);
    }

    if(resultSent && !optionsSelected[_optionNum]) optionsCol[_optionNum] = color(100);
    
    //Draw button 
    push(); 
    fill(optionsBgCol[_optionNum]);
    rect(startX, startY, buttonWidth, buttonHeight);

    textFont(futuraBook);
    textSize(fontSize18);
    fill(optionsCol[_optionNum]);
    text(_options[_optionNum], startX, startY+buttonHeight/4, buttonWidth, buttonHeight/2);
    pop();
}

//--------------------------------------------------------------------
function drawInput(_question, _input) {

    if(resultSent) {
        questionCol = color(100);
    } else {
        questionCol = color(255);
    }

    if (_input.value() != ' ') {
        choiceMade = true;
    }

    textAlign(CENTER, CENTER);

    //Question
    fill(questionCol);
    textFont(futuraBold);
    textSize(fontSize24);
    text(_question, 20, height/6, width-20, height/4);

    //Input
    _input.style('display', 'block');

    if(!resultSent) submitButton('input', _input);
    if(resultSent) {
        _input.style('background-color', '#111111');
        _input.style('color', 'grey');
        _input.style('border', 'none');
    } 

}

//--------------------------------------------------------------------
function submitButton(_type, _optionsOrInput) {

    let buttonWidth = width-40;
    let buttonHeight = height/14;
    let startX = 20;
    let startY = height-height/8;

    let buttonBgCol = color(0);
    let buttonMainCol = color(0);

    //Check hover and clicks
    if (choiceMade === true) {
        if(mouseX > startX && mouseX < startX+buttonWidth) {
            if(mouseY > startY && mouseY < startY+buttonHeight) {
                if(mouseIsPressed) {
                    if(resultSent === false) {

                        if(_type === 'selection') {
                            choice.length = 0;
                            for (let i=0; i<optionsSelected.length; i++) {
                                if (optionsSelected[i] === true) {
                                    choice.push(i);
                                }
                            }
                            console.log(choice);

                            if(mode ==1) socket.emit('submit1', choice);
                            if(mode ==2) socket.emit('submit2', choice);
                            if(mode ==5) socket.emit('submit5', choice);
                            if(mode ==7) socket.emit('submit7', choice);
                            if(mode ==9) socket.emit('submit9', choice);
                            if(mode ==12) socket.emit('submit12', choice);
                            if(mode ==15) socket.emit('submit15', choice);
                            if(mode ==21) socket.emit('submit21', choice);
                            if(mode ==24) socket.emit('submit24', choice);
                            if(mode ==28) socket.emit('submit28', choice);

                            socket.emit('interacting', 1);
                            
                            resultSent = true;
                        }

                        if(_type === 'input') {
                            choice.length = 0;
                            choice = _optionsOrInput.value();
                            console.log(choice);
                            if(mode ==8) {
                                socket.emit('input8', choice);
                                input8.attribute('disabled', '');
                            }  
                            if(mode ==27) {
                                socket.emit('input27', choice);
                                input27.attribute('disabled', '');
                            }
                            if(mode ==36) {
                                socket.emit('input36', choice);
                                input36.attribute('disabled', '');
                            }
                            resultSent = true;
                            choice = [];

                            socket.emit('interacting', 1);
                        }
                        
                    }
                    buttonBgCol = color(0, 255, 255);
                    buttonMainCol = color(0);
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
    } else {
        buttonBgCol = color(0);
        buttonMainCol = color(100);
    }

    //Draw button
    push();
    stroke(buttonMainCol);
    strokeWeight(3);
    fill(buttonBgCol)
    rect(startX, startY, buttonWidth, buttonHeight);
    pop();
    push();
    textAlign(CENTER, CENTER);
    textFont(futuraBook);
    textSize(fontSize20);
    fill(buttonMainCol);
    text('SEND', startX, startY+buttonHeight/4, buttonWidth, buttonHeight/2);
    pop();
}

//--------------------------------------------------------------------
function buttonStatement(_question, _statement) {

    if(statementClicked) {
        questionCol = color(100);
    } else {
        questionCol = color(255);
    }

    let buttonSize = width-60;
    let centreX = width/2;
    let centreY = height/5*3;
    let isHovered = false;
    let statementCol;
    let circleBorderCol;
    let circleBgCol;

    //Check hover and clicks
    if(!statementClicked) {
        if(mouseX > centreX-buttonSize/2 && mouseX < centreX+buttonSize/2) {
            if(mouseY > centreY-buttonSize/2 && mouseY< centreY+buttonSize/2) {
                if(mouseIsPressed && keepPressing == false) {
                    statementClicked = true;
                    socket.emit('statementClicked', 1);
                    socket.emit('interacting', 1);
                    keepPressing = true;
                } else {
                    isHovered = true;
                }
            } 
        } else {
            isHovered = false;
        }
    }

    //Change colours accordingly
    if (statementClicked === true) {
        statementCol = color(0);
        circleBorderCol = color(0, 255, 255);
        circleBgCol = color(0, 255, 255);
    } else if (isHovered === true) {
        statementCol = color(255);
        circleBorderCol = color(0, 255, 255);
        circleBgCol = color(50);  
    } else {
        statementCol = color(255);
        circleBorderCol = color(0, 255, 255);
        circleBgCol = color(0); 
    }

    textAlign(CENTER, CENTER);

    //Question
    fill(questionCol);
    textFont(futuraBold);
    textSize(fontSize24);
    text(_question, 20, height/6, width-20, height/4);

    //Draw button 
    push(); 
    fill(circleBgCol);
    stroke(circleBorderCol);
    strokeWeight(3);
    circle(centreX, centreY, buttonSize);

    textFont(futuraBook);
    textSize(fontSize20);
    fill(statementCol);
    noStroke();
    text(_statement[statementCount], centreX-buttonSize/2+10, centreY-buttonSize/2, buttonSize-20, buttonSize);
    pop();

}



//--------------------------------------------------------------------
function drawAudience() {

    push();
    translate(width/2-audienceIconSize/2, 0);

    image(audienceIcon, 0, 20, audienceIconSize, audienceIconSize);

    textAlign(LEFT, CENTER);
    fill(color(255));
    textFont(futuraBook);
    textSize(fontSize14);
    text(numPeople, audienceIconSize, 20, audienceIconSize, audienceIconSize);
    pop();
}

//--------------------------------------------------------------------
function progressBar() {

    push();

    let startX = 18;
    let startY = height-height/8-20;
    let barWidth = width-36;
    let barHeight = 10;
    let progressWidth = map(time-startTime, 0, duration, barWidth, 0, true);
    fill(color(30));
    rect(startX, startY, barWidth, barHeight);
    fill(color(0, 255, 255));
    rect(startX, startY, progressWidth, barHeight);

    pop();

}

//--------------------------------------------------------------------
function socialLinks(_buttonText, _locY, _URL) {

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
                    window.open(_URL);
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
    strokeWeight(2);
    fill(buttonBgCol)
    rect(startX, startY, buttonWidth, buttonHeight);
    pop();
    push();
    textAlign(CENTER, CENTER);
    textFont(futuraBook);
    textSize(fontSize20);
    fill(buttonMainCol);
    text(_buttonText, startX, startY+buttonHeight/4, buttonWidth, buttonHeight/2);
    pop();
}


//--------------------------------------------------------------------
function windowResized() {
    el = document.getElementById("sketch-container");
    
    if (el.getBoundingClientRect().width > 500) {   
        centerCanvas();
    } else {
        cnvW = el.getBoundingClientRect().width;
        cnvH = el.getBoundingClientRect().height;
        centerCanvas();
    }

  }


//--------------------------------------------------------------------
function mousePressed() {
    //userStartAudio();
//     mouseIsClicked = true;
//     console.log('click');
   }

//--------------------------------------------------------------------
function mouseReleased() {
    keepPressing = false;
  }

