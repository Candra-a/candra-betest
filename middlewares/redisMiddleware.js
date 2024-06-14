const createRedisClient = require('../config/redis');

const redisClient = createRedisClient();

// Close redis connection when the server stop
function closeRedisConnectionMiddleware(req, res, next) {
    process.on('SIGINT', () => {
        redisClient.quit();
        console.log('The Redis connection was closed.');
        
        process.exit();
    });
    
    next();
}

module.exports = closeRedisConnectionMiddleware;