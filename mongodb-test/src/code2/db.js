const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'myblog';

(async () => {
    // Once connected, the open event is fired on the Connection instance.
    // If you're using mongoose.connect, the Connection is mongoose.connection. 
    // Otherwise, mongoose.createConnection return value is a Connection.
    mongoose.connect(
        `${url}/${dbName}`, 
        {
            // config
        }
    );
    const db = mongoose.connection;
    db.on('error', err => console.error(err));
    db.once('open', () => {
        console.log('mongoose connect success...');
    });
})();