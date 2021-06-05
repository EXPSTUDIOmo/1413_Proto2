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

    this.volumeScale = volumeScale;

    this.start = start;
    this.full1 = full1;
    this.full2 = full2;
    this.end = end;
  }


  update(position)
  {
    if(position > this.start && position < this.end)
    {
      if(position < this.full1)
        this.sound.volume(mapToRange(position, this.start, this.full1, 0.0, this.volumeScale))
      else if (position < this.full2)
        this.sound.volume(this.volumeScale);
      else 
        this.sound.volume(mapToRange(position, this.full2, this.end, this.volumeScale, 0.0));
    }

    else
    {
      this.sound.volume(0.0);
    }
  }

}