


function setupPageElements()
{

}

function loadModules()
{
  moduleIntro = new Intro("0_Intro");

  modules = [];
  musics = [];

  // M 1
  let music_1A = new Musicmodule("1A_music.wav", 0.5, 0.9, 1.2, 1.7, 1);
  let music_1B = new Musicmodule("1B_music.wav", 0.5, 0.9, 1.2, 1.7, 1);

  
  modules.push(new Dualmodule(1, 1.0, 1.0, 0.5, 0.6, 4, 4, 'A', music_1A, music_1B, 
               "Paul Welzel", "ehemaliger Verfolgter",
               "Karl Dobritz", "ehemaliger Verfolger"));


  // M 2

  let music_2A = new Musicmodule("2A_music.wav", 1.2, 2.0, 2.6, 3.5, 1);
  let music_2B = new Musicmodule("2B_music.wav", 1.2, 2.0, 2.6, 3.5, 1);
  modules.push(new Dualmodule(2, 2.5, 2.4, 0.5, 0.6, 4, 4, 'A', music_2A, music_2B,
              "Ehemalige Verfolgte ", "bewerben sich bei der Stuttgarter Kriminalpolizei",
              "Ehemalige Verfolger", "bewerben sich bei der Stuttgarter Kriminalpolizei"));

  // M3 ( 2.2)

  let music_3A = new Musicmodule("3A_music.wav", 2.6, 3.5, 4.0, 5.0, 0.7);
  let music_3B = new Musicmodule("3B_music.wav", 2.6, 3.5, 4.0, 5.0, 0.7);
  modules.push(new Dualmodule(3, 4.0, 3.9, 0.4, 0.4, 2, 2, 'A', music_3A, music_3B,
              "Verfolgung und Inhaftierung", "...",
              "Polzei- und Gestapotätigkeit", "Mitgliedschaft NSDAP"));

  grundrauschen = new Grundrauschen();
}