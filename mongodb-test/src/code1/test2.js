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

// put all of async manipulation into try/catch/finally block
    // make sure async function executing...
const main = async function() {
    // use connect method to connect to the server
    mongoClient.connect(); // params ?
    console.log('mongodb connect success');

    const db = mongoClient.db(dbName); // check out to collection
    const blogscollection = db.collection('users'); // locate document
    // the following, we could manage document of collection ...
    // database => collection => document
    try {
        // add
        // const insertMsg = await blogscollection.insertOne({
        //     username: 'chriswong',
        //     password: 123,
        //     realname: 'cwluvani'
        // }).catch( e => console.log(e) );
        // console.log(insertMsg);

        // altar
        // const updateMsg = await blogscollection.updateMany({ // 查询条件 => 支持各种complex query
        //     username: 'chriswong',
        //     realname: 'cwluvani'
        // }, {
        //     $set: { // 修改
        //         username: 'cwluvani',
        //         realname: 'chriswong'
        //     }
        // }).catch( e => console.error(e) );
        // console.log(updateMsg);

        // delete
        // const deleteMsg = await blogscollection.deleteOne({
        //     password: 123
        // }).catch( e => console.log(e) );
        // console.log(deleteMsg);

        // select
        const selectMsg = await blogscollection.find({
            password: 123
        }).toArray()
            .catch( e => console.error(e) );
        console.log(selectMsg);
        
    } catch( err ) {
        console.error(err);
    }

    mongoClient.close();

    return 'db done';
};

main()
    .then(console.log)
    .catch(console.error);
