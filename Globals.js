// HTML-Elements
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

// State Enum
const STATES = Object.freeze({"startscreen":0, "preintro":1, "introtrans":2, "intro":3, "transition":4, "story":5});
let currentState = STATES.startscreen;

let currentModule = 0;

// Story position
let VIEWPOSITION = 0;
let currentSide = "left";


// P5 Elements
let font;

// Musics & Effects
let grundrauschen;

// Story Modules
let moduleIntro; // intro is its own category / logic 

let modules = [];
let musics = [];

// Images
let startImage;
let startImage_copy;

let bgImage1_1;
let bgImage1_2;
let bgImage1_fade;
let bg1_1_offset = 0;
let bg1_2_offset = 1;

let nadel;
let scrollHint;



// PARAMS
let SIDE_FADE_TIME = 1000;


// HELPER FUNCTIONS

function getMouseRelative(axis)
{
    if(axis == 'x')
        return (mouseX / width) - 0.5;
    else
        return (mouseY / height) - 0.5;
}