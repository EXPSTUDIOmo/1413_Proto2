class Module
{
  constructor(id, side, x, y, radius, crossFadePoint, parentPos, musicModule)
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
    this.gain = 1;
    this.parentGain = 0;
    this.parentPos = parentPos;
    
    this.fadeInObj;
    this.fadeOutObj;

    this.music = musicModule;

    this.story =  new Howl({
    src: ['assets/sound/' + id + side + "_story.mp3"],
    autoplay: false,
    loop: false,
    volume: 0.0,
    onload: function() {
      loadedSound();
    }
    });

    this.loop = new Howl({
      src: ['assets/sound/' + id + side + "_loop.wav"],
      autoplay: false,
      loop: true,
      volume: 0.0,
      onload: function() {
        loadedSound();
      }
      });

    this.imageSRC = loadImage('assets/images/' + id + side + ".png", this.rescaleImage.bind(this));
    this.image;

  
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
      this.getCurrentSound().pause();
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

  
  }

  pause()
  {
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
        this.loop.play();
        this.loop.fade(0, this.gain * this.parentGain, 1000);
        setTimeout(this.stopFade.bind(this), 1010);
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
      if(!this.storyEnding && !this.story.playing() && this.isStarted)
        this.story.play();

      if(this.storyEnding && !this.loop.playing()) 
        this.loop.play();

      //this.story.fade(this.story.volume(), this.gain * this.parentGain, 1000 / frameRate());
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
    tint(255, blend * 180 + 75);
    texture(this.image);
    translate(posX, posY);
    plane(this.image.width, this.image.height);
    noTint();
    pop();
    
  }




}