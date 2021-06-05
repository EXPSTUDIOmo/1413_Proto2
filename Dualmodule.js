class Dualmodule
{
  constructor(ID, viewPosition, fadeIn, fadeOut, triggerPoint, xrfade1, xrfade2, startSide)
  {
    this.ID = ID;
    this.isStarted = false;
    this.isEndingA = false;
    this.isEndingB = false;
    this.isFadingA = false;
    this.isFadingB = false;
    this.positionY = viewPosition;
    this.storyTrigger = triggerPoint;
    this.fadeIn = fadeIn;
    this.fadeOut = fadeOut;
    this.inEndLoop = false;
    this.globalVolume = 1;
    this.xrfade1 = xrfade1;
    this.xrfade2 = xrfade2;
    this.volumeA = 1;
    this.volumeB = 0;
    this.startSide = startSide;
    this.side = startSide;
    this.replayAbtn = createImg("assets/images/restartButton_white.png", "restart");
    this.replayAbtn.hide();
    this.replayAbtn.size(80, 80);
    this.replayBbtn = createImg("assets/images/restartButton_white.png", "restart");
    this.replayBbtn.hide();
    this.replayBbtn.size(80, 80);
    this.replayAbtn.mouseClicked(this.restartA.bind(this));
    this.replayAbtn.touchEnded(this.restartA.bind(this));
    this.replayAbtn.mousePressed(this.highlightReplayA.bind(this));
    this.replayAbtn.touchStarted(this.highlightReplayA.bind(this));
  
    this.replayBbtn.mouseClicked(this.restartB.bind(this));
    this.replayBbtn.touchEnded(this.restartB.bind(this));
    this.replayBbtn.mousePressed(this.highlightReplayB.bind(this));
    this.replayBbtn.touchStarted(this.highlightReplayB.bind(this));

    this.replayAbtn.mouseOut(this.dehighlightBtns.bind(this));
    this.replayBbtn.mouseOut(this.dehighlightBtns.bind(this));

    this.image = 
    {
      A_src : loadImage("assets/images/" + ID + "A.png"),
      B_src : loadImage("assets/images/" + ID + "B.png"),
      A : "",
      B : ""
    };
  
    this.story =
    {
      A : new Howl({
        src: ['assets/sound/' + ID +'A_story.mp3'],
        loop : false,
        volume : 1,
        autoplay : false, 
        onload: function() { loadedSound(); }
      }),

      A_end : new Howl({
        src: ['assets/sound/' + ID +'A_loop.wav'],
        loop : true,
        volume : 0,
        autoplay : false,
        onload: function() { loadedSound();}
      }),

      A_music : new Howl({
        src: ['assets/sound/' + ID +'A_music.mp3'],
        loop : true,
        volume : 1,
        autoplay : false,
        onload: function() { loadedSound();}
      }),

      B : new Howl({
        src: ['assets/sound/' + ID +'B_story.mp3'],
        loop : false,
        volume : 1,
        autoplay : false, 
        onload: function() { loadedSound(); }
      }),

      B_end : new Howl({
        src: ['assets/sound/' + ID +'B_loop.wav'],
        loop : true,
        volume : 0,
        autoplay : false, 
        onload: function() { loadedSound(); },
      }),

      B_music : new Howl({
        src: ['assets/sound/' + ID +'B_music.mp3'],
        loop : true,
        volume : 1,
        autoplay : false,
        onload: function() { loadedSound();}
      }),
     }
  }

  rescaleImage()
  {
    this.image.A = this.image.A_src.get();
    this.image.A.resize(width * 0.5, 0);

    this.image.B = this.image.B_src.get();
    this.image.B.resize(width * 0.5, 0);
  }

  dehighlightBtns()
  {
    this.replayAbtn.attribute('src', "assets/images/restartButton_white.png");
    this.replayBbtn.attribute('src', "assets/images/restartButton_white.png");
  }

  highlightReplayA()
  {
    this.replayAbtn.attribute('src', "assets/images/restartButton_highlight.png");
  }

  restartA()
  {
    this.story.A.stop();
    this.story.A.play();
    this.story.A.volume(1);
    this.replayAbtn.attribute('src', "assets/images/restartButton_white.png");
    this.isEndingA = false;
    this.story.A_end.stop();
  }

  highlightReplayB()
  {
    this.replayBbtn.attribute('src', "assets/images/restartButton_highlight.png");
    this.isEndingB = false;
    this.story.B_end.stop();
  }

  restartB()
  {
    this.story.B.stop();
    this.story.B.play();
    this.story.B.volume(1);
    this.replayBbtn.attribute('src', "assets/images/restartButton_white.png");
  }

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


  startModule()
  { 
      if(this.side == 0)
      {
        this.story.A.play();
        this.story.B_music.volume(0);
      }

      else
      {
        this.story.B.play();
        this.story.A_music.volume(0);
      }

      this.story.A_music.play();
      this.story.B_music.play();

      this.isStarted = true;
      setTimeout(this.showReplayBtn.bind(this), 1000);
  }

  showReplayBtn()
  {
    this.replayAbtn.show();
    this.replayBbtn.show();
  }

  update(position)
  {

    /*
      SF START STOP
    */

    // if we reach fadein position and arent running yet, start story module
    if(!this.isStarted && position >= this.storyTrigger)
    {
      this.startModule();
      this.isStarted = true;
    }

    // if we are close to end, crossfade to endloop
    if(!this.isEndingA && this.isStarted && this.story.A.seek() >  this.story.A.duration() - this.xrfade1)
    {
      this.isEndingA = true;
      this.story.A_end.play();
      this.story.A_end.fade(0, 1, 1000);
      this.isFadingA = true;

      setTimeout(this.stopFadeA.bind(this), 1050);
    }

    // if we are close to end, crossfade to endloop
    if(this.isStarted && !this.isEndingB && this.story.B.seek() >  this.story.B.duration() - this.xrfade1)
    {
      this.isEndingB = true;
      this.story.B_end.play();
      this.story.B_end.fade(0, 1, 1000);
      this.isFadingB = true;

      setTimeout(this.stopFadeB.bind(this), 1050);
    }


    /*
      VOLUME UPDATES
    */

    // if we are outside the module, make sure its silent ( had some problems with dangling soundfiles)
    if(position < this.positionY - this.fadeIn || position > this.positionY + this.fadeOut)
    {
      this.globalVolume = 0.0;
      this.story.A_end.pause();
      this.story.B_end.pause();

      this.story.A_music.mute(true);
      this.story.B_music.mute(true);
    }

 
    else 
    {
      currentChapter = this.ID;
      this.story.A_music.mute(false);
      this.story.B_music.mute(false);

         // BEFORE OUR POSITION
      if(position <= this.positionY)
      {
        this.globalVolume = mapToRange(position, this.positionY - this.fadeIn, this.positionY, 0.0, 1.0);
      }

      else
      {
        this.globalVolume = mapToRange(position, this.positionY, this.positionY + this.fadeOut, 1.0, 0.0);
      }

      if(this.isEndingA)
        if(!this.story.A_end.playing())
          this.story.A_end.play();

      if(this.isEndingB)
        if(!this.story.B_end.playing())
          this.story.B_end.play();

      this.applyGlobalGain();
      this.draw(position); 
    }
  }
  

  stopFadeA()
  {
    this.isFadingA = false;
  }

  stopFadeB()
  {
    this.isFadingB = false;
  }

  applyGlobalGain()
  {

    if(!this.isFadingA)
    {
      this.story.A.volume(this.volumeA * this.globalVolume);
      this.story.A_music.volume(this.volumeA * this.globalVolume);

      if(this.isEndingA)
        this.story.A_end.volume(this.volumeA * this.globalVolume);
    }

    if(!this.isFadingB)
    {
      this.story.B.volume(this.volumeB * this.globalVolume);
      this.story.B_music.volume(this.volumeB * this.globalVolume);

      if(this.isEndingB)
        this.story.B_end.volume(this.volumeB * this.globalVolume);
    }
  }

  draw(position)
  {
    push();
    imageMode(CENTER);
    tint(255, this.globalVolume * (this.story.A.volume() * 180 + 75));
    image(this.image.A, - width * 0.25, (this.positionY * height) - (height * position), width * 0.5, 0);
    tint(255, this.globalVolume * (this.story.B.volume() * 180 + 75));
    image(this.image.B, width * 0.25, (this.positionY * height) - (height * position), width * 0.5, 0);
    noTint();
    pop();


    this.replayAbtn.style('opacity', this.story.A.volume());
    this.replayAbtn.position( width * 0.25, (this.positionY * (height * 1.05) - (height * position)));


    this.replayBbtn.style('opacity', this.story.B.volume());
    this.replayBbtn.position( width * 0.75, (this.positionY * (height * 1.05) - (height * position)));
  }
}

