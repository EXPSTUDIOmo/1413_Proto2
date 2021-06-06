class Dualmodule
{
  constructor(ID, positionY, triggerPoint, fadeIn, fadeOut, xrfade1, xrfade2, startSide)
  {
    this.ID = ID;

                          //id, side, x, y, radius
    this.left = new Module(ID, "A", -0.25, 0, 0.5, xrfade1, positionY);
    this.right = new Module(ID, "B", 0.25, 0, 0.5, xrfade2, positionY);

    if(startSide == 'A')
    {
      this.left.gain = 1.0;
      this.right.gain = 0.0;
    }

    else
    {
      this.left.gain = 0.0;
      this.right.gain = 1.0;
    }

    this.isStarted = false;
    this.isActive = false;

    this.positionY = positionY;
    this.triggerPoint = triggerPoint;

    this.fadeIn = fadeIn;
    this.fadeOut = fadeOut;

    this.inEndLoop = false;

    this.gain = 1;

    this.startSide = startSide;
    this.side = startSide;
  }

  checkForClick()
  {
    // Check on left 
    if(mouseX <= width / 2)
    {
      if(this.left.checkForClick())
      {
        if(this.side != 'A')
        {
          this.side = 'A';

          this.left.start(true);
          this.right.pause();
        }
      }
    }

    // Check on right 
    else
    {
      if(this.right.checkForClick())
      {
        if(this.side != 'B')
        {
          this.side = 'B';
          this.left.pause();
          this.right.start(true);
        }
      }
    }
      
  }

  /*
  switchSide(newSide)
  {
    if(newSide != this.side)
    {
      let xfadeTime = 500;

    this.side = newSide;
    this.isFadingA = true;
    this.isFadingB = true;

    if(newSide == 0)
    {
      this.volumeA = 1;
      this.volumeB = 0;

      if(!this.story.A.playing() && !this.isEndingA)
        this.story.A.play();

      this.story.A.fade(0, 1, xfadeTime);
      this.story.A_end.fade(0, 1, xfadeTime);
      this.story.A_music.fade(0, 1, xfadeTime);

      this.story.B.fade(1, 0, xfadeTime);
      this.story.B_end.fade(1, 0, xfadeTime);
      this.story.B_music.fade(1, 0, xfadeTime);
    }

    else
    {
      this.volumeA = 0;
      this.volumeB = 1;

      if(!this.story.B.playing() && !this.isEndingB)
        this.story.B.play();

      this.story.A.fade(1, 0, xfadeTime);
      this.story.A_end.fade(1, 0, xfadeTime);
      this.story.A_music.fade(1, 0, xfadeTime);

      this.story.B.fade(0, 1, xfadeTime);
      this.story.B_end.fade(0, 1, xfadeTime);
      this.story.B_music.fade(0, 1, xfadeTime);
    }

    setTimeout(this.stopFadeA.bind(this), xfadeTime + 50);
    setTimeout(this.stopFadeB.bind(this), xfadeTime + 50);
    }

  }
  */

  startModule()
  { 
      if(this.side == 'A')
      {
        this.left.start(false);
      }

      else
      {
        this.right.start(false);
      }

      //this.story.A_music.play();
      //this.story.B_music.play();

      this.isStarted = true;
  }

  
  update()
  {
    if(VIEWPOSITION >= this.positionY - 1 && VIEWPOSITION <= this.positionY +1)
    {
      this.isActive = true;

      this.left.update();
      this.right.update();

      if(!this.isStarted && VIEWPOSITION >= this.triggerPoint)
      {
        this.isStarted = true;
        this.startModule();
      }
      
      this.setScrollGain();

    }

    else
    {
      this.isActive = false;

      this.left.deactivate();
      this.right.deactivate();
    }
  }
  
  setScrollGain()
  {
    if(VIEWPOSITION <= this.positionY)
      this.gain = mapToRange(VIEWPOSITION, this.positionY - this.fadeIn, this.positionY, 0, 1);

    else
      this.gain = mapToRange(VIEWPOSITION, this.positionY, this.positionY + this.fadeOut, 1, 0);
    
    this.left.parentGain = this.gain;
    this.right.parentGain = this.gain;
  }
}

