/*
  Prototype of 14:13 scrollytelling app.
  Maurice Oeser 2021
*/


/*
  Global Parameters
*/

// Elements
let canvas;
let startButton; 
let muteButton;


// Flags
let isMobile = true;
let readyToStart = false;
let isRunning = false;
let isScrollingAllowed = false;
let startScreenReady = false;
let drawScrollHint = false;

// Params

// State Enum
const STATES = Object.freeze({"startscreen":0, "preintro":1, "introtrans":2, "intro":3, "transition":4, "story":5});
let currentState = STATES.startscreen;
let currentChapter = 0;

// Story position
let viewPosition = 0;

let currentSide = "left";

let startButtonHeight = 0.7;

let transitionStart = 2.0;
let transitionEnd = 2.4;
/*
  Soundfiles
*/

let numSoundfiles = 4;
let numSoundfilesLoaded = 0;

// Musics & Effects
let suspense_medium_verfolgte1;
let suspense_medium_verfolgte2
let suspense_medium_verfolger;
let neutral_verfolgte;
let grundrauschen;

// Story Modules
let moduleIntro;
let module_1;
let module_2;

// Images
let startImage;
let startImage_copy;
let bgImage1_1;
let bgImage1_2;
let bg1_1_offset = 0;
let bg1_2_offset = 1;
let bgImage2_1;
let bgImage2_2;
let nadel;
let scrollHint;

let font;
/*
  -----------------------------------------------------------
  -----------------------------------------------------------
  -----------------------------------------------------------
*/

function preload()
{
  font = loadFont("assets/cour.ttf");
}

function setup() {

  isMobile = window.mobileCheck();

  if(isMobile)
    canvas = createCanvas(displayWidth, displayHeight, WEBGL);
  else
    canvas = createCanvas(windowWidth, windowHeight, WEBGL);

 loadStartScreen();
 setupStartButton();

 loadMusic();
 loadModules();

 textFont(font);
}

/*
    SETUP FUNCTIONS
*/

function loadStartScreen()
{
  startImage = loadImage("assets/images/landing_page.jpg", resizeStartScreen);
  bgImage1_fade = loadImage("assets/images/Background_schwarz_fadein.jpg");
  bgImage1_1 = loadImage("assets/images/Background_schwarz_v1.jpg");
  bgImage1_2 = loadImage("assets/images/Background_schwarz_v2.jpg");
  bgImage2_1 = loadImage("assets/images/Background_weiß_v1.jpg");
  bgImage2_2 = loadImage("assets/images/Background_weiß_v2.jpg");
  nadel = loadImage("assets/images/frequenznadel.png");
  scrollHint = loadImage("assets/images/scroll_hint.png");
}

function resizeStartScreen()
{
  if(!isMobile)
  {
    startImage_copy = startImage.get();
    startImage_copy.resize(width, height);
  }

  else
  {
    if(deviceOrientation == "portrait")
      startImage.resize(0, height);
    else
      startImage.resize(0, height);
  }
   
    module_1.rescaleImage();
    startScreenReady = true;
}

function setupStartButton()
{

  let startWidth; 

  if(!isMobile)
    startWidth = width * 0.1;
  else
    startWidth = width * 0.25;

  startButton = createImg("assets/images/start_button.png", "startbutton");
  startButton.hide();
  startButton.size(startWidth, startWidth);

  if(!isMobile)
  {
    startButton.position(width * 0.5 - (startWidth / 2), height * 0.85 - (startWidth / 2));
  }

  else
  {
    startButton.position(width * 0.5 - (startWidth / 2), height * startButtonHeight );
    dbg = height * 0.8;
  }

  startButton.mousePressed(startIntro);
  startButton.touchEnded(startIntro);

  let buttonAspect = 1.24330900243;
  let buttonWidth;

  if(isMobile)
    buttonWidth = width * 0.05;
  else
    buttonWidth = width * 0.03;

  let buttonHeight = buttonWidth / buttonAspect;

  muteButton = createImg("assets/images/unmute_white.png", "mute");
  muteButton.size(buttonWidth, buttonHeight);
  muteButton.position(width * 0.95, height * 0.01);
  muteButton.mousePressed(muteSound);
  muteButton.touchEnded(muteSound);

}

let isMuted = false;

