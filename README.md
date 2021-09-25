# 💻 Place-o-share

A web app where you can share different places all around the world

## 📌 Description

Bored in lockdown? Want to see amazing places all around the world?
Then here You can see..

## 📌 Setup

```bash
npm install

npm start
```


## 📌 Tech Stack Used

<ul>
<li>NodeJS - A JS Run Time Environment Used For Backend</li>
<li>ReactJS - A JS Library Used For Frontend/UI</li>
<li>Expressjs -  A Nodejs Framework</li>
<li>MongoDB -  As a Database</li>
<li>Google MAP API - For rendering map</li>
<li>Geocoding API -  For geocoding </li>
<li>Socket.io - For Websockets(that connects frontend and backend via event based communication)</li>
</ul>

## 📌 Usage

```
# A web app where you can share different places all around the world
```

<br>


## What did i learn ?
<ul>
<li>Integrating Maps</li>
<li>Authentication - Using Jsonwebtoken/Sessions</li>
<li>Sending Emails - NodeMailer/Sendgrid</li>
<li>Sending/Storing Files - Multer</li>
<li>Socket.io - How to set up event based communication</li>
<li>Geocoding - How to convert Address into Geo coordinates </li>
</ul>

<br>

## Feature work

<ol>
<li> Real Time Chat - <br> Chatting with users all around the world</li>
<li> 3D models of places - <br> Adding 3D models of places so that user can feel like they are standing there</li>
<li> Adding Machine Learning model - <br> Will add ML model to rate Places/Posts on the basis of number of users visited that Post/Places</li>
</ol>

<br>


## Frontend quick navigation 
```


# [{Host_Name}]/ - Users list
# [{Host_Name}]/:userId/places - Get Places of a specific user
# [{Host_Name}]/places/:placesId - Get a particular place
# [{Host_Name}]/places/new -  Add a new Place
# [{Host_Name}]/places/:pid -  Delete a Place
# [{Host_Name}]/auth -  Authentication page


```


## Frontend structure

```
📦frontend
 ┣ 📂public
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂places
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜PlaceItem.css
 ┃ ┃ ┃ ┣ 📜PlaceItem.js
 ┃ ┃ ┃ ┣ 📜PlaceList.css
 ┃ ┃ ┃ ┗ 📜PlaceList.js
 ┃ ┃ ┗ 📂pages
 ┃ ┃ ┃ ┣ 📜NewPlace.js
 ┃ ┃ ┃ ┣ 📜PlaceForm.css
 ┃ ┃ ┃ ┣ 📜UpdatePlace.js
 ┃ ┃ ┃ ┗ 📜UserPlaces.js
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📂FormElements
 ┃ ┃ ┃ ┃ ┣ 📜Button.css
 ┃ ┃ ┃ ┃ ┣ 📜Button.js
 ┃ ┃ ┃ ┃ ┣ 📜ImageUpload.css
 ┃ ┃ ┃ ┃ ┣ 📜ImageUpload.js
 ┃ ┃ ┃ ┃ ┣ 📜Input.css
 ┃ ┃ ┃ ┃ ┗ 📜Input.js
 ┃ ┃ ┃ ┣ 📂Navigation
 ┃ ┃ ┃ ┃ ┣ 📜MainHeader.css
 ┃ ┃ ┃ ┃ ┣ 📜MainHeader.js
 ┃ ┃ ┃ ┃ ┣ 📜MainNavigation.css
 ┃ ┃ ┃ ┃ ┣ 📜MainNavigation.js
 ┃ ┃ ┃ ┃ ┣ 📜NavLinks.css
 ┃ ┃ ┃ ┃ ┣ 📜NavLinks.js
 ┃ ┃ ┃ ┃ ┣ 📜SideDrawer.css
 ┃ ┃ ┃ ┃ ┗ 📜SideDrawer.js
 ┃ ┃ ┃ ┗ 📂UIElements
 ┃ ┃ ┃ ┃ ┣ 📜Avatar.css
 ┃ ┃ ┃ ┃ ┣ 📜Avatar.js
 ┃ ┃ ┃ ┃ ┣ 📜Backdrop.css
 ┃ ┃ ┃ ┃ ┣ 📜Backdrop.js
 ┃ ┃ ┃ ┃ ┣ 📜Card.css
 ┃ ┃ ┃ ┃ ┣ 📜Card.js
 ┃ ┃ ┃ ┃ ┣ 📜ErrorModal.js
 ┃ ┃ ┃ ┃ ┣ 📜LoadingSpinner.css
 ┃ ┃ ┃ ┃ ┣ 📜LoadingSpinner.js
 ┃ ┃ ┃ ┃ ┣ 📜Map.css
 ┃ ┃ ┃ ┃ ┣ 📜Map.js
 ┃ ┃ ┃ ┃ ┣ 📜Modal.css
 ┃ ┃ ┃ ┃ ┗ 📜Modal.js
 ┃ ┃ ┣ 📂context
 ┃ ┃ ┃ ┗ 📜auth-context.js
 ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┣ 📜auth-hook.js
 ┃ ┃ ┃ ┣ 📜form-hook.js
 ┃ ┃ ┃ ┗ 📜http-hook.js
 ┃ ┃ ┗ 📂util
 ┃ ┃ ┃ ┗ 📜validators.js
 ┃ ┣ 📂user
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜UserItem.css
 ┃ ┃ ┃ ┣ 📜UserItem.js
 ┃ ┃ ┃ ┣ 📜UsersList.css
 ┃ ┃ ┃ ┗ 📜UsersList.js
 ┃ ┃ ┗ 📂pages
 ┃ ┃ ┃ ┣ 📜Auth.css
 ┃ ┃ ┃ ┣ 📜Auth.js
 ┃ ┃ ┃ ┣ 📜New-pass.js
 ┃ ┃ ┃ ┣ 📜Reset.js
 ┃ ┃ ┃ ┗ 📜Users.js
 ┃ ┣ 📜App.js
 ┃ ┣ 📜index.css
 ┃ ┗ 📜index.js
 ┣ 📜.firebaserc
 ┣ 📜.gitignore
 ┣ 📜firebase.json
 ┣ 📜package-lock.json
 ┗ 📜package.json

```

