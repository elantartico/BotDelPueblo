/* Setting things up. */
var path = require('path'),
    express = require('express'),
    app = express(),   
    Twit = require('twit'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
/* The example below tweets out "Hello world!". */
  var message_options = [
        "They didn\'t hand out tickets to the Sermon on the Mount. People just turned up, they knew it was a good gig.",
        "Jazz is the last refuge of the untalented. Jazz musicians enjoy themselves more than anyone listening to them does.",
        "Every band needs it's own special chemistry. And Bez was a very good chemist.",
        "They\'re applauding the DJ. Not the music, not the musician, not the creator, but the medium.",
        "I\'m being postmodern, before it was fashionable.",
        "I am not a lump of hash. I\'m in charge of Factory Records... I think.",
        "Now imagine the machine breaks. For a while, it\'s even better, because you\'re really flying; but then, you\'re fucked, because nobody beats gravity.",
        "This scene didn\'t actually make it to the final cut. I\'m sure it\'ll be on the DVD.",
        "People have been playing like that for the past 20,000 years and quite frankly, it\'s boring me arse off, y\'know?",
        "I mean, we obviously have nothing in common. I\'m a genius, you\'re fucking wankers",
        "Can I offer anybody like the best drug experience they ever had?",
        "Tony, you did a good job. Basically you are right: Shaun is the greatest poet since Yeats.",
        "The artists own all their work. The label owns nothing. Our bands have the freedom ... to fuck off.",
        "Is he gonna hit me? You\'re quite close to me there.",
        "You\'re recording silence?",
        "Yes, I\'ve dropped a bollock. I\'ve dropped a big massive hairy bollock.",
        "What\'s wrong with London Records?\nThe name, for a start.",
        "Tony, you\'re fucking mad.\nWell, that is a point of view.",
        "Well, that is amazing, because everybody else thinks he\'s a fucking idiot.",
        "You see, I fucking know what you are, but you don\'t know what you are.",
        "George Epstein. It's Brian Martin.\nIt\'s George Martin, you knob.",
        "Broccoli the vegetable?\nIt\'s a little known fact that it was invented by Cubby Broccoli, the producer of the James Bond films.",
      ]
   var random_index = Math.floor(Math.random() * message_options.length)
   var chosen_message = message_options[random_index]
  var resp = response;
  T.post('statuses/update', { status: chosen_message }, function(err, data, response) {
    if (err){
      resp.sendStatus(500);
      console.log('Error!');
      console.log(err);
    }
    else{
      resp.sendStatus(200);
    }
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
});
