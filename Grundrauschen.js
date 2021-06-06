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
      full2: 1.6,
      end: 1.9
    }

    this.zone2 = 
    {
      start: 2.8,
      full1: 3.1,
      full2: 3.5,
      end: 3.7
    }

 

    this.zones = [this.zone1, this.zone2];
  }


  update()
  {
    let isInZone = false;

    for(let i = 0; i < this.zones.length; ++i)
    {
        let zone = this.zones[i];

        if(VIEWPOSITION > zone.start && VIEWPOSITION < zone.end)
        {
          isInZone = true;

          if(VIEWPOSITION < zone.full1)
            this.sound.volume(mapToRange(VIEWPOSITION, zone.start, zone.full1, 0.0, 1.0))
          else if (VIEWPOSITION < zone.full2)
            this.sound.volume(1.0);
          else 
            this.sound.volume(mapToRange(VIEWPOSITION, zone.full2, zone.end, 1.0, 0.0));
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