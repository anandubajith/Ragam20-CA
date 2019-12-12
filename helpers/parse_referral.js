/*
 * This script is responsible for parsing XLS files from YepDesk,
 * adding the referrals to corresponding CAs and assigning points.
 * 
 */

const DRY_RUN = true;
const WORKSHOP_NAME = "Industrial Automation";
const FILE_PATH = `${__dirname}/event-attendee-list.xlsx`;
const WORKSHOP_REFERRAL_POINTS = 2000;

const admin = require("firebase-admin");
const ref_obj = require('./ref_codes.json');
const chalk = require('chalk');
const serviceAccount = require("./service-key.json");
const xlsx = require('node-xlsx');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ragam-ca.firebaseio.com"
});

const db = admin.database();


function addReferral(ref_code, name, workshopName) {
    // check if ref_code is valid
    if ( !(ref_code in ref_obj) ) {
        console.log(chalk.red.bold(`Invalid referral code: ${ref_code}`));
        console.log(chalk.red.bold(`${name} - ${workshopName}`));
        return;
    }
    const uid = ref_obj[ref_code];

    console.log(chalk.blue(`${chalk.bold(ref_code)}: Adding referral ${name} - ${workshopName}`));

    // just for safety, don't commit any transactions
    if ( DRY_RUN )
        return;

    const { key } = db.ref(`ambassadors/${uid}/referral`).push();
    db.ref(`ambassadors/${uid}/referral/${key}`)
      .update({
        value: name,
        type: 'Workshop',
        status: 'Accepted',
      })
      .then(
        db.ref(`points/${uid}/${key}`)
          .update({
            reason: `Accepted ${workshopName} workshop referral : ${name}`,
            value: WORKSHOP_REFERRAL_POINTS,
          }),
      );
}
// This will parse the XLSX file
// Skipping first row of headers
// [booking_id, ticket_id, name, status, payment, no, total, checkin, college,ref_id]
const worksheet = xlsx.parse(FILE_PATH);
for (let rowIndex = 1; rowIndex < worksheet[0].data.length; rowIndex++) {
  const row = worksheet[0].data[rowIndex];
  const name = row[2];
  const ref_id = row[11];
  if ( ref_id)
    addReferral(ref_id, name, WORKSHOP_NAME);
}