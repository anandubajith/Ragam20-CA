const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
var db = admin.database();

// helper function to calculate the total points
function getPoints( data ) {
    return Object.values(data).reduce(
        (total, current) => total + parseInt(current.value, 10), 0,
    );
}
// Generates the leaderboard when changes happen in /points
exports.leaderboard = functions.database.ref('/points').onWrite(() => {
    return db.ref('ambassadors').on('value', function(snap) {
        let ambassadors = snap.val();
        return db.ref('points').on('value', function(snapshot) {
            let data = (snapshot.val());
            let result = [];
            for (let key of Object.keys(data)) {
                if (ambassadors[key] && ambassadors[key].name) {
                    result.push({
                        name: ambassadors[key].name,
                        point: getPoints(data[key]),
                        id: key
                    });
                }
            }

            let sorted = result.sort(function(a, b) {
                if (a.point > b.point) return -1;
                if (a.point < b.point) return 1;
                return 0;
            });

            return db.ref('leaderboard').set(sorted);
        });
    });
});

function genRandomID(length) {
    const chars = '123456789ABCEGHJKMNPRSTUVWXYZ';
    let res = '';
    for ( let i = 0; i < length; i++) {
        let pos = Math.floor(Math.random() * chars.length);
        res += chars[pos];
    }
    return res;
}

exports.generateRefIDs = functions.https.onCall((data, context) => {
    let IDs = [];
    db.ref('ambassadors').once("value", function(snapshot) {
        let data = (snapshot.val());
        for (let key of Object.keys(data)) {
            if (!data[key].ref_id) {
                let id = genRandomID(4);
                while (IDs.includes(id)) {
                    id = genRandomID(4);
                }
                IDs.push(id);
                db.ref('ambassadors/' + key)
                  .update({"ref_id": "R20-" + id});
            } else {
                IDs.push(data[key].ref_id);
            }
        }
    });
});
