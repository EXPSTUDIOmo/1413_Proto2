class Module
{
  constructor(id, side, x, y, radius)
  {
    this.id = id;
    this.side = side; // 'A' or 'B'
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.isFading = false;

    this.story =  new Howl({
    src: ['assets/sound/' + id + side + "_story.mp3"],
    autoplay: false,
    loop: true,
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

    this.image = loadImage('assets/images/' + id + side + ".png");
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

        console.log("CLICKED", this.id, this.side);
    }

    return -1;
  }

  activate()
  {
    this.story.fade(0, 1, 500);
    
    if(!this.story.playing())
        this.story.play();
  }

  draw()
  {
    imageMode(CENTER);

    let blend = this.story.playing() ? this.story.volume() : 0;
    push();
    tint(255, blend * 180 + 75);
    image(this.image, this.x * width, this.y * height, this.radius * width, this.radius* height);
    noTint();
    pop();
  }

  update()
  {

  }

}