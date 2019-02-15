const express = require('express');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

require('./models/User');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());

require('./routes/authRouteGoogle')(app);
require('./routes/authRouteFacebook')(app);
require('./routes/authRouteGithub')(app);
require('./routes/authRouteLinkedin')(app);
require('./routes/authRouteLocal')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port`, PORT);
});