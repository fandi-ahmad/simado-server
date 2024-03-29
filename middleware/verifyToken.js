const { verify, sign } = require('jsonwebtoken')
const { User } = require('../models')
const { getRefreshToken } = require('../controllers/userController')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(token == null) return res.sendStatus(401)
  verify(token, process.env.AUTH_ACCESS_TOKEN, (err, decode) => {
    if (err) return res.sendStatus(403)
    req.email = decode.email
    next()
  })
}

const addAuthorization = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken

  // Jika accessToken tidak ada
  if (!accessToken) {
    getRefreshToken
    // if(!refreshToken) return res.sendStatus(401)
    if(!refreshToken) return res.status(200).json({ status: 401, message: 'Unauthorized' })
    // if(!refreshToken) return res.redirect('/login')
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken
      }
    })
    if(!user[0]) return res.sendStatus(403)
    // if(!user[0]) return res.redirect('/login')
    verify(refreshToken, process.env.SIMADO_REFRESH_TOKEN, (err, decoded) => {
      if(err) return res.sendStatus(403)
      // if(err) return res.redirect('/login')
      const userId = user[0].id
      const userEmail = user[0].email
      const accessToken = sign({userId, userEmail}, process.env.SIMADO_ACCESS_TOKEN, {
        expiresIn: '30s'
      })

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 1000 * 30,
        secure: true,
        sameSite: 'none',
      })

    })
      
  }

  // Verifikasi accessToken
  verify(accessToken, process.env.AUTH_ACCESS_TOKEN, (err, decode) => {
    // if (err) res.status(403).json({ status: 403, message: 'access token invalid' });

    // Token valid, tambahkan header "Authorization" dengan token
    req.headers['Authorization'] = `Bearer ${accessToken}`;
    next();
  });

};

const checkAuthInLogin = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken

  // check refresh token ready or not in cookies
  if (refreshToken) {

    // get user from refresh token for check auth
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken
      }
    })

    // if user ready, generate access token and redirect to / (can't access /login)
    if (user[0]) {
      verify(refreshToken, process.env.SIMADO_REFRESH_TOKEN, (err, decoded) => {
        const userId = user[0].id
        const userEmail = user[0].email
        const accessToken = sign({userId, userEmail}, process.env.SIMADO_ACCESS_TOKEN, {
          expiresIn: '30s'
        })
  
        res.cookie('accessToken', accessToken, {
          httpOnly: true,
          maxAge: 1000 * 30,
          secure: true,
          sameSite: 'none',
        })
  
        res.json({ status: 200, message: 'refresh token ready' })
      })
    }
  }

  next()
}

module.exports = { verifyToken, addAuthorization, checkAuthInLogin }