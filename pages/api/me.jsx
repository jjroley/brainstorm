export default function handler(req, res) {
  
  if(req.headers['x-replit-user-id']) {
    res.json({
      name: req.headers['x-replit-user-name'],
      id: req.headers['x-replit-user-id']
    })
  }else {
    res.json({ error: 'You aren\'t logged in.' })
  }
} 