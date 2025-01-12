require('dotenv').config();
require('./config/database');
const express = require('express');

const app = express();
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const addUserToViews = require('./middleware/addUserToViews');
const isSignedIn = require('./middleware/isSignedIn');

// Controllers
const authController = require('./controllers/auth');
const moviesController = require('./controllers/movies')


// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// In your express app, you have to mention the public directory from which you are serving the static files
app.use(express.static(__dirname + '/public'));

// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

app.use(addUserToViews);

// Public Routes
app.get('/', (req, res) => {
  if(req.session.user) {
    res.redirect(`/users/${req.session.user._id}/movies`)
  } else {
    res.render('index.ejs')
  }
})

app.use('/auth', authController);

// Protected Routes
app.use(isSignedIn);


app.get('/protected', async (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.sendStatus(404);
    // res.send('Sorry, no guests allowed.');
  }
});

app.use('/users/:userId/movies', moviesController);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`The express app is ready on port ${port}!`);
});