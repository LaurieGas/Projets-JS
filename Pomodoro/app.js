const affichageTravail = document.querySelector('.affichageT');
const affichagePause = document.querySelector('.affichageP');
const btnGo = document.querySelector('.b1');
const btnPause = document.querySelector('.b2');
const btnReset = document.querySelector('.b3');
const cycles = document.querySelector('h2');

let checkInterval = false;
let tempsInitial = 1800;
// 1800secondes / 60 = 30min

let tempsDeRepos = 300;
// 300secondes / 60 = 5min
let pause = false;
let nbDeCycles = 0;
cycles.innerText = `Nombre de cycles ${nbDeCycles}`;

affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
// 1ère partie du code : 30minutes : 00secondes (calculées avec une condition ternaire)
// math.trunc = enleve les chiffres après la virgule
//  % = modulo, c'est le reste d'une division

affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

btnGo.addEventListener('click', () => {
    
    if(checkInterval === false) {

    checkInterval = true;

    tempsInitial--;
    affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;

    let timer = setInterval(() => {

        if( pause === false && tempsInitial > 0) {
            tempsInitial--;
            affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        } 
        // reinitilisation du temps et augmentation du cycle
        else if (pause === false && tempsDeRepos === 0 && tempsInitial === 0) {
            tempsInitial = 1800;
            tempsDeRepos = 300;
            nbDeCycles++;
            cycles.innerText = `Nombre de cycles ${nbDeCycles}`;
            affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
            affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
        }
        else if (pause === false && tempsInitial === 0) {
            tempsDeRepos--;
            affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;

        } 
        

    }, 1000)

      // Reset
      btnReset.addEventListener('click', () => {
        clearInterval(timer);
        checkInterval = false;
        tempsInitial = 1800;
        tempsDeRepos = 300;
        affichageTravail.innerText = `${Math.trunc(tempsInitial/60)} : ${(tempsInitial % 60 < 10) ? `0${tempsInitial % 60}` : tempsInitial % 60}`;
        affichagePause.innerText = `${Math.trunc(tempsDeRepos/60)} : ${(tempsDeRepos % 60 < 10) ? `0${tempsDeRepos % 60}` : tempsDeRepos % 60}`;
    })


    } else {
        return;
    }

})

btnPause.addEventListener('click', () => {

    if(pause === false){
        btnPause.innerText = "Play";
        // temps qui ne s'écoule pas
    } else if(pause === true){
        btnPause.innerText = "Pause";
        // temps qui s'écoule
    }
    pause = !pause;
    
})