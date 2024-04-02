const { verify, sign } = require('jsonwebtoken')
const { User } = require('../models')

const verificationToken = async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies

  // Jika accessToken tidak ada
  if (!accessToken) {
    if(!refreshToken) return res.status(200).json({ status: 401, message: 'Unauthorized' })
    // if(!refreshToken) return res.redirect('/login')
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken
      }
    })
    if(!user[0]) return res.sendStatus(403)
    verify(refreshToken, process.env.SIMADO_REFRESH_TOKEN, (err, decoded) => {
      if(err) return res.sendStatus(403)
      const userId = user[0].id
      const userUsername = user[0].username
      const accessToken = sign({userId, userUsername}, process.env.SIMADO_ACCESS_TOKEN, {
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
  verify(accessToken, process.env.SIMADO_ACCESS_TOKEN, (err, decode) => {
    // if (err) res.status(403).json({ status: 403, message: 'access token invalid' });

    // Token valid, tambahkan header "Authorization" dengan token
    req.headers['Authorization'] = `Bearer ${accessToken}`;
    next();
  });

};

const checkAuthInLogin = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken
  console.log(refreshToken, '<-- resfresh token dari cookie, dari fungsi checkAuthInLogin');
  console.log(req.cookies, '<-- semua cookies');

  // check refresh token ready or not in cookies
  if (refreshToken) {

    // get user from refresh token for check auth
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken
      }
    })

    // if user ready, generate access token and redirect to / (can't access /login)
    if (user) {
      verify(refreshToken, process.env.SIMADO_REFRESH_TOKEN, (err, decoded) => {
        const userId = user.id
        const userUsername = user.username
        const accessToken = sign({userId, userUsername}, process.env.SIMADO_ACCESS_TOKEN, {
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

module.exports = { checkAuthInLogin, verificationToken }