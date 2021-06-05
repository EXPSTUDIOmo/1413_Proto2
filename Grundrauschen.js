class Grundrauschen
{
  constructor()
  {
    this.sound =  new Howl({
    src: ['assets/grundrauschen.mp3'],
    autoplay: false,
    loop: true,
    volume: 0.0,
    onload: function() {
      loadedSound();
    }
    });

    this.volume = 0.0;

    this.zone1 = 
    {
      start: 1.1,
      full1: 1.5,
      full2: 2.6,
      end: 3.2
    }

    this.zone2 = 
    {
      start: 3.8,
      full1: 4.5,
      full2: 5.0,
      end: 6.0
    }

    this.zones = [this.zone1, this.zone2];
  }


  update(position)
  {
    let isInZone = false;

    for(let i = 0; i < this.zones.length; ++i)
    {
        let zone = this.zones[i];

        if(position > zone.start && position < zone.end)
        {
          isInZone = true;

          if(position < zone.full1)
            this.sound.volume(mapToRange(position, zone.start, zone.full1, 0.0, 1.0))
          else if (position < zone.full2)
            this.sound.volume(1.0);
          else 
            this.sound.volume(mapToRange(position, zone.full2, zone.end, 1.0, 0.0));

        }
    }

    if(!isInZone)
    {
      this.sound.stop();
    }

    else
    {
      if(!this.sound.playing())
        this.sound.play();
    }

  }

}