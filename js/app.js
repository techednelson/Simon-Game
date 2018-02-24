/*Compatibility with all browsers. A small compatibility issue with Chrome for android while in firefox for Android Audio works correclty when colors are clicked or ramdonly lighted by the app itself */
'use strict';
{
/*Start Program*/
let round = 0, level = 0;
let alArr = [], userArr = [];
let stop = false, onClicked = false, startClicked = true, completeRound = false, clickAgain = false, strictClicked = false, resetClicked = false, offClicked = false;
    
//on click listener
document.getElementById(`btn-on`).addEventListener(`click`, on, false);
    
//off click listener
document.getElementById(`btn-off`).addEventListener(`click`, off, false);
    
//reset click listener
document.getElementById(`reset`).addEventListener(`click`, reset, false);

//strict click listener
document.getElementById(`strict`).addEventListener(`click`, strict, false);

// function to run when on is clicked
function on() {
    document.getElementById('counter').style.color = `red`;
    document.getElementById(`btn-off`).style.background = `rgb(28, 2, 2)`;
    document.getElementById(`btn-on`).style.background = `rgb(39, 163, 59)`;
    audio(`On`);
    document.getElementById(`start`).addEventListener(`click`, start);
    onClicked = true;
    round++;
    getRandomNum();
    resetClicked = false;
    offClicked = false;
}

// function to run when off is clicked
function off() {
    stop = true;
    offClicked = true;
    document.getElementById('counter').style.color = `gray`;
    document.getElementById('counter').innerHTML = `- -`;
    document.getElementById(`btn-off`).style.background = `rgb(39, 163, 59)`;
    document.getElementById(`btn-on`).style.background = `rgb(28, 2, 2)`;
    document.getElementById(`start`).style.background = `rgb(107, 8, 8)`;
    document.getElementById(`reset`).style.background = `rgb(19, 7, 96)`;
    document.getElementById(`strict`).style.background = `rgb(107, 114, 10)`;
    round = 0;
    level = 0;
    alArr = [];
    userArr = [];
    onClicked = false;
    startClicked = true;
    completeRound = false;
    clickAgain = false;
    strictClicked = false;
}

function start() {
    if(onClicked && startClicked) {
        document.getElementById(`start`).style.background = `red`;
        setTimeout(() => {
            if(!offClicked) {
                document.getElementById(`start`).style.background = `red`;
                document.getElementById(`counter`).innerHTML = round < 10 ? `0${round}` : round;
                stop = false;
                startClicked = false;
                alSequence();
            }
        }, 1000);
    }
}

function strict() {
    if(onClicked && !startClicked) {
        strictClicked == true ? strictClicked = false: strictClicked = true;
        strictClicked == true ? document.getElementById(`strict`).style.background = `yellow` : document.getElementById(`strict`).style.background = `rgb(201, 179, 14)`;
    }
}
    
function reset() {
    if (onClicked && !startClicked) {
        audio(`Reset`);
        stop = true;
        document.getElementById(`reset`).style.background = `rgb(16, 98, 239)`;
        document.getElementById(`counter`).innerHTML = `Reset`;
        round = 1;
        alArr = [];
        userArr = [];
        startClicked = true;
        getRandomNum();
        completeRound = false;
        clickAgain = false;
        strictClicked = false;
        resetClicked = true;
        setTimeout(() => {
            if(!offClicked) {
               document.getElementById(`reset`).style.background = `rgb(19, 7, 96)`;
                document.getElementById(`counter`).innerHTML = round < 10 ? `0${round}` : round;
                start(); 
            }
        }, 1000); 
    }
}
    
function getRandomNum() {
    alArr.push(Math.floor(Math.random()*4));
}

function alSequence() {
    let delay, timer;
    level == 1 ? delay = 700 : level == 2 ? delay = 600 : level == 3 ? delay = 500 : delay = 800;
    level == 1 ? timer = 1400 : level == 2 ? timer = 1300 : level == 3 ? timer = 1200 : timer = 1500;
    let i=0;
    const myInterval = setInterval(() => {
        switch (alArr[i]) {
            case 0:
               audio(`red`);
                document.getElementById(`red`).style.background = `rgb(175, 10, 10)`;
                const delayR = setTimeout(() => {
                    document.getElementById(`red`).style.background = `rgb(102, 4, 4)`;
                }, delay);
                if (stop) {
                    document.getElementById(`red`).style.background = `rgb(102, 4, 4)`;
                    clearTimeout(delayR);
                }
                break;
            case 1:
                audio(`blue`);
                document.getElementById(`blue`).style.background = `rgb(16, 98, 239)`;
                const delayB = setTimeout(() => {
                    document.getElementById(`blue`).style.background = `rgb(19, 7, 96)`;
                }, delay);
                if (stop) {
                    document.getElementById(`blue`).style.background = `rgb(19, 7, 96)`;
                    clearTimeout(delayB);
                }
                break;
            case 2:
                audio(`yellow`);
                document.getElementById(`yellow`).style.background = `rgb(244, 252, 2)`;
                const delayY = setTimeout(() => {
                    document.getElementById(`yellow`).style.background = `rgb(201, 179, 14)`;
                }, delay);
                if (stop) {
                    document.getElementById(`yellow`).style.background = `rgb(201, 179, 14)`;
                    clearTimeout(delayY);
                }
                break;
            case 3:
                audio(`green`);
                document.getElementById(`green`).style.background = `rgb(49, 229, 9)`;
                const delayG = setTimeout(() => {
                    document.getElementById(`green`).style.background = `rgb(73, 124, 6)`;
                }, delay);
                if (stop) {
                    document.getElementById(`green`).style.background = `rgb(73, 124, 6)`;
                    clearTimeout(delayG);
                }
                break;
        }  
        i++;
        if(i == alArr.length || stop == true ) {
            clearInterval(myInterval);
            clickAgain = true;
            i == alArr.length ? userSequence() : i=i;
        }
    }, timer);
}

//User Sequence
function userSequence() {
    let time = 6000;
    const timeOut = setTimeout(() => {
        if(!offClicked) {
            resetClicked == false ? timeExpired() : resetClicked = resetClicked;
        }
    }, time);
   
     
    document.getElementById(`simon`).addEventListener(`click`, e => {
        clearTimeout(timeOut);
        resetClicked = false;
        if(clickAgain) {
            clickAgain = false;
            let color;
            e.target.id == `red` ? color = 0 : e.target.id == `blue` ? color = 1 : e.target.id == `yellow` ? color = 2 : color = 3;
            userArr.push(color);
            lightColor(color);
        }
    }, false);
}

function lightColor(num) {
    let i = 0;
    const delay = setInterval(() => {
        switch (num) {
            case 0:
               audio(`red`);
                document.getElementById(`red`).style.background = `rgb(175, 10, 10)`;
                const delayR = setTimeout(() => {
                    document.getElementById(`red`).style.background = `rgb(102, 4, 4)`;
                }, 300);
                if (stop) {
                    document.getElementById(`red`).style.background = `rgb(102, 4, 4)`;
                    clearTimeout(delayR);
                }
                break;
            case 1:
                audio(`blue`);
                document.getElementById(`blue`).style.background = `rgb(16, 98, 239)`;
                const delayB = setTimeout(() => {
                    document.getElementById(`blue`).style.background = `rgb(19, 7, 96)`;
                }, 300);
                if (stop) {
                    document.getElementById(`blue`).style.background = `rgb(19, 7, 96)`;
                    clearTimeout(delayB);
                }
                break;
            case 2:
                audio(`yellow`);
                document.getElementById(`yellow`).style.background = `rgb(244, 252, 2)`;
                const delayY = setTimeout(() => {
                    document.getElementById(`yellow`).style.background = `rgb(201, 179, 14)`;
                }, 300);
                if (stop) {
                    document.getElementById(`yellow`).style.background = `rgb(201, 179, 14)`;
                    clearTimeout(delayY);
                }
                break;
            case 3:
                audio(`green`);
                document.getElementById(`green`).style.background = `rgb(49, 229, 9)`;
                const delayG = setTimeout(() => {
                    document.getElementById(`green`).style.background = `rgb(73, 124, 6)`;
                }, 300);
                if (stop) {
                    document.getElementById(`green`).style.background = `rgb(73, 124, 6)`;
                    clearTimeout(delayG);
                }
                break;
        }
        i++;
        i == 1 ? clearInterval(delay) : i = i;
        let winner = comparison();
        if(winner && completeRound && round < 20) {
            userArr = [];
            round++;
            startClicked = true;
            getRandomNum();
            if(round < 5) {
                    level = 0;
                    start();
                } else if(round >= 5 && round < 9) {
                    level = 1;
                    start();
                } else if(round >= 9 && round < 13) {
                    level = 2;
                    start();
                } else if(round >= 13) {
                    level = 3;
                    start();
                }
        } 
        else if (winner && completeRound && round >= 20) {
            audio(`You Won`);
            document.getElementById('counter').innerHTML = `You Won`;
            userArr = [];
            alArr = [];
            round = 1;
            startClicked = true;
            getRandomNum();
            setTimeout(() => {
                start();
            }, 8000);
        } else if(winner && !completeRound) {
            clickAgain = true;
        } else if (!winner && !strictClicked) {
            timeExpired();
        } else if (!winner && strictClicked) {
            document.getElementById('counter').innerHTML = `Start Again`;
            userArr = [];
            alArr = [];
            round = 1;
            startClicked = true;
            getRandomNum();
            level = 0;
            setTimeout(() => {
                audio(`Start Again`)
                start();
            }, 1200);
        }
    }, 350);
}

function timeExpired() {
    document.getElementById('counter').innerHTML = `Try Again`;
    setTimeout(() => {
        userArr = [];
        audio(`Try Again`);
        round < 10 ? document.getElementById('counter').innerHTML = `0${round}` : document.getElementById('counter').innerHTML = round;
        startClicked = true;
        if(round < 5) {
            level = 0;
            start();
        } else if(round >= 5 && round < 9) {
            level = 1;
            start();
        } else if(round >= 9 && round < 13) {
            level = 2;
            start();
        } else if(round >= 13) {
            level = 3;
            start();
        }
    }, 1000);
}

function comparison() {
    const alLenght = alArr.length;
    const userLenght = userArr.length;
    
    for(let i=0; i<userArr.length; i++) {
        if(userLenght != alLenght || userLenght == alLenght) {
            if(alArr[i] != userArr[i]) {
                return false;
            } 
        } 
    }   
    userLenght == alLenght ? completeRound = true : completeRound = false;
    
    return true;
}

function audio(color)  {
    switch (color) {
        case `red`:
            document.getElementById(`redAudio`).play();
            break;
        case `blue`:
            document.getElementById(`blueAudio`).play();
            break;
        case `yellow`:
            document.getElementById(`yellowAudio`).play();
            break;
        case `green`:
            document.getElementById(`greenAudio`).play();
            break;
        case `You Won`:
            document.getElementById(`winAudio`).play();
            break;
        case `Start Again`:
            document.getElementById(`wrongAudio`).play();
            break;
        case `Try Again`:
            document.getElementById(`tryAudio`).play();
            break;
        case `Reset`:
            document.getElementById(`resetAudio`).play();
            break;
        case `On`:
            document.getElementById(`startAudio`).play();
            break;
    }
};
/*End Program*/
}