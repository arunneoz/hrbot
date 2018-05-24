/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START datastore_quickstart]
// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');
var firstEntityKey;

// Your Google Cloud Platform project ID
const projectId = 'inbound-rune-devops-gke';

// Instantiates a client
const datastore = Datastore({
  projectId: projectId
});

// The kind for the new entity
const kind = 'Synonym';
// The name/ID for the new entity
const name = 'synonym';
// The Cloud Datastore key for the new entity
//const taskKey = datastore.key([kind, name]);

var query = datastore.createQuery('Synonym');
//query = client.query(kind='Synonym')
//key = ds.key('Synonym', topic)

var key = datastore.key(['Synonym', 'annual']);
var keyQuery = query.filter('__key__', key);
//query.key_filter(key, '=')
//results = list(query.fetch())

query.run(function(err, entities, info) {
  // entities = An array of records.

  // Access the Key object for an entity.
  //console.log (entities);
  firstEntityKey = entities[0]['synonym'];





query = datastore.createQuery('Topic');
//query = client.query(kind='Synonym')
//key = ds.key('Synonym', topic)
console.log(firstEntityKey);
key = datastore.key(['Topic', firstEntityKey]);
keyQuery = query.filter('__key__', key);
//query.key_filter(key, '=')
//results = list(query.fetch())

query.run(function(err, entities, info) {
  // entities = An array of records.

  // Access the Key object for an entity.
  //console.log (entities);
  var actionTxt = entities[0]['action_text'];
  console.log(actionTxt);

});

});





// [END datastore_quickstart]
