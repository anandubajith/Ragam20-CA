const admin = require("firebase-admin");

const serviceAccount = require("./service-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ragam-ca.firebaseio.com"
});

function listAllUsers(nextPageToken) {
    // List batch of users, 1000 at a time.
    admin.auth().listUsers(1000, nextPageToken)
        .then(function(listUsersResult) {

            listUsersResult.users.forEach(function(userRecord) {
                let creationTime =new Date(userRecord.metadata.creationTime);
                let cutOff = new Date('Tue, 10 Dec 2019 00:00:00 GMT'); // Maybe convert them to IST
                if ( creationTime > cutOff)
                    console.log('https://ragam-admin.web.app/verify/'+userRecord.uid, userRecord.displayName,userRecord.metadata.creationTime);
            });

            if (listUsersResult.pageToken) {
                // List next batch of users.
                listAllUsers(listUsersResult.pageToken);
            }
        })
        .catch(function(error) {
            console.log('Error listing users:', error);
        });
}

listAllUsers();