# d'ora 

d'ora is a music social media app that allows you to share albums and songs, along with a rating or blurb about each.  Along with sharing your own music, you will be able to see and react to what other users are sharing as well!  Curious as to what music is popular?  You can see what songs and albums are trending.  Can't remember what song you're thinking of?  Use our search function to help narrow it down!  
---
# Installation Instructions
###
**Client Installation Instructions**
1. Fork on GitHub and clone down this repository
2.  Run `npm install` to ensure dependancies are installed
3.  Touch a `.env.local` file
4. add `REACT_APP_SERVER_URL=http://localhost:3001` to `.env.local`
5. In your terminal, run the command `npm run start` to start the client
6. Navigate to http://localhost:3000/ to interact with the web app

**Server Installation Instructions**
1. Fork on [d'ora Server repository](https://github.com/tylerchan33/dora-server)GitHub and clone it down
2. Run `npm install` to ensure dependancies are installed
3. Touch a `.env` file 
4. add `JWT_SECRET="[SECRET_KEY_HERE]"` in the `.env`
5. Run `nodemon` to start server
---
## Tech Stack Used
- JavaScript
- Express
- Tailwind
- MongoDB and Mongoose
- Node.js
- JWT
- Bcrypt for Node.js
- React

d'ora is a `react` based Node.js application. The backend of our project `dora Server` uses Express.js along with a noSQL database called `mongoDB'. `dora Client` uses `axios` to connect with an API and gather information on songs and artist, which the user can interact with. Javascript is used throughout server and client sides. EJS (Embedded JavaScript Templating) and Tailwind are both used to design the interface that the user inteacts with. JWT(JSON Web Token) is used to protect a users data and authenticate them. 
# API

We will using the [last.fm API](https://www.last.fm/api) at the moment.

# ERDs

## ERD
![ERD](https://i.imgur.com/9mfoxI7.png)


# RESTful Routing Chart
## Home Routes
| Method | URL | Action | Description |
|:-----:|:---:|:------:|:-----------:|
| GET | / | READ | Takes the user to the homepage (not logged in) |
| GET | /login | Read | Takes the user to the login page |
| POST | /login | Create | Accepts a payload of data and logs a user in |
| GET | /signup | Read | Takes the user to the sign up page |
| POST | / | Create | Creates a new user and redirects the user to the homepage|
| GET | /logout | Read | Logs a user out and sends them back to the home page

## User Routes
| Method | URL | Action | Description |
|:-----:|:---:|:------:|:-----------:|
| GET | / | Read | Takes the user to the homepage (logged in) |
| GET | /:userId/profile | Read | Takes the user to their user page |
| GET | /:userId/profile/edit | Read | Takes the user to their edit user page |
| PUT | /:userId/profile | Update | Posts the updated user info and sends user to profile |

## Music Routes
| VERB | URL | Action | Notes |
|:----:| :---: | :-------: | :-----:|
| GET | /trending | Read | Renders the trending music page |
| GET | /song/:id | Read | Get info on a certain song |
| GET | /album/:id | Read | Get info on a certain album |

## Posts Routes

| VERB  | URL   | Action    | Notes |
| :----:| :---: | :-------: | :-----: |
| GET | / | Read | Render the Home Page (logged in) |
| GET | /post/new | Render a new post form |
| POST | / | Create | Create a new post and have it show in feed |
| GET | /post/:id | Read | Get more info on a post in the feed |
| GET | /post/:id/edit | Read | Render an edit post form |
| PUT | /post/:id | Update | Update a post’s information |
| DELETE | /post/:id | Destroy | Delete a post |





# Wireframes of All User Views
Homepage

![Home](https://i.imgur.com/FnlJpYg.png)

User Feed
![UserFeed](https://i.imgur.com/xsSvBtI.png)

Trending
![Trending](https://i.imgur.com/mbVddwE.png)

User Page
![User](https://i.imgur.com/rxdkWHx.png)

Song/Album Info

![Song/Album Info](https://i.imgur.com/dDbubqD.png)

# User Stories

*	as a user I want to create/edit/delete an account
* 	as a user I want to be able to post a song or album with a comment about it 
*	as a user I want to be able to delete and edit a post I make
* 	as a user I want to be able to see posts created by other users
*	as a user I want to be able to see other users
*	as a user I want to be able to see a trending page with all of the trending songs and albums
* 	as a user I want to be able to interact with other peoples posts 
* 	as a user I want to be able to search a song or album and have the information displayed to me
# MVP Goals/Stretch Goals

### MVP
- user is able to post a song/album
- a feed that shows what songs/albums other user's have posted
- a trending page with trending songs and albums
- search function for songs and albums
- editing and updating user profile
- 



### Stretch Goals

- allow users to play a song/album embedded on the site
- users are able to react to other's people's posts
- logo for our app
- delete profile
