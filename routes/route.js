var appRouter = function(app) {

  const Datastore = require('@google-cloud/datastore');
  const datastore = new Datastore();
  var config = require('./config.json');
  var actionTxt="";
  var result;

  var ds = Datastore({
  projectId: config.projectId
  });




  app.post("/api/gethrresponse", function(req, res) {
    if(!req.body.result.action || req.body.result.action!='lookup') {
        return res.send(JSON.parse(buildReply('Invalid Request...')));
    } else {
      console.log(req.body);

      topic = req.body.result.parameters['topic'];
      console.log("Requested Topic "+ topic);

      // The kind for the new entity
      const skind = config.synonymkind;
      const tkind = config.topickind;


      var query = datastore.createQuery(skind);
      //query = client.query(kind='Synonym')
      //key = ds.key('Synonym', topic)

       var key = datastore.key([skind, topic]);
       var keyQuery = query.filter('__key__', key);

       query.run(function(err, entities, info) {
          if (entities.length == 0) {
            return buildReply('I can\'t find that in the handbook...')
          }

          firstEntityKey = entities[0]['synonym'];
          query = datastore.createQuery('Topic');
          console.log(firstEntityKey);
          key = datastore.key(['Topic', firstEntityKey]);
          keyQuery = query.filter('__key__', key);
          //query.key_filter(key, '=')
          //results = list(query.fetch())

          result = query.run(function(err, entities, info) {
            // entities = An array of records.

            // Access the Key object for an entity.
            //console.log (entities);
          if (entities.length > 0) {
          actionTxt = entities[0]['action_text'];
          rsp = buildReply(actionTxt.toString('utf8'));
          console.log("Sending Response " + rsp);
          res.setHeader('Content-Type', 'application/json');
          res.send(rsp);
          //return actionTxt;

          }

          console.log(actionTxt);




      });



      });


}
});




function buildReply(info) {
  //console.log("Processed Response " + info.toString('utf8'));
    return {
        'speech': info,
        'displayText': info,
        'source': 'apiai'
    }



}
}
module.exports = appRouter;
