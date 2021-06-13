class Module
{
  constructor(id, side, x, y, radius, crossFadePoint, parentPos, musicModule, headerText, subText)
  {
    this.id = id;
    this.side = side; // 'A' or 'B'
    this.x = x;
    this.y = y;
    this.crossFadePoint = crossFadePoint;
    this.radius = radius;
    this.isStarted = false;
    this.isFading = false;
    this.storyEnding = false;
    this.isActive = false;
    this.gain = 1;
    this.parentGain = 0;
    this.parentPos = parentPos;
    this.headerText = headerText;
    this.subText = subText;
    this.fadeInObj;
    this.fadeOutObj;

    this.music = musicModule;

    this.story =  new Howl({
    src: ['assets/sound/' + id + side + "_story.mp3"],
    autoplay: false,
    loop: false,
    volume: 0.0,
    onload: function() {
      //loadedSound();
    }
    });

    this.loop = new Howl({
      src: ['assets/sound/' + id + side + "_loop.wav"],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        //loadedSound();
      }
      });

    this.imageSRC = loadImage('assets/images/' + id + side + ".png", this.rescaleImage.bind(this));
    this.image;

  }

  notifyPlaybar()
  {
    setCurrentModule(this, this.headerText, this.subText, false);
  }

  stopFade()
  {
    this.isFading = false;
  }

  fadeIn()
  {
    this.gain += 1 / frameRate();

    if(this.gain >= 1)
      this.gain = 1.0;
    else
      this.fadeInObj = setTimeout(this.fadeIn.bind(this), 1000 / frameRate());

  }

  fadeOut()
  {
    this.gain -= 1 / frameRate();
    
    if(this.gain <= 0)
    {
      this.gain = 0.0;
      this.story.pause();
      this.loop.pause();
    }
      
    else
      this.fadeOutObj = setTimeout(this.fadeOut.bind(this), 1000 / frameRate());

  }

  rescaleImage()
  {
    this.image = this.imageSRC.get();
    this.image.resize(width * this.radius, 0);
  }

  checkForClick()
  {
    var a = getMouseRelative('x') - this.x;
    var b = getMouseRelative('y') - (this.y + (this.parentPos - VIEWPOSITION)); 
    var distance = Math.sqrt( a*a + b*b );

    if(distance < this.radius * 0.5)
    {
      return true;
    }

    return false;
  }


  start(withFade)
  {
    let soundToStart = this.getCurrentSound();

    if(!soundToStart.playing())
      soundToStart.play();

    if(withFade)
    {
      clearTimeout(this.fadeOutObj);
      this.fadeIn();
    }        
    else
      this.gain = 1;

    this.isStarted = true;
    this.isActive = true;
    
    this.notifyPlaybar();
  }

  restart()
  {
    this.storyEnding = false;
    this.isStarted = true;
    this.isActive = true;

    this.loop.pause();
    this.story.stop();
    this.story.play();
  }

  pause()
  {
    this.isActive = false;
    clearTimeout(this.fadeInObj);
    this.fadeOut();
  }

  stop()
  {
    this.story.stop();
    this.loop.stop();
    this.storyEnding = false;

  }

  deactivate()
  {
    if(this.story.playing() || this.loop.playing())
    {
      this.stop();
    }
  }

  setScrollGain(parentGain)
  {
    this.parentGain = parentGain;

  }

  getCurrentSound()
  {
    if(this.storyEnding && !this.isFading)
      return this.loop;
    else
      return this.story;
  }



  update()
  {
    if(!this.storyEnding && this.story.seek() >= this.story.duration() - this.crossFadePoint)
    {
      this.storyEnding = true;

      if(!this.loop.playing())
      {
        this.isFading = true;
        this.loop.volume(0);
        this.loop.play();
        this.loop.fade(0, this.gain * this.parentGain, 1000);
        setTimeout(this.stopFade.bind(this), 1050);
      } 
    }

    this.music.update(this.gain);

    if(this.parentGain <= 0.0)
    {
      if(this.story.playing())
        this.story.pause();
      
      if(this.loop.playing())
        this.loop.pause();
    }

    else
    {
      if(this.isStarted && this.isActive)
      {
        if(!this.getCurrentSound().playing())
          this.start(true);
      }

      this.story.volume(this.gain * this.parentGain);

      if(!this.isFading)
        this.loop.volume(this.gain * this.parentGain);
        //this.loop.fade(this.story.volume(), this.gain * this.parentGain, 1000 / frameRate());

    }

    
    this.draw();
  }

  
  draw()
  {
    imageMode(CENTER);
    let playingSound = this.getCurrentSound();
    let blend = playingSound.playing() ? playingSound.volume() : 0;

    let posX = this.x * width;
    let posY = (this.parentPos - VIEWPOSITION) * height + (this.y * height);

    
    push();
    noStroke();
    tint(255, blend * 210 + 45);
    texture(this.image);
    translate(posX, posY);
    plane(this.image.width, this.image.height);
    noTint();
    pop();
    
  }




}