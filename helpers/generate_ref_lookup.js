var admin = require("firebase-admin");
var fs = require("fs");

var serviceAccount = require("./service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ragam-ca.firebaseio.com"
});

const db = admin.database();
	
db.ref('ambassadors').once("value", function(snapshot){
    let data = snapshot.val();

    let ref_obj = {};
    for( uid in data) {
        let ref_code = data[uid].ref_id;
        // store the UID indexed by ref_code
        ref_obj[ref_code] = uid;
    }
    // write to ref_codes.json
    fs.writeFileSync('./ref_codes.json', JSON.stringify(ref_obj));
    console.log("Saved to ref_codes.json");
})
