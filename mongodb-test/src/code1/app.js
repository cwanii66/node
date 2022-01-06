const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'myblog';
const client = new MongoClient(url);


async function main() {
    // use connect method to connect to the server
    await client.connect();
    console.log('connected successfully to server');
    const db = client.db(dbName); // use <dbName>
    const collection = db.collection('users');

    // the following code examples can be pased here... => manipulate collection
    // for example: 
    const insertResult = await collection.insertMany([{a: 1}, {a: 2}, {a: 3}]);
    console.log('Insert documents => ', insertResult);

    return 'done';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());