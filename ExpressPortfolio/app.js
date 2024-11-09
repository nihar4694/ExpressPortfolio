const express = require('express'); // Import Express
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Initialize the app
const app = express();

// Import routes
const indexRouter = require('./routes/index'); // Path should point to the correct router file

// Serve static files (CSS, JS, images) from the public directory
  app.use(express.static(path.join(__dirname, 'public')));


// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter); // Attach the indexRouter to the app
// app.use('/users', usersRouter); // Uncomment if there's a `usersRouter`

// Error handling and exporting app
app.use((req, res, next) => {
  res.status(404).render('error', { message: 'Page not found' });
});

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Page Not Found');
  err.status = 404;
  next(err);
});

// Error handler middleware
app.use((err, req, res, next) => {
  // Set error message and error stack only in development mode
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page with a status (500 if not specified)
  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;
