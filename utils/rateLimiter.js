const rateLimiter = require("express-rate-limit");
const MongoStore = require('rate-limit-mongo');

module.exports = (timeframeInMinutes, rateLimit) => rateLimiter({
    store: new MongoStore({
        uri: process.env.MONGO_URI,
        expireTimeMs: timeframeInMinutes * 1000,
        errorHandler: (e) => {
            console.error(e);
    
            process.exit(0)
        }
    }),
    windowMs: timeframeInMinutes * 1000,
    max: rateLimit,
    message: `You made too many requests. Please try again in ${timeframeInMinutes} minutes.`
});
