class Intro
{
  constructor(soundFileName)
  {
    this.text = [["Sommer "], ["1945. "], ["Viele "], ["Polizeibeamte "], ["werden "], ["auf "], ["Anordnung "], ["der "], ["amerikanischen "], ["Militärregierung "], ["entlassen. "], ["Ehemalige "], ["NSDAP-Mitglieder "], ["sollen "], ["nicht "], ["mehr "], ["als "], ["Polizisten "], ["arbeiten "], ["dürfen. "], ["Vor "], ["allem "], ["die "], ["Kriminalpolizei "], ["ist "], ["damit "], ["faktisch "], ["aufgelöst. "]];

    //this.charTimings = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1., 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2., 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3., 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4., 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5., 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6., 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7., 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8., 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9., 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10., 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11., 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 12., 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 13., 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 14., 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9, 15., 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 16., 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 17., 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8, 17.9, 18., 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8, 18.9, 19., 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.8, 19.9, 20., 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 21., 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7, 21.8, 21.9, 22., 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7, 22.8, 22.9, 23., 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7 ];
    //this.charTimings = [27.4, 27.55, 27.7, 27.9, 28.05, 28.34, 28.36, 28.59, 28.72, 28.9, 29.15, 29.2, 29.3, 30.1, 30.2, 30.4, 30.6, 30.8, 30.9, 31.4, 31.4, 31.55, 31.75, 31.9, 32, 32.15, 32.3, 32.5, 32.6, 32.7, 32.8, 32.9, 32.92, 33, 33.2, 33.3, 33.4, 33.5, 33.6, 33.7, 33.8, 33.9, 34, 34.1];
    this.charTimings = [27.4, 27.55, 27.7, 27.9, 28.05, 28.34, 28.36, 28.59, 28.72, 28.9, 29.15, 29.2, 29.3, 30.1, 30.2, 30.4, 30.6, 30.8, 30.9,
                        31., 31.089744, 31.179487, 31.269231, 31.358974, 31.448718, 31.538462, 31.628205, 31.717949, 31.807692, 31.897436, 31.987179, 32.076923, 32.166667, 32.25641, 32.346154, 32.435897, 32.525641, 32.615385, 32.705128, 32.794872, 32.884615, 32.974359, 33.064103, 33.153846, 33.24359, 33.333333, 33.423077, 33.512821, 33.602564, 33.692308, 33.782051, 33.871795, 33.961538, 34.051282, 34.141026, 34.230769, 34.320513, 34.410256, 34.5, 34.589744, 34.679487, 34.769231, 34.858974, 34.948718, 35.038462, 35.128205, 35.217949, 35.307692, 35.397436, 35.487179, 35.576923, 35.666667, 35.75641, 35.846154, 35.935897, 36.025641, 36.115385, 36.205128, 36.294872, 36.384615, 36.474359, 36.564103, 36.653846, 36.74359, 36.833333, 36.923077, 37.012821, 37.102564, 37.192308, 37.282051, 37.371795, 37.461538, 37.551282, 37.641026, 37.730769, 37.820513, 37.910256, 38., 38.1, 38.2,  
                        38.4, 38.479221, 38.558442, 38.637662, 38.716883, 38.796104, 38.875325, 38.954545, 39.033766, 39.112987, 39.192208, 39.271429, 39.350649, 39.43, 39.509091, 39.588312, 39.667532, 39.746753, 39.825974, 39.905195, 39.984416, 40.063636, 40.142857, 40.222078, 40.301299, 40.380519, 40.45974, 40.538961, 40.618182, 40.697403, 40.776623, 40.855844, 40.935065, 41.014286, 41.093506, 41.172727, 41.251948, 41.331169, 41.41039, 41.48961, 41.568831, 41.648052, 41.727273, 41.806494, 41.885714, 41.964935, 42.044156, 42.123377, 42.202597, 42.281818, 42.361039, 42.44026, 42.519481, 42.598701, 42.677922, 42.757143, 42.836364, 42.915584, 42.994805, 43.074026, 43.153247, 43.232468, 43.311688, 43.390909, 43.47013, 43.549351, 43.628571, 43.707792, 43.787013, 43.866234, 43.945455, 44.024675, 44.103896, 44.183117, 44.262338, 44.341558, 44.420779, 44.5,
                        44.8, 44.872642, 44.945283, 45.017925, 45.090566, 45.163208, 45.235849, 45.308491, 45.381132, 45.453774, 45.526415, 45.6, 45.671698, 45.74434, 45.816981, 45.889623, 45.962264, 46.034906, 46.107547, 46.180189, 46.25283, 46.325472, 46.398113, 46.470755, 46.543396, 46.616038, 46.688679, 46.761321, 46.833962, 46.906604, 46.979245, 47.051887, 47.124528, 47.19717, 47.27, 47.342453, 47.415094, 47.487736, 47.560377, 47.633019, 47.70566, 47.778302, 47.850943, 47.923585, 47.996226, 48.068868, 48.141509, 48.214151, 48.286792, 48.359434, 48.432075, 48.504717, 48.577358, 48.65, 
                        49.2, 49.62, 50.01, 50.45, 50.7];


    this.sfOffset = 13.25; // length before text-sound-file starts, depends on how long musicIntro is
    this.index = 0;
    this.charIndex = 0;
    this.textLines = [[""]];
    this.lineIndex = 0;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.storyDuration = 0;
    this.storyEnding = false;
    this.isStarted = false;
    this.headerText = "14:13";
    this.subText = "Einleitung";


    this.fadeOutTime = 800;

    // main story soundfile to play once
    this.story = new Howl({
      src: ['assets/sound/' + soundFileName +'_story.mp3'],
      loop : false,
      volume : 1,
      autoplay : false, 
      onload: function() { loadedSound(); }
    });

    // end Loop to repeat 
    this.endLoop = new Howl({
      src: ['assets/sound/' + soundFileName +'_loop.wav'],
      loop : true,
      volume : 0,
      autoplay : false,
      onload: function() { loadedSound();}
    });

    this.music = new Howl({
      src: ['assets/sound/0_intro_music.mp3'],
      loop : true,
      volume : 0.5,
      autoplay : false,
      onload: function() { loadedSound();}
    });
  }



