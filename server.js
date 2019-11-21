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
        "Dividimos al país en dos categorías: una, la de los hombres que trabajan, y la otra, la que vive de los hombres que trabajan. Ante esta situación, nos hemos colocado abiertamente del lado de los que trabajan.\n-Juan Domingo Perón",
"El Justicialismo ha dejado de ser la causa de un hombre para ser la causa del pueblo, y por ella sí valdría la pena darlo todo, incluso la vida.\n-Juan Domingo Perón",
"Al amigo todo, al enemigo ni justicia\n-Juan Domingo Perón",
"Los intelectuales argentinos suben al caballo por la izquierda y bajan por la derecha.\n-Arturo Jauretche",
"Las disputas de la izquierda argentina son como los perros de los mataderos: se pelean por las achuras, mientras el abastecedor se lleva la vaca.\n-Arturo Jauretche",
"Ignoran que la multitud no odia, odian las minorías, porque conquistar derechos provoca alegría, mientras perder privilegios provoca rencor\n-Arturo Jauretche",
"La política es la historia del presente y la historia es la política de épocas pasadas\n-Arturo Jauretche",
"El arte de nuestros enemigos es desmoralizar, entristecer a los pueblos. Los pueblos deprimidos no vencen. Por eso venimos a combatir por el país alegremente. Nada grande se puede hacer con la tristeza\n-Arturo Jauretche",
"No existe la libertad de prensa, tan solo es una máscara de la libertad de empresa\n-Arturo Jauretche",
"Yo no soy un vivo: soy apenas un gil avivado\n-Arturo Jauretche",
"El nacionalismo de ustedes se parece al amor del hijo junto a la tumba del padre; el nuestro, se parece al amor del padre junto a la cuna del hijo. [...] Para ustedes la Nación se realizó y fue derogada; para nosotros, todavía sigue naciendo\n-Arturo Jauretche",
"Todos los sectores sociales deben estar unidos verticalmente por el destino común de la Nación. [...] Se hace imposible pensar la política social sin una política nacional\n-Arturo Jauretche",
"Arturo Jauretche paseaba con un amigo mirando una marcha opositora a Perón. \n―Son muchos ―dijo el amigo. \n―Pero están condenados al fracaso ―respondió Jauretche. \n―\¿Por qué? \n―Fijate cuántos jóvenes hay.\n-",
"Es como dice el Principito, lo esencial es invisible a los ojos. Con esta gente todo es invisible, hasta la comida.\n-Cristina Fernandez",
"De nada valdría un movimiento femenino en un mundo sin justicia social.\n-Eva Perón",
"Donde existe una necesidad nace un derecho.\n-Eva Perón",
"Yo no me dejé arrancar el alma que traje de la calle, por eso no me deslumbró jamás la grandeza del poder y pude ver sus miserias. Por eso nunca me olvidé de las miserias de mi pueblo y pude ver sus grandezas.\n-Eva Perón",
"Ladran Sancho, señal que cabalgamos\n-Eva Perón",
"Como mujer siento en el alma la cálida ternura del pueblo de donde vine y a quien me debo\n-Eva Perón",
"Yo sé que ustedes recogerán mi nombre y lo llevarán como bandera a la victoria\n-Eva Perón",
"Tenemos que convencernos para siempre: el mundo será de los pueblos si los pueblos decidimos enardecernos en el fuego sagrado del fanatismo\n-Eva Perón",
"Nuestra patria dejará de ser colonia, o la bandera flameará sobre sus ruinas\n-Eva Perón",
"Renuncio a los honores, pero no a la lucha\n-Eva Perón",
"Sangra tanto el corazón del que pide, que hay que correr y dar, sin esperar\n-Eva Perón",
"Pongo junto al alma de mi pueblo, mi propia alma\n-Eva Perón",
"Le tengo más miedo al frío de los corazones de los compañeros que se olvidan de donde vinieron, que al de los oligarcas\n-Eva Perón",
"Es hora de que la dirigencia política deje de lado los fueros y rinda cuentas permanentemente cada vez que es citada ante una intervención de la Justicia\n-Nestor Kirchner",
"No he venido a dejar mis convicciones en la puerta de la Casa Rosada\n-Nestor Kirchner",
"Sabemos el genocidio que pasó nuestra industria petrolera, la increíble privatización (...) Si YPF hubiera quedado en manos nuestras estaríamos recaudando (...) entre 20 y 25 y hasta 30.000 millones de dólares por año\n-Nestor Kirchner",
"Un país que lo soñamos, que Cristina lo sueña junto con la clase media, los intelectuales, los industriales, los jovenes, todos los argentinos que quieren hacer grande este país.\n-Nestor Kirchner",
"Recuerdo aquél 25 de mayo de 2003 cuando nos dejaron la Argentina prendida fuego y tuvimos que sacar el pecho para reconstruir la patria.\n-Nestor Kirchner",
"Sabemos que faltan asignaturas pendientes, estamos conduciendo, pero tenemos que mejorar las neuronas del estado, que sea eficiente y transparente, tenemos en claro cuales son las asignaturas pendientes, lo importante es tener los ojos y los oídos bien abiertos.\n-Nestor Kirchner",
"No pasarán a la historia aquellos que especulen, sino los que más se la jueguen.\n-Nestor Kirchner",
"Porque no solamente son terroristas los que andan poniendo bombas, también son terroristas económicos los que desestabilizan la economía de un país y provocan pobreza, hambre y miseria [...]\n-Cristina Fernandez",
"Creemos firmemente en los proyectos políticos; creemos que es posible superar la individualidades que muchas veces con una frase pretendidamente escandalizadora pretenden ocupar, claro, lugares que demandan mucho más lugar si son ideas\n-Cristina Fernandez",
"Sepan que voy a seguir representando los intereses de todos los argentinos. Lo pienso ejercer con todos los derechos que me da la Constitución y el voto popular\n-Cristina Fernandez",
"Estamos en política para que la gente viva mejor, para que tenga educación, vivienda, salud, más justicia, más seguridad, todos los argentinos.\n-Cristina Fernandez",
"No es que nosotros seamos tan buenos, sino que los demás son peores\n-Juan Domingo Perón",
"La verdadera democracia es aquella donde el gobierno hace lo que el pueblo quiere y defiende un solo interés: el del pueblo\n-Juan Domingo Perón",
"El que quiera conducir con éxito tiene que exponerse; el que quiere exitos mediocres, que no se exponga nunca; y si no quiere cometer ningún error, lo mejor es que nunca haga nada\n-Juan Domingo Perón",
"Yo he visto malos que se han vuelto buenos, pero no he visto jamás un bruto volverse inteligente\n-Juan Domingo Perón",    
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
