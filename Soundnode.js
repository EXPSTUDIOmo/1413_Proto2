class Soundnode
{
  constructor(id, name, side,  x, y, radius)
  {
    this.id = id;
    this.side = side;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isFading = false;

    this.sound =  new Howl({
    src: ['assets/sound/' + name + "_story.mp3"],
    autoplay: false,
    loop: true,
    volume: 0.0,
    onload: function() {
      loadedSound();
    }
    });

    this.image = loadImage('assets/images/' + name + ".png");
  }

  checkForClick()
  {
    var a = mouseX / width - this.x;
    var b = mouseY / height - this.y; 
    var distance = Math.sqrt( a*a + b*b );

    if(distance < this.radius)
    {
        this.activate();
        return id;
    }

    return -1;
  }

  activate()
  {
    this.sound.fade(0, 1, 500);
    
    if(!this.sound.playing())
        this.sound.play();
  }

  draw()
  {
    imageMode(CENTER);

    let blend = this.sound.playing() ? this.sound.volume() : 0;
    push();
    tint(255, blend * 180 + 75);
    image(this.image, this.x * width, this.y * height, this.radius * width, this.radius* height);
    noTint();
    pop();
  }
}