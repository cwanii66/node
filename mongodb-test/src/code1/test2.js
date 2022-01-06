const MongodbClient = require('mongodb').MongoClient;

// connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'myblog';

// get Mongoclient instance
const mongoClient = new MongodbClient(
    url,
    {
        useUnifiedTopology: true
    }
);

const main = async function() {
    // use connect method to connect to the server
    mongoClient.connect(); // params ?
    console.log('mongodb connect success');

    const db = mongoClient.db(dbName); // check out to collection
    const blogscollection = db.collection('users'); // locate document
    // the following, we could manage document of collection ...
    // database => collection => document

    // select
    blogscollection.find({
        username: 'rose',
        password: '123'
    }).toArray((err, result) => {
        if (err) {
            console.log('users find error: ', err);
            return;
        }
        console.log(result);
        
        mongoClient.close();
    });
    // blogscollection.insertMany([
    //     {
    //         info: {
    //             test: 'test2',
    //             author: 'null'
    //         }
    //     }
    // ]);

    return 'db done';
};

main()
    .then(console.log)
    .catch(console.error);
