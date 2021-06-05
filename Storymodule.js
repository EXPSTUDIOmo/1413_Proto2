class Storymodule
{
  constructor(soundFileName, imageName, positionY, positionX, fadeIn, fadeOut, storyTrigger, endFadePoint)
  {
    this.storyDuration = 0;
    this.isEnding = false;
    this.isStarted = false;
    this.positionY = positionY;
    this.positionX = positionX;
    this.storyTrigger = storyTrigger;
    this.fadeIn = fadeIn;
    this.fadeOut = fadeOut;
    this.inEndLoop = false;
    this.volume = 1;
    this.image = loadImage("assets/images/" + imageName);
    this.endFadePoint = endFadePoint;


    // main story soundfile to play once
    this.story = new Howl({
      src: ['assets/modules/' + soundFileName +'_story.mp3'],
      loop : false,
      volume : 1,
      autoplay : false, 
      onload: function() { loadedSound(); }
    });

    // end Loop to repeat 
    this.endLoop = new Howl({
      src: ['assets/modules/' + soundFileName +'_loop.wav'],
      loop : true,
      volume : 0,
      autoplay : false,
      onload: function() { loadedSound();}
    });
  }

  imageLoaded(isMobile)
  {
    if(isMobile)
    {
     this.image.resize(width * 0.4, 0); 
    }
	 
   else
   {
    this.image.resize(0, height * 0.75);
   }

  }


  startModule()
  {
    if(!this.isStarted)
    {
      this.storyDuration = this.story.duration();
      this.story.play();
      this.endLoop.play();
      this.endLoop.volume(0.0);
      this.isStarted = true;
    }
  }


  update(position)
  {
    // if we reach fadein position and arent running yet, start story module
    if(!this.isStarted && position > this.storyTrigger)
    {
      this.startModule();
      this.isStarted = true;
    }

    // if we are close to end, crossfade to endloop
    if(this.isStarted && !this.isEnding && this.story.seek() > this.storyDuration - this.endFadePoint)
    {
      this.endLoop.fade(0, this.volume, 1000);
      this.isEnding = true;
    }

    // if we are outside the module, make sure its silent ( had some problems with dangling soundfiles)
    if(position < this.positionY - this.fadeIn || position > this.positionY + this.fadeOut)
    {
      this.volume = 0.0;
    }

    // BEFORE OUR POSITION
    if(position < this.positionY)
    {
      this.volume = mapToRange(position, this.positionY - this.fadeIn, this.positionY, 0.0, 1.0);
    }

    else
    {
      this.volume = mapToRange(position, this.positionY, this.positionY + this.fadeOut, 1.0, 0.0);
    }

    this.story.volume(this.volume);

    if(!this.story.playing() && this.isEnding)
      this.endLoop.volume(this.volume);

    //push();
    //tint(255, this.volume * 255);
    imageMode(CENTER);
    image(this.image, width * this.positionX, (height * 0.5) + (this.positionY * height) - (height * position));
    //pop();
    //noTint();
  }



}
