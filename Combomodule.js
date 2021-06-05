class Combomodule
{
    constructor(startPosition, leftMusicName, rightMusicName, nodeList)
    {
        this.startPosition = startPosition;
        this.endPosition = startPosition + 1; // 1 screen high
        this.nodes = nodeList;

        this.music =  
        {
          left :  new Howl({
                src: ['assets/sound/' + leftMusicName],
                autoplay: false,
                loop: true,
                volume: 0.0,
                onload: function() {
                  loadedSound();
                }
                }),

          right : new Howl({
                src: ['assets/sound/' + rightMusicName],
                autoplay: false,
                loop: true,
                volume: 0.0,
                onload: function() {
                  loadedSound();
                }
                })
        }
    }

    update(position)
    {
        if(position >= this.startPosition)
        {
            this.draw();
        }
    }

    draw()
    {
        for(let node of this.nodes)
        {
            node.draw();
        }
    }

}