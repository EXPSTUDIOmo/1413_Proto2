
// Mouse and Touch Event Integration

function mousePressed() 
{
    // Check for image click while story is rolling
    if(currentState === STATES.story)
    {
        for(let module of modules)
        {
            if(module.isActive)
            {
                module.checkForClick();
            }
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