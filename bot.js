var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var hunting;
function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = [/^>A wild/,/Hey Red/,/broke free!/,/Let's go home, Red/,/Let's fill that Pokedex, Red/,/Hi Red, Lets Train/,/loser/];
  var i;
  for (i = 0; i < botRegex.length; i++) {
    if (request.text && botRegex[i].test(request.text)){ 
    this.res.writeHead(200);
    postMessage(i);
    this.res.end();
	}
 }   
  if (i == 15) {
  console.log("don't care");
   this.res.writeHead(200);
   this.res.end();
 }
}
//function train(){
//var pokemon = [name, lvl];
//var team = [];
//var getTeam = JSON.parse(this.req.chunks[0]);
//}

function postMessage(message) {
  var botResponse, options, body, botReq;
if(message == 0 || message == 2){
  if(hunting == 1){ 
  botResponse = "!catch";
  }
}
else if (message == 1){
	botResponse = "handshake";
}
else if (message == 3){
	hunting = 0;
	botResponse = "I'm done for now";
}
else if (message == 4){
	hunting = 1;
	botResponse = "......";
}
else if (message == 5){
botResponse = "!train status";	
}
else if (message == 6){
botResponse = "Fight me, bitch";
}

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };
message = 0;
  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

exports.respond = respond;