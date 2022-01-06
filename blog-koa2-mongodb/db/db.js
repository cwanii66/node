const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'myblog';

// mongoose.set('useFindAndModify', false);

mongoose.connect(`${url}/${dbName}`, {
    // some config
});

const db = mongoose.connection;

db.on('error', err => {
    console.error(err);
});

// db.once('open', () => {
//     console.log('mongoose connect success ...');
// });

module.exports = mongoose;