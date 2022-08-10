const express = require('express');
require('dotenv').config();
var passport = require('passport');
var session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
var cookieParser = require('cookie-parser');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const routes = require('./controllers/homepageController');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({});

// handlebars template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize
    })
  }));
app.use(passport.authenticate('session'));

// app.get('/', (req, res) => { res.json('Hello!!!') });
app.use(routes);

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