function muteSound()
{
  if(!isMuted)
  {
    Howler.mute(true);
    isMuted = true;

    if(currentSide == "left")
      muteButton.attribute('src',"assets/images/mute_white.png" );
    else 
      muteButton.attribute('src',"assets/images/mute_black.png" );
    
  }

  else
  {
    Howler.mute(false);
    isMuted = false;

    if(currentSide == "left")
        muteButton.attribute('src',"assets/images/unmute_white.png" );
    else
        muteButton.attribute('src',"assets/images/unmute_black.png" );
  }

}

function loadMusic()
{
  // Intro
  suspense_medium_verfolgte1 = new Musicmodule("1A_music.mp3", -1, 0, 0.2, 0.9, 0.7);
}



function loadModules()
{
  moduleIntro = new Intro("0_Intro");

  //soundFileName, imageName, positionY, positionX, fadeIn, fadeOut, storyTrigger
  module_1 = new Dualmodule(1 , 1.0, 0.5, 0.6, 1.0, 4, 4, 0); // Kneipe/Wohnzimmer


  //MODULE 2;
  var m2_nodeList = [];
  m2_nodeList.push(new Soundnode(0, "2A", "left",  -0.3, -0.2, 0.3));
  m2_nodeList.push(new Soundnode(1, "2B", "right", 0.3, -0.2, 0.3));

  module_2 = new Combomodule(1.5, "1A_music.mp3", "1B_music.mp3", m2_nodeList);
  grundrauschen = new Grundrauschen();
}




function loadedSound()
{
  numSoundfilesLoaded++;

  if(numSoundfilesLoaded == numSoundfiles)
  {
    startButton.show();
    readyToStart = true;
  }  

}



/*
=========================
  DRAW FUNCTIONS
=========================
*/

let bgVertOffset = 0;
let progress = 0;
let lastVertOff = 0;

let startScreenOffset = 0;

function draw() 
{
  background(0);
  fill(255);

  // LANDING PAGE
  if(currentState == STATES.startscreen)
  {
    drawStartScreen(startScreenOffset);
  }

  else if(currentState == STATES.preintro)
  {
    drawStartScreen(startScreenOffset);
    moduleIntro.update();
  }

  else if(currentState == STATES.introtrans)
  {
    drawStartScreen(startScreenOffset);
    startScreenOffset += 0.02;
    moduleIntro.update();
  }

  else if(currentState == STATES.intro)
  {
    drawBackground();
    moduleIntro.update();

    if(moduleIntro.isEnding)
    {
      imageMode(CENTER);
      image(scrollHint, 0, height * 0.4);
    }
  }

    
  else if(currentState == STATES.transition)
  {
    viewPosition += 0.02; // automatically scroll to next module
    drawBackground();
    moduleIntro.update();
    module_1.update(viewPosition);

    if(viewPosition >= 0.99)
      switchState(STATES.story);
  }
  

  else if(currentState == STATES.story)
  {
    drawBackground();
    module_1.update(viewPosition);
    module_2.update(viewPosition);

    grundrauschen.update(viewPosition);

    imageMode(CENTER);
    image(nadel, 0, 0, width, nadel.height * 0.35);
  }
    

  // always update music modules
  suspense_medium_verfolgte1.update(viewPosition);
}





function drawStartScreen(offsetY)
{
  // start screen loading, draw Text for user
  if(!startScreenReady)
  {
    fill(255);
    noStroke();
    textAlign(CENTER);
    text("LOADING...", 0, 0);
  }

  else
  {
    imageMode(CENTER);
    image(startImage_copy, 0 , - (height * offsetY));

    // still loading audio files, progress bar
    if(!readyToStart)
    {
        noFill();
        strokeWeight(8);
        stroke(0,255,0);

        progress = mapToRange(numSoundfilesLoaded, 0, numSoundfiles, 0, TWO_PI);
        arc(0, height * 0.85, width * 0.07, width * 0.07, 0, progress);
    }
  }
}



function drawBackground()
{

  // calculate scrolling BG
  if(Math.floor(viewPosition) % 2 == 0)
  {
    bg1_1_offset = 0;
    bg1_2_offset = 1;
  }

  else
  {
    bg1_1_offset = 1;
    bg1_2_offset = 0;
  }

  bgVertOffset = (viewPosition % 1);

  imageMode(CENTER);

  if(currentState == STATES.intro || currentState == STATES.transition) // in intro & transition to story draw faded bg image
    image(bgImage1_fade, 0, - (height * bgVertOffset) + (height * bg1_1_offset), width, height);
  else
    image(bgImage1_1, 0, - (height * bgVertOffset) + (height * bg1_1_offset), width, height);

  image(bgImage1_2, 0, - (height * bgVertOffset) + (height * bg1_2_offset), width, height);
  
}




