const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://jessicaonly:Sydney17!@ds123500.mlab.com:23500/alarmclock')
mongoose.connection.once('open', () => {
  console.log('Connected with MongoDB ORM - mongodb-orm');
});

let quizSchema = mongoose.Schema({
  category: String,
  type: String,
  diffuculty: String,
  question: String,
  correctAnswer: String,
  IncorrectAnswers: String
});

 module.exports = function(data){

  let Quiz = mongoose.model('Quiz', quizSchema);

  for (let key in data) {
    for (let i = 0; i < data[key].length; i++) {
      let event = data[key][i];
      event.start = event.start.dateTime;
      event.end = event.end.dateTime;

      Quiz.create(event, (err, event) => {
        if (err) {
          throw err;
          console.log(event);
        }
      });
    }
  }

 }