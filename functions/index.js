const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
var db = admin.database();

// Rewrite this to new form, 
exports.leaderboard = functions.database.ref('/points').onWrite(() => {
    return db.ref('ambassadors').on('value', function(snap) {
        let ambassadors = snap.val();
        return db.ref('points').on('value', function(snapshot) {
            let data = (snapshot.val());
            let result = [];
            for (let key of Object.keys(data)) {
                if (key != '0g4wwx5HpuY1MHcdrD12Xn6Kik43') {
                    if (ambassadors[key] && ambassadors[key].name) {
                        result.push({
                            name: ambassadors[key].name,
                            point: parseInt(data[key][0], 10),
                            id: key
                        });
                    }
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