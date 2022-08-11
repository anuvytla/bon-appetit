const express = require('express');
require('dotenv').config();
var passport = require('passport');
var session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
var cookieParser = require('cookie-parser');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers/homepageController');

// Create an express server.
const app = express();
const PORT = process.env.PORT || 3001;

// setup handlebars template engine.
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Setup routes for static files in public folder.
app.use(express.static('public'));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Setup session with sequelize storage.
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize
    })
  }));
// Setup passport for authentication.
app.use(passport.authenticate('session'));

app.use(routes);

// Sync sequelize to DB and start the server.
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
