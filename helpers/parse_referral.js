/*
 * This script is responsible for parsing XLS files from YepDesk,
 * adding the referrals to corresponding CAs and assigning points.
 * 
 */

// REMEMBER MOBILE WORKSHOP SUNDAY , is only done till 76 or somethign,
//   so compare file and do it
const DRY_RUN = true;
const WORKSHOP_NAME = "Mobile Photography (Saturday)";
const FILE_PATH = `${__dirname}/workshop-files/Mobile(Sat).xlsx`;
const WORKSHOP_REFERRAL_POINTS = 2000;

const admin = require("firebase-admin");
// To be generted with generate_ref_lookup.js
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
  if (!(ref_code in ref_obj)) {
    console.log(chalk.red.bold(`Invalid referral code: ${ref_code}`));
    console.log(chalk.red.bold(`${name} - ${workshopName}`));
    return;
  }
  const uid = ref_obj[ref_code];

  console.log(chalk.blue(`${chalk.bold(ref_code)}: Adding referral ${name} - ${workshopName}`));

  // just for safety, don't commit any transactions
  if (DRY_RUN)
    return;

  const { key } = db.ref(`ambassadors/${uid}/referral`).push();
  let storePromise = db.ref(`ambassadors/${uid}/referral/${key}`)
    .update({
      value: name,
      type: 'Workshop',
      status: 'Accepted',
    });
  let pointPromise = db.ref(`points/${uid}/${key}`)
    .update({
      reason: `Accepted ${workshopName} workshop referral : ${name}`,
      value: WORKSHOP_REFERRAL_POINTS,
    });

  return Promise.all([storePromise, pointPromise]);
}
// This will parse the XLSX file
// Skipping first row of headers
// [booking_id, ticket_id, name, status, payment, no, total, checkin, college,ref_id]
const worksheet = xlsx.parse(FILE_PATH);
let totalCount = 0;
let referralPromises = [];
for (let rowIndex = 1; rowIndex < worksheet[0].data.length; rowIndex++) {
  const row = worksheet[0].data[rowIndex];
  const name = row[2];
  const ref_id = row[11];
  if (ref_id) {
    referralPromises.push(
      addReferral(ref_id, name, WORKSHOP_NAME)
    );
    totalCount += 1;
  }
}



Promise.all(referralPromises)
  .then(() => {
    console.log('\n');
    console.log(chalk.bgCyan(chalk.black(` TOTAL REFERRALS: ${totalCount} `)));
    console.log('\n');
    process.exit(0);
  })
  .catch(e => {
    console.log("Error", e);
  });