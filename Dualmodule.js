class Dualmodule
{
  constructor(ID, positionY, triggerPoint, fadeIn, fadeOut, xrfade1, xrfade2, startSide, music_A, music_B)
  {
    this.ID = ID;
    this.left = new Module(ID, "A", -0.25, 0, 0.5, xrfade1, positionY, music_A);
    this.right = new Module(ID, "B", 0.25, 0, 0.5, xrfade2, positionY, music_B);


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
        if(this.side != 'A' || !this.isStarted)
        {
          this.goToSide('A');
        }
      }
    }

    // Check on right 
    else
    {
      if(this.right.checkForClick())
      {
        if(this.side != 'B' || !this.isStarted)
        {
          this.goToSide('B');
        }
      }
    }
      
  }

  goToSide(side)
  {
    this.side = side;

    if(side == 'A')
    {
      this.side = 'A';
      this.left.start(true);
      this.right.pause();
    }
    else
    {
      this.side = 'B';
      this.left.pause();
      this.right.start(true);
    }
  }

  

  startModule()
  { 
      if(this.side == 'A' || this.side == 'none')
      {
        this.left.start(false);
      }
      else if(this.side == 'B')
      {
        this.right.start(false);
      }

      this.isStarted = true;
  }

  startMusic()
  {
    this.left.music.sound.play();
    this.right.music.sound.play();
  }

  update()
  {
    if(VIEWPOSITION >= this.positionY - 2 && VIEWPOSITION <= this.positionY + 2)
    {
      if(!this.isStarted && VIEWPOSITION >= this.triggerPoint)
      {
        this.isStarted = true;
        this.startModule();
      }

      this.isActive = true;
      this.setScrollGain();

      this.left.update();
      this.right.update();
    }

    else
    {
      this.isActive = false;
      this.isStarted = false;
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

