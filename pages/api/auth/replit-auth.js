import { getUser } from '../../../script/getUser'

function handler(req, res) {
  res.json(getUser(req.headers))
}

export default handler