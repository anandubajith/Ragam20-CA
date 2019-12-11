// Get name and referral code from XLS file
// call add_referral

const ref_obj = require('./ref_codes.json');
function add_referral(ref_code, name, workshopName) {

    let uid = ref_obj[ref_code];

    const { key } = db.ref(`ambassadors/${uid}/referral`).push();

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


