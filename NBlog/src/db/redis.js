const redis = require('redis');
const { REDIS_CONFIG } = require('../config/db');

const redisClient = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);
redisClient.on('error', err => console.error('Redis Client Error', err));
redisClient.connect();

const set = function(key, value) {
    // Set key value 必须是字符串
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    redisClient.set(key, value, redis.print);
};

const get = async function(key) {
    const value = await redisClient.get(key)
                            .catch(e => console.error(e));
    
    try {
        JSON.parse(value);
    } catch(e) {
        console.log('parse error: can not parse value')
    }
    return value;
};

module.exports = {
    set,
    get
}

