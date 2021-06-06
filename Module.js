class Module
{
  constructor(id, side, x, y, radius, crossFadePoint, parentPos)
  {
    this.id = id;
    this.side = side; // 'A' or 'B'
    this.x = x;
    this.y = y;
    this.crossFadePoint = crossFadePoint;
    this.radius = radius;

    this.storyEnding = false;
    this.gain = 1;
    this.parentGain = 0;
    this.parentPos = parentPos;
    
    this.fadeInObj;
    this.fadeOutObj;

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
  }

  deactivate()
  {
    this.fadeOut();
    this.side = 'none';
    setTimeout(this.stop.bind(this), 1100);
  }

  setScrollGain(parentGain)
  {
    this.parentGain = parentGain;
  }

  getCurrentSound()
  {
    if(this.storyEnding)
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
        this.loop.play();
        this.loop.fade(0, 1, 1000);
      } 
    }
    this.story.fade(this.story.volume(), this.gain * this.parentGain, 1000 / frameRate());
    this.loop.fade(this.story.volume(), this.gain * this.parentGain, 1000 / frameRate());

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
    tint(255, blend * 180 + 75);
    image(this.image, posX, posY);
    noTint();
    pop();
  }




}