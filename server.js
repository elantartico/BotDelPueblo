/* Setting things up. */
var fs = require("fs"),
  util = require("util"),
  path = require("path"),
  express = require("express"),
  app = express(),
  Twit = require("twit"),
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

app.use(express.static("public"));

/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

app.all("/" + process.env.BOT_ENDPOINT, function(request, response) {
  /* The example below tweets out "Hello world!". */
  var message_options = [
    "Tenemos que superar el muro del rencor y del odio, superar el muro el hambre y el muro del despilfarro de nuestras energías productivas\n-Alberto Fernandez",
    "Sepan que voy a seguir representando los intereses de todos los argentinos. Lo pienso ejercer con todos los derechos que me da la Constitución y el voto popular\n-Cristina Fernandez",
    "Sin pan no hay presente ni futuro, la vida solo se padece; sin pan no hay democracia y libertad\n-Alberto Fernandez",
    'Las retenciones no van a "pagar los planes de los vagos" sino las deudas de los ricos.\n-Leandro Santoro',
    "La verdadera democracia es aquella donde el gobierno hace lo que el pueblo quiere y defiende un solo interés: el del pueblo\n-Juan Domingo Perón",
    "Recuerdo aquél 25 de mayo de 2003 cuando nos dejaron la Argentina prendida fuego y tuvimos que sacar el pecho para reconstruir la patria.\n-Nestor Kirchner",
    "No existe la libertad de prensa, tan solo es una máscara de la libertad de empresa\n-Arturo Jauretche",
    "Sabemos que faltan asignaturas pendientes, estamos conduciendo, pero tenemos que mejorar las neuronas del estado, que sea eficiente y transparente, tenemos en claro cuales son las asignaturas pendientes, lo importante es tener los ojos y los oídos bien abiertos.\n-Nestor Kirchner",
    "Todos los argentinos tienen que cumplir la ley, menos Magnetto y Clarín, los demás tenemos que cumplir la ley como corresponde\n-Nestor Kirchner",
    "Nuestra patria dejará de ser colonia, o la bandera flameará sobre sus ruinas\n-Eva Perón",
    "Siempre pasan estas cosas en la Argentina contra los peronistas. En el pasado y en estos cuatro años. Ahora, si no sos peronista pero sos multimillonario se presume honesto\n-Cristina Fernandez",
    "No puede haber argentinos de primera y argentinos de segunda. El país es uno solo y debe propender al desarrollo de todas sus regiones\n-Alberto Fernandez",
    "Sabemos el genocidio que pasó nuestra industria petrolera, la increíble privatización (...) Si YPF hubiera quedado en manos nuestras estaríamos recaudando (...) entre 20 y 25 y hasta 30.000 millones de dólares por año\n-Nestor Kirchner",
    "Estos asuntos de economía y finanzas son tan simples que están al alcance de cualquier niño. Sólo requieren saber sumar y restar. Cuando usted no entiende una cosa, pregunte hasta que la entienda. Si no la entiende, es que están tratando de robarle.\n-Scalabrini Ortiz",
    "De nada valdría un movimiento femenino en un mundo sin justicia social.\n-Eva Perón",
    "Al amigo todo, al enemigo ni justicia\n-Juan Domingo Perón",
    "Sin esperanza de ser escuchado, con la certeza de ser perseguido, pero fiel al compromiso que asumí hace mucho tiempo de dar testimonio en momentos difíciles\n-Rodolfo Walsh",
    "Quiero que quede claro, como presidente de la Nación, no tengo miedo ni les tengo miedo, que queremos el Ejército de San Martín, Belgrano, Mosconi y Savio, y no de aquellos que asesinaron a sus propios hermanos, que fue el de Videla, Galtieri, Viola y Bignone\n-Nestor Kirchner",
    "Lo que hace falta es una definición donde Ud. Le diga a todo el movimiento, sintéticamente, que somos revolucionarios en el exacto significado: liberación nacional y revolución social.\n-John William Cooke",
    "El pensamiento latinoamericano no puede sino ser revolucionario. En cuanto deja de serlo se niega a sí mismo, porque admite como inmutable la situación que nos oprime\n-John William Cooke",
    "Los intelectuales argentinos suben al caballo por la izquierda y bajan por la derecha.\n-Arturo Jauretche",
    "Renuncio a los honores, pero no a la lucha\n-Eva Perón",
    "Dividimos al país en dos categorías: una, la de los hombres que trabajan, y la otra, la que vive de los hombres que trabajan. Ante esta situación, nos hemos colocado abiertamente del lado de los que trabajan.\n-Juan Domingo Perón",
    "Yo sé que ustedes recogerán mi nombre y lo llevarán como bandera a la victoria\n-Eva Perón",
    "Pongo junto al alma de mi pueblo, mi propia alma\n-Eva Perón",
    "El que quiera conducir con éxito tiene que exponerse; el que quiere exitos mediocres, que no se exponga nunca; y si no quiere cometer ningún error, lo mejor es que nunca haga nada\n-Juan Domingo Perón",
    "Ignoran que la multitud no odia, odian las minorías, porque conquistar derechos provoca alegría, mientras perder privilegios provoca rencor\n-Arturo Jauretche",
    "Creemos firmemente en los proyectos políticos; creemos que es posible superar la individualidades que muchas veces con una frase pretendidamente escandalizadora pretenden ocupar, claro, lugares que demandan mucho más lugar si son ideas\n-Cristina Fernandez",
    "De los políticos solo podíamos esperar el engaño, la única revolución definitiva es la que hace el pueblo y dirigen los trabajadores\n-Rodolfo Walsh",
    "El pueblo escucha, mira, coteja y continúa en silencio su tráfico habitual. El pueblo tiene esos desplantes de gran señor, porque la conciencia del pueblo sabe adonde va aunque lo ignore cada uno de los individuos que lo componen.\n-Scalabrini Ortiz",
    "El hecho de que una persona sea amigo y tenga empresas no es delito. Si no, cómo lo llamarían al amigo del alma del presidente que se quedó con las empresas energéticas que saquearon los bolsillos de los argentinos\n-Cristina Fernandez",
    "No he venido a dejar mis convicciones en la puerta de la Casa Rosada\n-Nestor Kirchner",
    "Una revolución requiere partido revolucionario, jefes revolucionarios y mito revolucionario, por un lado, y la ocasión, por el otro.\n-John William Cooke",
    "Es tiempo de comenzar por los últimos para poder llegar después a todos\n-Alberto Fernandez",
    "El pueblo aprendió que estaba solo... El pueblo aprendió que estaba solo y que debía pelear por sí mismo y que de su propia entraña sacaría los medios, el silencio, la astucia y la fuerza.\n-Rodolfo Walsh",
    "Tenemos que convencernos para siempre: el mundo será de los pueblos si los pueblos decidimos enardecernos en el fuego sagrado del fanatismo\n-Eva Perón",
    "El nacionalismo de ustedes se parece al amor del hijo junto a la tumba del padre; el nuestro, se parece al amor del padre junto a la cuna del hijo. [...] Para ustedes la Nación se realizó y fue derogada; para nosotros, todavía sigue naciendo\n-Arturo Jauretche",
    "El Justicialismo ha dejado de ser la causa de un hombre para ser la causa del pueblo, y por ella sí valdría la pena darlo todo, incluso la vida.\n-Juan Domingo Perón",
    "Tanto entonces como ahora creo que el periodismo es libre, o es una farsa, sin términos medios\n-Rodolfo Walsh",
    "Creo, con toda ingenuidad y firmeza, en el derecho de cualquier ciudadano a divulgar la verdad que conoce, por peligrosa que sea\n-Rodolfo Walsh",
    "Las disputas de la izquierda argentina son como los perros de los mataderos: se pelean por las achuras, mientras el abastecedor se lleva la vaca.\n-Arturo Jauretche",
    "Yo no me dejé arrancar el alma que traje de la calle, por eso no me deslumbró jamás la grandeza del poder y pude ver sus miserias. Por eso nunca me olvidé de las miserias de mi pueblo y pude ver sus grandezas.\n-Eva Perón",
    "Porque no solamente son terroristas los que andan poniendo bombas, también son terroristas económicos los que desestabilizan la economía de un país y provocan pobreza, hambre y miseria [...]\n-Cristina Fernandez",
    "Mis colegas periodistas de los grandes diarios podrían tomarse el trabajo que yo me tomé, en vez de copiar lo que les dicta el teniente coronel fusilador\n-Rodolfo Walsh",
    "Le tengo más miedo al frío de los corazones de los compañeros que se olvidan de donde vinieron, que al de los oligarcas\n-Eva Perón",
    "Donde existe una necesidad nace un derecho.\n-Eva Perón",
    "Mientras los ideólogos sueñan, gente más práctica tortura y mata. Y eso es concreto, eso es urgente, eso es de aquí y de ahora\n-Rodolfo Walsh",
    "Al perder todo tipo de prestigio social y autoridad moral, como consecuencia del desastre socioeconómico en el que dejaron sumido al país, buena parte de la derecha argentina pasará a militar -lisa y llanamente- en la ANTIPOLITICA.\n-Leandro Santoro",
    "En 1930 yo había alcanzado el más alto título que un escritor puede lograr con su pluma: el de redactor de “La Nación”, cargo que renuncié para descender voluntariamente a la plebeya arena en que nos debatimos los defensores de los intereses generales del pueblo\n-Scalabrini Ortiz",
    "Como mujer siento en el alma la cálida ternura del pueblo de donde vine y a quien me debo\n-Eva Perón",
    "No es que nosotros seamos tan buenos, sino que los demás son peores\n-Juan Domingo Perón",
    "La política es la historia del presente y la historia es la política de épocas pasadas\n-Arturo Jauretche",
    "Ladran Sancho, señal que cabalgamos\n-Eva Perón",
    "Yo no soy un vivo: soy apenas un gil avivado\n-Arturo Jauretche",
    "La traición de un líder es más difícil de superar que la oposición de un enemigo abierto.\n-Rodolfo Walsh",
    "Nos quieren presentar la realidad o la historia como hechos inconexos, como si ninguno tuviera que ver con el otro, como si las cosas sucedieran casi como una tormenta.\n-Cristina Fernandez",
    "Yo he visto malos que se han vuelto buenos, pero no he visto jamás un bruto volverse inteligente\n-Juan Domingo Perón",
    "No habrá pautas del Estados para financiar programas individuales de periodistas. Cuentas claras conservan la amistad y el respeto\n-Alberto Fernandez",
    "Querido embajador, ustedes sí que tienen muchos más problemas que nosotros con el narcotráfico y con los blanqueos; construyeron ciudades enteras con ello (al embajador de EEUU)\n-Nestor Kirchner",
    "Un intelectual que no comprende lo que pasa en su tiempo y en su país es una contradicción andante; y el que comprendiendo no actúa, tendrá un lugar en la antología del llanto, no en la historia viva de su tierra\n-Rodolfo Walsh",
    "El arte de nuestros enemigos es desmoralizar, entristecer a los pueblos. Los pueblos deprimidos no vencen. Por eso venimos a combatir por el país alegremente. Nada grande se puede hacer con la tristeza\n-Arturo Jauretche",
    "Estamos en política para que la gente viva mejor, para que tenga educación, vivienda, salud, más justicia, más seguridad, todos los argentinos.\n-Cristina Fernandez",
    "Es como dice el Principito, lo esencial es invisible a los ojos. Con esta gente todo es invisible, hasta la comida.\n-Cristina Fernandez",
    "La unidad exige un claro propósito y una estrategia común variada en su aplicación pero no aguada por malabarismos palabreros. Es, a nuestro juicio, lo mínimo que podemos ofrecer a los pueblos de América Latina\n-John William Cooke",
    "No es el espíritu gregario individualista el que crea la felicidad del pueblo y la grandeza de la Nación, sino el espíritu de la solidaridad\n-Juan Domingo Perón",
    "Todos los sectores sociales deben estar unidos verticalmente por el destino común de la Nación. [...] Se hace imposible pensar la política social sin una política nacional\n-Arturo Jauretche",
    "Era el subsuelo de la patria sublevado. Era el cimiento básico de la Nación que asomaba por primera vez en su tosca desnudez original, como asoman las épocas pretéritas de la tierra en la conmoción de terremoto\n-Scalabrini Ortiz",
    "Es hora de que la dirigencia política deje de lado los fueros y rinda cuentas permanentemente cada vez que es citada ante una intervención de la Justicia\n-Nestor Kirchner",
    "Había que condenar a un gobierno, el de Néstor Kirchner, que desendeudó el país. Había que traer de vuelta al FMI y para traer el Fondo había que convencer que el que los desendeudó era un chorro y vino a saquear el país\n-Cristina Fernandez",
    "Estamos en el salón Borges… son incorregibles, ya lo digo Borges son incorregibles (a la multitud que cantó Vamos a volver)\n-Cristina Fernandez",
    "Las masas latinoamericanas no pueden hacer causa común con los verdugos, porque ellas también están en la lista de las víctimas.\n-John William Cooke",
    "Los pactos políticos entre fracciones adversas son siempre de mala fe, aunque sean convenientes.\n-John William Cooke",
    "No se enojen si hay chicos jóvenes argentinos que protestan, los que sufrimos, los que vimos lo que pasó en esta Patria, abrazamos fuertemente la democracia, a los chicos no los maneja nadie, ese es el cuento de siempre…\n-Nestor Kirchner",
    "La verdad es que sinceramente, si querían acariciarme el alma lo han hecho. Quiero agradecerles a todos los que me han acariciado el alma porque lo han logrado con creces\n-Cristina Fernandez",
    "No pasarán a la historia aquellos que especulen, sino los que más se la jueguen.\n-Nestor Kirchner",
    "Para dominar un país ya no hace falta someterlo militarmente, bastan oportunos empréstitos y concesiones\n-Scalabrini Ortiz",
    "La clase media tiene que darse cuenta que nunca va a encontrar la solidaridad de la oligarquía argentina\n-Nestor Kirchner",
    "El peronismo es más que un partido. No lo disuelven por decreto ni lo amansan por intimidación. No llamamos a ninguna aventura desesperada. Llamamos a la lucha, que comienza por esclarecer las conciencias, proclama las verdades y hablar por los que callan\n-John William Cooke",
    "No puedo, ni quiero, ni debo renunciar a un sentimiento básico: la indignación ante el atropello, la cobardía y el asesinato\n-Rodolfo Walsh",
    "Arturo Jauretche paseaba con un amigo mirando una marcha opositora a Perón. \n―Son muchos ―dijo el amigo. \n―Pero están condenados al fracaso ―respondió Jauretche. \n―¿Por qué? \n―Fijate cuántos jóvenes hay.\n",
    "La patria no es patrimonio de ninguna fuerza. La patria es el pueblo y nada puede sobreponerse al pueblo sin que corran peligro la libertad y la justicia\n-Eva Perón",
    "¿Preguntas? Preguntas tienen que contestar ustedes, no yo\n-Cristina Fernandez",
    "Formo parte de una generación diezmada. Castigada con dolorosas ausencias. Me sumé a las luchas políticas creyendo en valores y convicciones a los que no pienso dejar en la puerta de entrada de la Casa Rosada\n-Nestor Kirchner",
    "Ha llegado la hora de la mujer que comparte una causa pública y ha muerto la hora de la mujer como valor inerte y numérico dentro de la sociedad\n-Eva Perón",
    "Sangra tanto el corazón del que pide, que hay que correr y dar, sin esperar\n-Eva Perón",
    "Tengan en claro que cuando nos atacan, nos atacan no por las cosas que hicimos mal o las que no hicimos todavía, nos atacan por las cosas que hicimos bien, no nos perdonan haber devuelto el principio de justicia en la Argentina y haber terminado con la impunidad\n-Nestor Kirchner",
    "Un país que lo soñamos, que Cristina lo sueña junto con la clase media, los intelectuales, los industriales, los jovenes, todos los argentinos que quieren hacer grande este país.\n-Nestor Kirchner",
    "A mí me va a absolver la historia. Y a ustedes seguramente los va a condenar la historia (al TOF 2)\n-Cristina Fernandez",
    "El Peronismo es un movimiento universal. Perón pertenece al mundo por haber creado su Doctrina de Justicia y de Amor. Perón pertenece a toda la Humanidad.\n-Eva Perón"
  ];
  fs.readFile(__dirname + "/last_index.txt", "utf8", function(err, lastIndex) {
    console.log("last_index:", lastIndex);

    if (lastIndex == null || lastIndex == "") {
      lastIndex = 0;
    }

    //var random_index = Math.floor(Math.random() * message_options.length);
    var totalLines = message_options.length - 1;
    var chosen_message = message_options[lastIndex];
    var resp = response;
    T.post("statuses/update", { status: chosen_message }, function(
      err,
      data,
      response
    ) {
      if (err) {
        resp.sendStatus(500);
        console.log("Error!");
        console.log(err);
      } else {
        resp.sendStatus(200);
        var nextIndex =
          parseInt(lastIndex) != parseInt(totalLines)
            ? parseInt(lastIndex) + 1
            : 0;
        fs.writeFile(__dirname + "/last_index.txt", nextIndex, function(err) {
          /* TODO: Error handling? */
        });
      }
    });
  });
});

var listener = app.listen(process.env.PORT, function() {
  console.log("Your bot is running on port " + listener.address().port);
});
