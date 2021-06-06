/*
  Prototype V2 of 14:13 scrollytelling app.
  Maurice Oeser 2021
*/

/*
  Global Parameters
*/

let startButtonHeight = 0.7;

/*
  Soundfiles
*/

let numSoundfiles = 4;
let numSoundfilesLoaded = 0;




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

 setupPageElements();
 loadStartScreen();
 setupStartButton();
 loadModules();

 textFont(font);
 imageMode(CENTER);
}

/*
    SETUP FUNCTIONS
*/

function loadStartScreen()
{
  bgImage1_fade = loadImage("assets/images/Background_schwarz_fadein.jpg");
  startImage = loadImage("assets/images/landing_page.jpg", resizeStartScreen);
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

    muteButton.attribute('src',"assets/images/mute_white.png" );

    
  }

  else
  {
    Howler.mute(false);
    isMuted = false;

    muteButton.attribute('src',"assets/images/unmute_white.png" );
  }

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
  //console.log(VIEWPOSITION);
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

    if(drawScrollHint)
    {
      imageMode(CENTER);
      //image(scrollHint, 0, height * 0.4);
    }
  }

  else if(currentState == STATES.transition)
  {
    VIEWPOSITION += 0.02; // automatically scroll to next module
    drawBackground();
    moduleIntro.update();

    updateStoryModules();

    if(VIEWPOSITION >= 0.99)
      switchState(STATES.story);
  }
  

  else if(currentState == STATES.story)
  {
    drawBackground();
    grundrauschen.update();

    updateStoryModules();

    
    //image(nadel, 0, 0, width, nadel.height * 0.35);
  }
}


function updateStoryModules()
{
  for(let module of modules)
  {
    module.update();
  }
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
    push();
    noStroke();
    translate(0, - (height * offsetY));
    texture(startImage_copy);
    plane(startImage_copy.width, startImage_copy.height);
    pop();

    //image(startImage_copy, 0 , - (height * offsetY));

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
  if(Math.floor(VIEWPOSITION) % 2 == 0)
  {
    bg1_1_offset = 0;
    bg1_2_offset = 1;
  }

  else
  {
    bg1_1_offset = 1;
    bg1_2_offset = 0;
  }

  bgVertOffset = (VIEWPOSITION % 1);

  if(currentState == STATES.intro || currentState == STATES.transition) 
  {
    push();
    noStroke();
    translate(0, - (height * bgVertOffset) + (height * bg1_1_offset));
    texture(bgImage1_fade);
    plane(width, height);
    pop();

  }
  
  else
  {
    push();
    noStroke();
    translate(0, - (height * bgVertOffset) + (height * bg1_1_offset));
    texture(bgImage1_1);
    plane(width, height);
    pop();
  }
   
  push();
  noStroke();
  translate(0, - (height * bgVertOffset) + (height * bg1_2_offset));
  texture(bgImage1_2);
  plane(width, height);
  pop();
  
}




let scrollSpeed = 0.02;
let inAutoScroll = false;
function autoScroll(target)
{
  VIEWPOSITION += scrollSpeed;
}



function startIntro()
{
  startButton.hide();

  switchState(STATES.preintro);

  // not doing loop because of parallelisation, loop could introduce offsets
  modules[0].startMusic();
  modules[1].startMusic();
  modules[2].startMusic();

  isRunning = true;

}

function switchState(newState)
{
  currentState = newState;

  if(currentState == STATES.preintro)
    moduleIntro.startModule();

  else if(currentState == STATES.transition)
  {
    moduleIntro.fadeOut();
  }

  else if(currentState == STATES.story)
    isScrollingAllowed = true;
}







function  changeViewPosition(deltaMovement)
{
  if(isRunning)
  {
    if(currentState == STATES.intro && moduleIntro.isEnding && deltaMovement > 0) // at end of intro, if user scrolls down switch into story mode
      switchState(STATES.transition);

    if(isScrollingAllowed)
    {

      VIEWPOSITION += (deltaMovement / height);; 

      if(currentState == STATES.story && VIEWPOSITION < 1 )
          VIEWPOSITION = 1;


      if(VIEWPOSITION > 6)
        VIEWPOSITION = 6;
    }
  }

  //console.log(viewPosition);
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
    modules[0].left.story.seek(140);
    modules[0].right.story.seek(120);
  } else if (keyCode === DOWN_ARROW) {
    switchState(STATES.introTrans);

    moduleIntro.story.seek(59);
      switchState(STATES.intro);
  }
}


