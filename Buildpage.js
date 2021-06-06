


function setupPageElements()
{

}

function loadModules()
{
  moduleIntro = new Intro("0_Intro");

  modules = [];
  
  // M 1
  modules.push(new Dualmodule(1, 1.0, 1.0, 0.5, 0.6, 4, 4, 'A'));
  
  // M 2
  modules.push(new Dualmodule(2, 2.5, 2.5, 0.5, 0.6, 4, 4, 'B'));

  grundrauschen = new Grundrauschen();
}