const redis = require('redis');

function createRedisClient() {
    // Check if required environment variables are set
    if (!process.env.REDISHOST || !process.env.REDISPORT) {
        throw new Error('Redis host and port are not specified in environment variables.');
    }

    // Create Redis client with options
    const redisClient = redis.createClient({
        host: process.env.REDISHOST,
        port: parseInt(process.env.REDISPORT, 10),
        // Add other options as needed:
        // e.g., password, TLS/SSL options, connection retry strategy, etc.
    });

    // Handle Redis client errors
    redisClient.on('error', err => {
        console.error('Redis connection error:', err);
        // You might want to handle this error, e.g., attempt to reconnect or log it somewhere
    });

    // Return the Redis client
    return redisClient;
}

module.exports = createRedisClient;