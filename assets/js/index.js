'use strict'

const titleWord = document.querySelector('.show-word');
const textInput = document.querySelector('.text');
const score = document.querySelector('.score');
const time = document.querySelector('.time');
const start = document.querySelector('.start');
let times = 5;
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

start.addEventListener('click', () => {
    /* music.play(); */
    wordArray.sort(() => Math.random() - 0.5);
    //console.log(time.innerHTML)

    if(time.innerHTML.trim() === '--s') {
        titleWord.innerHTML = wordArray[0];
        const count = setInterval(function(){
            time.innerHTML = `${times}s`; 
            times--;
            console.log(times)
            if(times === -1) {
                clearInterval(count);
                time.innerHTML = 'Timeover'
            }
        },1000)
    }
    //console.log(wordArray)
 });

 let i = 0;
 let scores = 0;
 textInput.addEventListener('keyup', () => {
    //console.log(textInput.value)
    //console.log(wordArray)
    if(textInput.value === titleWord.innerHTML) {
        i = ++i;
        titleWord.innerHTML = wordArray[i];
        score.innerHTML = `${++scores} points`;
        textInput.value = '';
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
        return `${this.getdate} ${this.gethits} ${this.getpercentage}`
    }
}

