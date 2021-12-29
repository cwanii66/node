const redis = require('redis');

// 创建客户端
(async () => {
    const redisClient = redis.createClient(6379, '127.0.0.1');
    redisClient.on('error', err => {
        console.error(err);
    });
    await redisClient.connect();
    // 测试
    await redisClient.set('myname', 'Jack', redis.print);
    const value = await redisClient.get('myname');
    console.log('value ', value);

    // 退出
    await redisClient.quit();
})();
