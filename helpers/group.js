var admin = require("firebase-admin");

var serviceAccount = require("./service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ragam-ca.firebaseio.com"
});

function shuffle(sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}

const db = admin.database();

db.ref('ambassadors').once("value", function(snapshot){
    let data = (snapshot.val());
    let shuffled = shuffle(Object.values(data));
    for( let i =0; i < shuffled.length; i+=2) {
        console.log("GROUP " + ((i+2)/2));
        console.log( shuffled[i].name + " " + shuffled[i].phone);
        console.log( shuffled[i+1].name + " " + shuffled[i+1].phone);
        console.log('\n');
    }
});