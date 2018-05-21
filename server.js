const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({extended: true}))
// app.get('/', function(request, response) {
//   response.send('Hello world');
// });
app.use(express.static(__dirname + '/'));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/alarm.html')
});




app.listen(3000, function(){
  console.log('listening on 3000');
});