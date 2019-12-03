# Ragam'20


The repository contains three parts
- The main CA site (/ragam-ca)
- The Admin site (/ragam-admin)
- Firebase cloud functions (/functions)

## Built With

| | |
|:-----:|:-----|
|<img width="150" src="https://firebase.google.com/downloads/brand-guidelines/PNG/logo-standard.png" alt="Firebase">|<img width="150" src="https://github.com/vuejs/art/raw/master/vue-badge.png" alt="VueJS 2">|

## Stuff to be done
### CA Site
- [ ] Redesign to suit to ragam 
- [ ] Refactor CSS

### General
- [ ] Write Documentation
- [ ] Cleanup readme

## Screenshots
### Admin
| | | |
|:-------------------------:|:-------------------------:|:-------------------------:|
|<img width="1604" src="screenshots/admin-login.png" alt="Admin Login Screen"> |  <img width="1604" src="screenshots/admin-dashboard.png" alt="Admin Dashboard">|<img width="1604" src="screenshots/admin-config.png" alt="Config page">|
|<img width="1604" src="screenshots/admin-login-mobile.png" alt="Admin login mobile"> Admin Login Page Mobile  |  <img width="1604" src="screenshots/admin-dashboard-mobile.png" alt="Full page screenshot of mobile dashboard" >|<img width="1604" src="screenshots/admin-manageposter-mobile.png" alt="Manage Poster Screen" >|

## Deploying
- Setup and configure Firebase using `firebase-cli` as follows
    ```
    Hosting Ragam CA            => ragam-ca/dist
    Hosting Ragam Admin         => ragam-admin/dist
    Firebase Cloud functions    => functions
    ```
    (this should be pre configured with firebase.json)
- Build and deploy the site using `yarn deploy`