let scrollSpeed = 0.02;
let inAutoScroll = false;
function autoScroll(target)
{
  viewPosition += scrollSpeed;
}



function startIntro()
{
  startButton.hide();

  switchState(STATES.preintro);

  isRunning = true;

  module_1.rescaleImage();

}






function switchState(newState)
{
  currentState = newState;

  if(currentState == STATES.preintro)
    moduleIntro.startModule();

  else if(currentState == STATES.transition)
  {
    moduleIntro.story.stop();
    moduleIntro.endLoop.fade(1,0,1000);
    setTimeout(function() {
      moduleIntro.story.stop();
      moduleIntro.endLoop.stop();
    }, 2000); 
  }

  else if(currentState == STATES.story)
    isScrollingAllowed = true;
}





function mousePressed() {


//Check for module switch

if(mouseY > height * 0.33)
{
  let newSide = 0;

  if(mouseX > width * 0.5)
  {
    newSide = 1;
  }

  switch(currentChapter) {
    case 1 : module_1.switchSide(newSide);

  }
}

  // prevent default
  return false;
}




/*
  SCROLLING FUNCTIONALITY
*/

let lastTouchY = 0; // store last Y to calculate delta 
let isTouched = false;

// Scroll down on mousehweel or touchpad scroll
function mouseWheel(event) 
{

  changeViewPosition(event.delta);

  return false;
}

// scroll page with mobile touch input
function touchMoved(event)
{
  if(touches)
  {
      if(touches.length > 0)
  {
      if(!isTouched)
      {
        lastTouchY = touches[0].y;
        isTouched = true;
      }

      let deltaTouch = lastTouchY - touches[0].y;
      changeViewPosition(deltaTouch);
      lastTouchY = touches[0].y;
    }
  }

  return false;
}


function touchEnded()
{
  if(touches.length < 1)
  {
    isTouched = false;
  }

  return false;
}




function  changeViewPosition(deltaMovement)
{
  if(isRunning)
  {
    if(currentState == STATES.intro && moduleIntro.isEnding && deltaMovement > 0) // at end of intro, if user scrolls down switch into story mode
      switchState(STATES.transition);

    if(isScrollingAllowed)
    {

      viewPosition += (deltaMovement / height);; 

      if(currentState == STATES.story && viewPosition < 1 )
          viewPosition = 1;


      if(viewPosition > 6)
        viewPosition = 6;
    }
  }

  console.log(viewPosition);
}



/*
HELPERS / META FUNCTIONS
*/

window.addEventListener("orientationchange", function(event)
{
  windowResized()
});

function windowResized() 
{

  if(!isMobile)
  {
     resizeCanvas(windowWidth, windowHeight);
  }

  else
  {
    if(deviceOrientation == "portrait")
    {
      resizeCanvas(windowWidth, windowHeight); //TODO Fix this. scaling to window seems best solution for now? sometimes very small? wtf is mobile development
    }

    else if(deviceOrientation == "landscape")
    {
      resizeCanvas(windowWidth, windowHeight);
    }
  }

  resizeContent();
}

function resizeContent()
{
  //console.log("SCALE", width, height,"window", windowWidth, windowHeight, "display", displayWidth, displayHeight);
  var mutePos = deviceOrientation == "portrait" ? width * 0.95 : width * 0.95;
  muteButton.position(mutePos, height * 0.01);

  let startWidth; 

  if(!isMobile)
    startWidth = width * 0.1;
  else
    startWidth = width * 0.25;

  startButton.position(width * 0.5 - (startWidth / 2), height * startButtonHeight - (startWidth / 2));

  module_1.rescaleImage();
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

  

function mapToRange (number, inMin, inMax, outMin, outMax) {

    let value = (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    return Math.min(Math.max(value, 0.0), 1.5);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    module_1.story.A.seek(140);
    module_1.story.B.seek(120);
  } else if (keyCode === DOWN_ARROW) {
    switchState(STATES.introTrans);

    moduleIntro.story.seek(59);
      switchState(STATES.intro);
  }
}


