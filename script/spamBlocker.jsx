import RateLimit from 'express-rate-limit'
import requestIp from 'request-ip'

// Inspired from: https://replit.com/@nathanTi/replverse#scripts/util.js
// https://www.npmjs.com/package/express-rate-limit
export function Limiter (time, max, handler) {
  return RateLimit({
    windowMs: time,// time before enable the client to do 
    max: max,// limit to n requests per client
    handler: (req, res) => {
      if (handler) handler(req, res);
      res
        .json({
          error: 'Too many requests have been done - please try again later.'
        });
    },
    keyGenerator: (req) => {
      // we set the client's IP, but we could also set the id of a user as key
      return requestIp.getClientIp(req);
    }
  })
}