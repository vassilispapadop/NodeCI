jest.setTimeout(120000);
require('../models/User');

const mongoose = require('mongoose');
const keys = require('../config/keys');

//instruct to use NodeJs global promise object
//default doesn't do it
mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI, { useMongoClient: true });