  startModule()
  {
    if(!this.isStarted)
    {
      this.storyDuration = this.story.duration();
      this.story.play();
      this.isStarted = true;
      setCurrentModule(this, this.headerText, this.subText, true)
    }

    //console.log(this.endLoop.duration());
  }

  stopModule()
  {
    this.story.stop();
    this.endLoop.stop();
    this.music.stop();
  }

  fadeOut()
  {
    this.endLoop.fade(this.endLoop.volume() , 0, this.fadeOutTime);
    this.music.fade( this.music.volume() , 0, this.fadeOutTime);
    setTimeout(this.stopModule.bind(this), this.fadeOutTime + 50);
  }

  update()
  {
    // fade into end loop
    if(this.story.seek() > 50.5 + this.sfOffset && !this.storyEnding)
    {
      this.endLoop.play()
      this.endLoop.fade(0, 1, 500);
      this.storyEnding = true;

      setTimeout(function() { drawScrollHint = true;}, 1000);
    }

    // scroll away startScreen
    if(currentState == STATES.preintro && this.story.seek() > 24.4 + this.sfOffset)
    {
      switchState(STATES.introtrans);
    }

    // start animating text
    if(currentState == STATES.introtrans && this.story.seek() > 26.7 + this.sfOffset)
    {
      switchState(STATES.intro);
    }

    if(currentState == STATES.intro || currentState == STATES.transition)
    {
      this.animateText();
    }
    
    if(this.story.seek() > this.sfOffset)
    {
      if(!this.music.playing())
        this.music.play();
    }
  }

  animateText()
  {

    // TEXT ANIMATION. Add next character/ word
    if(this.story.seek() > this.charTimings[this.index] + this.sfOffset)
    {
      this.index++;
      let maxWidth = width * 0.8;

            // if the word will fit on line, add chars to the line
      
      if(this.text[this.wordIndex])
      {
        this.textLines[this.lineIndex] += this.text[this.wordIndex][0].charAt(this.charIndex);
        this.charIndex++;

        if(this.charIndex >= this.text[this.wordIndex][0].length)
        {
          this.wordIndex++;
          this.charIndex = 0;

          let lineWithNextWord = this.textLines[this.lineIndex] + this.text[this.wordIndex];

          if(textWidth(lineWithNextWord) > maxWidth)
          {
            this.lineIndex++;
            this.textLines[this.lineIndex] = "";
          }  
        }
      }
    }  

    noStroke();
    fill(255);

    if(isMobile)
      textSize(18);
    else
      textSize(25);

    for(var i = 0; i < this.textLines.length; ++i)
    {
      textAlign(LEFT);
      text(this.textLines[i], - (width * 0.4), (i+1) * (textAscent() * 1.5) - height * 0.4 - (height * VIEWPOSITION), width * 0.8, height * 0.8);
    } 


  } 
}


