const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');

require('./models/User');
require('./client/src/setupProxy');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/router')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});