const MongodbClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'myblog';

MongodbClient.connect(
    url,
    {
        // config
    },
    (err, client) => {
        if (err) {
            console.error('mongodb connect error', err);
            return;
        }
        console.log('mongodb connect success');

        // 切换到数据库( 'use myblog' );
        const db = client.db(dbName);

        // 关闭连接
        client.close();
    }
);