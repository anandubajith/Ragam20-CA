# Ragam'20

The repository contains four parts
- The main CA site (/ragam-ca)
- The Admin site (/ragam-admin)
- Firebase cloud functions (/functions)
- Helper functions to manage (/helpers)

## Built With

| | | |
|:-----:|:-----:|:-----:|
|<img width="150" src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png" alt="Firebase">|<img width="150" src="https://github.com/vuejs/art/raw/master/vue-badge.png" alt="VueJS 2">|<img width="150" src="https://bulma.io/images/bulma-logo.png" alt="Bulma Logo">|

## Screenshots
<details>
<summary>Admin</summary>

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" src="screenshots/admin-login.png" alt="Admin Login Screen"> |  <img width="1604" src="screenshots/admin-dashboard.png" alt="Admin Dashboard">|<img width="1604" src="screenshots/admin-config.png" alt="Config page">|
|<img width="1604" src="screenshots/admin-login-mobile.png" alt="Admin login mobile"> Admin Login Page Mobile  |  <img width="1604" src="screenshots/admin-dashboard-mobile.png" alt="Full page screenshot of mobile dashboard" >|<img width="1604" src="screenshots/admin-manageposter-mobile.png" alt="Manage Poster Screen" >|
</details>
<details>
<summary>CA Portal</summary>

| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" src="screenshots/ca-homepage.png" alt="CA Homepage"> |  <img width="1604" src="screenshots/ca-register.png" alt="CA Register">|<img width="1604" src="screenshots/ca-dashboard.png" alt="CA Dashboard">|
| |<img width="1604" src="screenshots/ca-task.png" alt="CA TAsk view"> | |
</details>

## Deploying
<details> 
<summary> View Instructions </summary>
    
- Create a new Firebase project
    
- Setup and configure Firebase using `firebase-cli` as follows
    ```
    Hosting Ragam CA            => ragam-ca/dist
    Hosting Ragam Admin         => ragam-admin/dist
    Firebase Cloud functions    => functions
    ```
    (this should be pre configured with firebase.json)

- Update the Firebase config object in `ragam-admin/src/firebase.js` and `ragam-ca/src/main.js`

- Go to Firebase Project page and add Google , Email and Password as authentication providers.

- Create a new user with email and password note the UID ( This will be the admin user ).

- Update the new UID in `database.rules.json` and `storage.rules`.( This takes care of permissions )

- Seed the database with `database-seed.json` using Firebase console.

- Build and deploy using `yarn deploy`.

</details>
