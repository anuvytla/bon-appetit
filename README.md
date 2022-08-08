# Bon Appetit Restaurant Reservation

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What we learned](#what-we-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Making API calls](#making-API-calls)
- [Authors](#authors)
- [Acknowledgments](#acknowledgments)



## Overview

### The challenge

The minimum viable product (MVP) of this team project is to create a full stack RESTFUL application. Our app, Bon Appetit, is a restaurant reservation system that utilizes Node.js and Express.js for the backend. The database is deployed through Heroku and uses Sequelize as the ORM. The UI allows customers to sign up, login, and make reservations to the system. Additional functionalities include the ability to fetch the API for existing reservations and to modify and cancel reservations. As such, the app meets the CRUD (Create, Read, Update, Delete) requirements.  

### User Story

AS A restaurant customer
I WANT a reservation system
SO THAT I can make, update, or delete reservations

AS A restaurant manager
I WANT a reservation system
SO THAT I can view customers' reservations to manage my restaurant capacity

### Acceptance Criteria

Use Node.js and Express.js to create a RESTful API
use Handlebars.js as the template engine
Use MySQL and the Sequelize ORM for the database
Has GET and POST routes for retrieving and adding new data
Folder structure that meets the MVC paradigm
Includes authentication (express-session and cookies) 
Protects API keys and sensitive information with environment variables
Deploy using Heroku (with data)
Has a polished UI



### Screenshot

![](./screenshot.jpg)




### Links

- Solution URL: [Git Repository](https://github.com/anuvytla/bon-appetit)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- javaScript
- CSS
- Semantic HTML5 markup
- Node.js
- Express.js


### Dependencies
- connect-session-sequelize
- connect-sqlite3
- cookie-parser
- dotenv
- express
- express-handlebars
- express-sesssion
- inquirer
- mysql2
- passport
- sequelize




## Making API Calls

### Get

### Post

### Update

### Delete



```javaScript
const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use('/api', apiRoutes);

module.exports = router;
```


### Continued development

Beyond this project's MVP, if we had additional time, we would upscale this application to handle reservations for multiple restaurants. Additionally, we would have incorporated a seating chart. 


## Authors

- Website - [Anusha Vytla](https://www.your-site.com)
- Github - [anuvytla](https://github.com/anuvytla)
-------------------------------------------------------------

- Website - [Devi Nallammai](https://www.your-site.com)
- Github - [rmdn321](https://github.com/rmdn321/)
--------------------------------------------------------------

- Website - [Robert M Greene](https://monkonjay.github.io/Portfolio/)
- Github - [Monkonjay](https://github.com/Monkonjay)
--------------------------------------------------------------



## Acknowledgments

We owe gratitude to one another, the surviving members of this team, for the grit and tenacity exhibited to meet the project deliverables within the deadline. We started as a 5-member team and lost 2 members at the very beginning of the project. We pulled together, encouraged each other, and sacrificed additional hours in order to fulfill the project requirements. That’s TEAMWORK at its best!  
