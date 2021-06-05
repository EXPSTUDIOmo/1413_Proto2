


function setupPageElements()
{

}

function loadModules()
{
  moduleIntro = new Intro("0_Intro");

  //ID, viewPosition, fadeIn, fadeOut, triggerPoint, xrfade1, xrfade2, startSide
  module_1 = new Dualmodule(1, 1.0, 0.5, 0.6, 1.0, 4, 4, 0); 
  module_2 = new Dualmodule(2, 2.0, 0.5, 0.6, 2.0, 4, 4, 1);

  grundrauschen = new Grundrauschen();
}