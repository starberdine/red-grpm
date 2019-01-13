var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = process.env.BOT_ID;
var hunting = 1;
var tossed = 0;
var trained;
var waitinline = 0;
var waitone = 0;


//function sleep (time) {
//  return new Promise((resolve) => setTimeout(resolve, time));
//}
//var pokemon = [name,level];
function respond() {
  
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = [/^>A wild/,/Hey Red/,/broke free!/,/Lets go home,  Red/,/Let's fill that Pokedex, Red/,/Time to Scrimmage/,/Fight'em Red/,/!catch/,/To Mt. Silver, Red/,/caught/,/fled/,/Bill's PC/];
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
function train(){
	var n = newDate();
	if (n.getHours() % 3  != 0){
		trained = 0;
		botResponse = "Waiting at the Pokemon Center";
	}
if (n.getHours() % 3 == 0){
	if(trained == 0){
		botResponse = "!battle bott";	
		trained = 1;
	}
  }
}
function postMessage(message) {
  var botResponse, options, body, botReq;

if (message == 0){
      if(hunting == 1){ 
         waitinline = 1;
  }
}
else if (message == 1){
	botResponse = "handshake";
}
else if (message == 2){
	waitone = waitone + 1;
	if(tossed == 1 && waitinline >= 4 && waitone >= 2){
		botResponse = "!catch last ball, make it count!";
		tossed = tossed + 1;
	}
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
	train();	
}
else if (message == 6){
botResponse = "!battle bott  -PKMN Trainer Red wants to fight";

}
else if (message == 7){
	waitinline = waitinline + 1;
	if(waitinline == 2 && tossed == 0){
		botResponse = "!catch";
		tossed = tossed + 1;
	}
}
else if (message == 8) {
	hunting = 2;
	botResponse = ".........";
}

else if (message == 9) {
	tossed = 0;
	waitinline = 0;
	waitone = 0;
}
else if (message == 10){
	waitinline = 0;
	tossed = 0;	
	waitone = 0;
}
else if (message == 11){
	botResponse = "!team";
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
