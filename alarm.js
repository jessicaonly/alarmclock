//let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let alarmSound = new Audio();
alarmSound.src = 'slayer.mp3';
let alarmTimer;
let modal = document.querySelector(".modal");
let request = new XMLHttpRequest();
const app = document.getElementById('myModalContent');
const container = document.createElement('div');
const buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'container');
container.setAttribute('class', 'container');
app.appendChild(container);
container.appendChild(buttonContainer);



const requestFunction = function(){

  request.open('GET', 'https://opentdb.com/api.php?amount=1&category=18&difficulty=easy&type=multiple', true);

  request.onload = function (){
    let data = JSON.parse(this.response);
    console.log(data);
    let myData = data.results;
    if (request.status >= 200 && request.status < 400) {
    myData.forEach(result => {
    //console.log(result.question);
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const question = document.createElement('h2');
    question.textContent = result.question;
    console.log(question.textContent);

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
  buttonContainer.appendChild(correctButton);
  buttonContainer.appendChild(incorrectButton1);
  buttonContainer.appendChild(incorrectButton2);
  buttonContainer.appendChild(incorrectButton3);

  for (let i = buttonContainer.children.length; i >=0; i--){
    buttonContainer.appendChild(buttonContainer.children[Math.random() * i | 0]);
  }
  container.appendChild(card);

  card.appendChild(question);
  card.appendChild(buttonContainer);
 



  correctButton.setAttribute('onclick', 'correctAnswer(this)');
    
  });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `SOMETHING'S WRONG!`;
    app.appendChild(errorMessage);
  }

  }
  request.send();
}


console.log(requestFunction());


function popupFunction(){
// modal.classList.toggle("myModal");
// if (document.getElementById('myModal').style.visibility == 'hidden'){
  document.getElementById('myModal').style.visibility = 'visible';

// else {
//   document.getElementById('myModal').style.visibility = 'hidden';
// }
}

function correctAnswer(){
  document.getElementById('myModal').style.visibility = 'hidden';
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
  alarmSound.currentTime = 0
  document.getElementById('alarmOptions').style.display = 'none';
  cancelAlarm(document.getElementById('alarmButton'));
};

function snooze(){
  stopAlarm();
  alarmTimer = setTimeout(initAlarm, 6000);
}
