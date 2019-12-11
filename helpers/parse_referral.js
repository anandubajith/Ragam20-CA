// Get name and referral code from XLS file
// call add_referral

const DRY_RUN = true;


var admin = require("firebase-admin");
const ref_obj = require('./ref_codes.json');
const serviceAccount = require("./service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ragam-ca.firebaseio.com"
});

const db = admin.database();


function add_referral(ref_code, name, workshopName) {
    // check if ref_code is valid
    if ( !(ref_code in ref_obj) ) {
        console.error(`Invalid referral code: ${ref_code}`);
        console.error(`${name} - ${workshopName}`);
        return;
    }
    const uid = ref_obj[ref_code]; 
    const { key } = db.ref(`ambassadors/${uid}/referral`).push();
    
    console.info(`${ref_code}: Adding referral ${name} - ${workshopName}`);

    // just for safety, don't commit any transactions
    if ( DRY_RUN )
        return;

    db.ref(`ambassadors/${uid}/referral/${key}`)
      .update({
        value: name,
        type: `Workshop - ${workshopName}`,
        status: 'Accepted',
      })
      .then(
        db.ref(`points/${uid}/${key}`)
          .update({
            reason: `Accepted ${workshopName} workshop referral : ${name}`,
            value: 2000,
          }),
      );
}
