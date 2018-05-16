//let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let alarmSound = new Audio();
alarmSound.src = 'alarm.mp3';
let alarmTimer;
let modal = document.querySelector(".modal");
let request = new XMLHttpRequest();
const app = document.getElementById('myModalContent');
const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);


request.open('GET', 'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy', true);

request.onload = function (){
  let data = JSON.parse(this.response);
  let myData = data.results;
 if (request.status >= 200 && request.status < 400) {
  myData.forEach(result => {
    //console.log(result.question);
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const question = document.createElement('h2');
    question.textContent = result.question;

    const correctButton = document.createElement('button');
    const correctText = document.createElement('p');
    correctText.textContent = result.correct_answer;
    correctButton.appendChild(correctText);

    const incorrectButton1 = document.createElement('button');
    const incorrectButton1Text = document.createElement('p');
    const incorrectButton2 = document.createElement('button');
    const incorrectButton2Text = document.createElement('p');
    const incorrectButton3 = document.createElement('button');
    const incorrectButton3Text = document.createElement('p');

    for (let i = 0; i < result.incorrect_answers.length; i++){
      incorrectButton1Text.textContent = result.incorrect_answers[0];
      incorrectButton1.appendChild(incorrectButton1Text);

      incorrectButton2Text.textContent = result.incorrect_answers[1];
      incorrectButton2.appendChild(incorrectButton2Text);

      incorrectButton3Text.textContent = result.incorrect_answers[2];
      incorrectButton3.appendChild(incorrectButton3Text);
    }

  container.appendChild(card);

  card.appendChild(question);
  card.appendChild(correctButton);
  card.appendChild(incorrectButton1);
  card.appendChild(incorrectButton2);
  card.appendChild(incorrectButton3);

  });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `SOMETHING'S WRONG!`;
    app.appendChild(errorMessage);
  }
  }

request.send();

function popupFunction(){
  modal.classList.toggle("show-modal");
}

function setAlarm(button){
  let ms = document.getElementById('alarmTime').valueAsNumber;
  if(isNaN(ms)) {
    alert('Invalid Date');
    return;
  }

    let alarm = new Date(ms);
    let alarmTime = new Date(alarm.getUTCFullYear(), alarm.getUTCMonth(), alarm.getUTCDate(),  alarm.getUTCHours(), alarm.getUTCMinutes(), alarm.getUTCSeconds());
    let differenceInMs = alarmTime.getTime() - (new Date()).getTime();

    if (differenceInMs < 0) {
      alert('Set an alarm for the future!');
      return;
    }

    alarmTimer = setTimeout(initAlarm, differenceInMs, popupFunction);

    button.innerText = 'Cancel Alarm';
    button.setAttribute('onclick', 'cancelAlarm(this);');

};
  function cancelAlarm (button){
    clearTimeout(alarmTimer);
    button.innerText = 'Set Alarm';
    button.setAttribute('onclick', 'setAlarm(this);')
  }

function initAlarm(callback){
  alarmSound.play();
  callback();
  document.getElementById('alarmOptions').style.display = '';
};

function stopAlarm(){
  alarmSound.pause();
  alarmSound.currentTime = 0;
  document.getElementById('alarmOptions').style.display = 'none';
  cancelAlarm(document.getElementById('alarmButton'));
};

function snooze(){
  stopAlarm();
  alarmTimer = setTimeout(initAlarm, 6000);
}
