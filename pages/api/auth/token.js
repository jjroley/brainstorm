import jwt from 'jsonwebtoken';
import nextConnect from 'next-connect'
import { Limiter } from '../../../script/spamBlocker'

const app = nextConnect();

app.use(Limiter(1000 * 60 * 60, 4, (req, res) => {
  // we do something
}));

app.get((req, res) => {
  const id = req.headers['x-replit-user-id'];
  const name = req.headers['x-replit-user-name'];

  if (!id || !name) {
    return res.json({
      error: 'You need to be authentificated.'
    });
  }

  const token = jwt.sign({
    id: id,
    name: name
  }, process.env.JWT_KEY, {
    expiresIn: '24h'
  });

  console.log('I\'ve created a new token!')
  
  // we return the token
  return res.json({
    token: token
  })
});

export default app;