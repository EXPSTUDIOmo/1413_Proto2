let currentlyTrackedModule;
let playbarProgress = document.getElementById('progress');
let header = document.getElementById('navheader');
let subtext = document.getElementById('navsub');
let restartBtn;
let playbarActive = false;

function setupRestartBtn()
{
    restartBtn = createImg("assets/images/restartButton_white.png", "restart");
    restartBtn.hide();
    restartBtn.size(50, 50);
    restartBtn.position(width * 0.7, height * 0.05);
    restartBtn.mousePressed(highlightRestartBtn);
    restartBtn.touchStarted(highlightRestartBtn);
    restartBtn.mouseClicked(restartCurrentModule);
    restartBtn.touchEnded(restartCurrentModule);
}

function highlightRestartBtn()
{
    restartBtn.attribute('src', "assets/images/restartButton_highlight.png");
}

function restartCurrentModule()
{
    currentlyTrackedModule.restart();
    restartBtn.attribute('src', "assets/images/restartButton_white.png");
}

function setCurrentModule(module, newHeader, newSubText, isIntro)
{
    currentlyTrackedModule = module;
    header.innerHTML = newHeader;
    subtext.innerHTML = newSubText;
    playbarActive = true;

    let navigation = document.getElementById('nav');;
    navigation.style.visibility = 'visible';

    if(!isIntro)
        restartBtn.show();
}

function updatePlaybar()
{
    
    if(playbarActive)
    {
        let progress = (currentlyTrackedModule.story.seek() / currentlyTrackedModule.story.duration()) * 100;

        if(currentlyTrackedModule.story.seek() == 0 && currentlyTrackedModule.storyEnding)
            progress = 100;
    
        playbarProgress.style.width = progress + "%";
    }
}