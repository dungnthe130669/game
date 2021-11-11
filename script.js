'use strict';

const btnHold = document.querySelector('.btn--hold')
const btnRoll = document.querySelector('.btn--roll')
const player_1 = document.querySelector('.player--0')
const player_2 = document.querySelector('.player--1')
let current_score1 = 0
let sum_score1 = 0
let current_score2 = 0
let sum_score2 = 0
const img = document.querySelector('.dice')
const imgArr = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png']

function setScore(currentClass, current_score) {
    document.querySelector(currentClass).textContent = current_score;
}

const removeWinner = (player) => {
    if(player.classList.contains('player--winner')) {
        player.classList.remove('player--winner')
    }
}

document.querySelector('.btn--new').addEventListener('click', function() {
    removeWinner(player_1)
    removeWinner(player_2)
        current_score1 = 0
        sum_score1 = 0
        current_score2 = 0
        sum_score2 = 0
    setScore('#current--1', 0)
    setScore('#score--1',0)
    setScore('#current--0', 0)
    setScore('#score--0',0)

})

btnHold.addEventListener('click', function() {
    checkWinner(sum_score1, sum_score2)
    player_1.classList.toggle('player--active');
    player_2.classList.toggle('player--active');

    if(player_1.classList.contains('player--active')){
        setScore('#current--1', 0)
        setScore('#score--1',sum_score2)
    }else {
        setScore('#current--0', 0)
        setScore('#score--0', sum_score1)
    }


})

const changeImgAndReturnValue = () => {
    const randomElement = imgArr[Math.floor(Math.random() * imgArr.length)];
    img.src = randomElement
    img.classList.toggle('hidden')
    return imgArr.indexOf(randomElement) + 1
}

const checkWinner = (sum_score1, sum_score2) => {
    if(sum_score1 >= 100 || sum_score2 >= 100) {
        if(sum_score2 == sum_score1) {
            setScore('#score--0', sum_score1)
            setScore('#score--0', sum_score2)
            player_1.classList.add('player--winner');
            player_2.classList.add('player--winner');
        }else{
            setScore('#score--0', sum_score1)
            setScore('#score--1', sum_score2)
            const is_play1_winer  =  (sum_score1 > sum_score2) ? 1 : 0
            is_play1_winer ?  player_1.classList.add('player--winner') : player_2.classList.add('player--winner');
        }
        
    }
}

btnRoll.addEventListener('click', function() {
        if(player_2.classList.contains('player--active')){
            //change img
            current_score2 += changeImgAndReturnValue()
            //set current score
            setScore('#current--1', current_score2)
        }else {
            current_score1 += changeImgAndReturnValue()
            setScore('#current--0', current_score1)
        }
        sum_score1 = current_score1,
        sum_score2 = current_score2
        checkWinner(sum_score1, sum_score2)
})

