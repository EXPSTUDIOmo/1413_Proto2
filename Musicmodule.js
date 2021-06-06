class Musicmodule
{
  constructor(soundFile, start, full1, full2, end, volumeScale)
  {
    this.sound =  new Howl({
    src: ['assets/sound/' + soundFile],
    autoplay: false,
    loop: true,
    volume: 0.0,
    onload: function() {
      loadedSound();
    }
    });

    this.volume = 0.0;
    this.volumeScale = volumeScale;

    this.start = start;
    this.full1 = full1;
    this.full2 = full2;
    this.end = end;
  }

  update(sideGain)
  {
    if(VIEWPOSITION > this.start && VIEWPOSITION < this.end)
    {
      if(VIEWPOSITION < this.full1)
        this.volume = mapToRange(VIEWPOSITION, this.start, this.full1, 0.0, this.volumeScale);
      else if (VIEWPOSITION < this.full2)
        this.volume = this.volumeScale;
      else 
        this.volume = mapToRange(VIEWPOSITION, this.full2, this.end, this.volumeScale, 0.0);
    }

    else
    {
      this.volume = 0;
    }

    let newVolume = this.volume * sideGain;
    this.sound.volume(newVolume);
  }
}