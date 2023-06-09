'use strict'

const titleWord = document.querySelector('.show-word');
const textInput = document.querySelector('.text');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const start = document.querySelector('.start');
const userInfo = document.querySelector('.user-info');
const rankLists = document.querySelector('.rank-list');
const music = new Audio('./assets/audio/Love is like fire.mp3');
music.type = 'audio/mp3';

const wordArray = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 
'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character',
'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 
'rainbow', 'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 
'developer', 'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 
'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada', 
'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology', 'alphabet', 
'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 
'beyond', 'evolution', 'banana', 'perfumer', 'computer', 'management', 
'discovery', 'ambition', 'music', 'eagle', 'crown', 'chess', 'laptop', 
'bedroom', 'delivery', 'enemy', 'button','superman', 'library', 'unboxing', 
'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 
'awesome', 'challenge', 'science', 'mystery', 'famous', 'league', 'memory', 
'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window']

let scores = 0;
let i = 0;
let count = 'timeCount';
start.addEventListener('click', () => {
    textInput.focus();
    start.innerHTML = 'Restart';
    if(time.innerHTML.trim() === '--s') {
        let times = 99;//change time
        wordArray.sort(() => Math.random() - 0.5);
        music.play();

        titleWord.innerHTML = wordArray[0];
        count = setInterval(function(){
            time.innerHTML = `${times}s`; 
            times--;
            if(times === -1) {
                clearInterval(count);
                music.pause();
                time.innerHTML = 'Timeover'
                getInfo();
            }
        },1000)
    } else {
        music.load();
        clearInterval(count);
        let times = 99;//change time
        scores = 0;
        i = 0;
        score.innerHTML = '--';
        wordArray.sort(() => Math.random() - 0.5);
        titleWord.innerHTML = wordArray[0];
        music.play();
        count = setInterval(function(){
            time.innerHTML = `${times}s`; 
            times--;
            if(times === -1) {
                clearInterval(count);
                music.pause();
                time.innerHTML = 'Timeover'
                getInfo();
            }
        },1000)
    }
 });

 textInput.addEventListener('keyup', () => {
    if(time.innerHTML !== 'Timeover' && score.innerHTML !== 'Congratulations on getting full marks') {
        if(textInput.value === titleWord.innerHTML) {
            i = ++i;
            if(i !== 89) {
                titleWord.innerHTML = wordArray[i];
            }
            score.innerHTML = `${++scores} points`;
            if(scores === 90) {
                clearInterval(count);
                music.pause();
                score.innerHTML = 'Congratulations on getting full marks';
                getInfo();
            }
            textInput.value = '';
        }
    }
 })

class Score {
    #date;
    #hits;
    #percentage;
    
    constructor(date,hits,percentage,) {
        this.#date = date;
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get getdate() {
        return this.#date
    }

    get gethits() {
        return this.#hits
    }

    get getpercentage() {
        return this.#percentage
    }

    getInfo () {
        return `${this.gethits} ${this.getpercentage}`
    }
}

function getInfo() {
    const gMonth = ((new Date()).getMonth()+1).toString().padStart(2, '0');
    const gDay = (new Date()).getDate().toString().padStart(2, '0');
    const gYear = (new Date()).getFullYear();
    const dates = ` ${gMonth} ${gDay}, ${gYear}`;
    const  percent = `${Math.round(scores / 90 * 10000) / 100.00}%`;
    const scoreInfo = new Score(dates,scores,percent);
    scoreInfo.getInfo();
    const lastInfo = scoreInfo.getInfo().trim().split(' ');
    /* userInfo.innerHTML = `Date:${lastInfo[0]} ${lastInfo[1]} ${lastInfo[2]}, Get points:${lastInfo[3]}, The points percentage is:${lastInfo[4]}.` 
    */

    let rank = [];
    //get old rank
    if(localStorage.length != 0) {
        rank = JSON.parse(localStorage.rank);
    }
 
    const userRank = {
        hits: lastInfo[0],
        percentage:lastInfo[1]
    }
   
    const arrString = JSON.stringify(userRank);

    rank.push(arrString);
    rank.sort().reverse()
    //console.log(rank)
    if(rank.length < 10) {
        localStorage.setItem("rank",JSON.stringify(rank));
    } else {
        let rank9 = rank.slice(0, 9);
        console.log(rank9);
        localStorage.setItem("rank",JSON.stringify(rank9));
    }

    getRank();
}

function getRank() {
    rankLists.innerHTML = `<div class="rank-head">
                                HIGH SCORES
                            </div>`
    if(localStorage.rank) {
        const rankList = JSON.parse(localStorage.rank);
        rankList.forEach((element,index) => {
            const rankSplit = element.split('"');
            const contactDiv = document.createElement("div");
            contactDiv.className = "rank";
            contactDiv.innerHTML = `<div>#${index+1}</div>
                                    <div>${rankSplit[3]} words</div>
                                    <div>${rankSplit[7]}</div>`
            rankLists.appendChild(contactDiv);
        });
    }
}

//localStorage.clear()
getRank()