## Backend structure

```
📦backend
 ┣ 📂controllers
 ┃ ┣ 📜places-controllers.js
 ┃ ┗ 📜users-controllers.js
 ┣ 📂middleware
 ┃ ┣ 📜.DS_Store
 ┃ ┣ 📜check-auth,.js
 ┃ ┗ 📜file-upload.js
 ┣ 📂models
 ┃ ┣ 📜http-error.js
 ┃ ┣ 📜place.js
 ┃ ┗ 📜user.js
 ┣ 📂routes
 ┃ ┣ 📜places-routes.js
 ┃ ┗ 📜users-routes.js
 ┣ 📂uploads
 ┃ ┗ 📂images
 ┃ ┃ ┣ 📜.DS_Store
 ┃ ┃ ┣ 📜3d1e619c-b95a-4234-98ab-04bec5bcc612.jpeg
 ┃ ┃ ┗ 📜cc474b26-c8d2-4337-a634-70a19684f6b9.png
 ┣ 📂util
 ┃ ┗ 📜location.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜app.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜Procfile
 ┗ 📜socket.js

```

## 📌 Backend-APIS

### 💻 For Places

```

# GET- [{Host_Name}](https://placeoshare.herokuapp.com/)/api/places/:pid - Get Place By PlaceID
# GET - [{Host_Name}](https://placeoshare.herokuapp.com/)/api/places/user/:uid - Get Place By UserID
# POST - [{Host_Name}](https://placeoshare.herokuapp.com/)/api/places - Add a Place
# PATCH - [{Host_Name}](https://placeoshare.herokuapp.com/)/api/places/:pid -  Update a Place
# DELETE - [{Host_Name}](https://placeoshare.herokuapp.com/)/api/places/:pid -  Delete a Place

```

### 💻 For Users

```

# GET- [{Host_Name}](https://placeoshare.herokuapp.com/)/api/users - Get All users
# POST - [{Host_Name}](https://placeoshare.herokuapp.com/)/api/users/signup - Signup a user
# POST - [{Host_Name}](https://placeoshare.herokuapp.com/)/api/users/login - Login a user
# POST - [{Host_Name}](https://placeoshare.herokuapp.com/)/api/users/reset -  Reset password

```

## Challenges faced

While developing a developer will surely face many challenges, some of them that i faced were -

<ol>
<li>How to add Web sockets on a HTTP server</li>
<li>How to integrate Google maps API</li>
<li>How to send email using Nodemailer</li>
</ol>

<br>

## 🖨 License

<p align="center">
<a href="https://github.com/Amoghtech/Placoshare/blob/master/LICENSE">
<h5 align="center"><b>MIT License</b></a>

## 💻 Demo

<video src='https://user-images.githubusercontent.com/66239105/132993257-1560082d-b80d-482b-81bd-12398d30f50c.mp4' width=180/>
