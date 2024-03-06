const { User} = require('../models')
const { sign, verify } = require('jsonwebtoken')
const { genSalt, hash, compare } = require('bcrypt')


const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const cookiesnya = req.cookies
    const user = await User.findAll({
      where: {
        username: username
      }
    })

    console.log(cookiesnya, '<-- cookie');

    // console.log(user[0].dataValues, '<-- user ditemukan saat login');
    // console.log(user[0].dataValues.password, '<-- password user');
    // console.log(user[0].password, '<-- password');

    if (!user[0]) {
      return res.status(404).json({
        status: 404,
        message: 'username not found'
      });
    }

    const match = await compare(password, user[0].password)
    if(!match) return res.status(400).json({message: 'password is wrong'})


    const userUuid = user[0].uuid
    const userUsername = user[0].username

    const accessToken = sign({userUuid, userUsername}, process.env.SIMADO_ACCESS_TOKEN, {
      expiresIn: '30s'
    })

    const refreshToken = sign({userUuid, userUsername}, process.env.SIMADO_REFRESH_TOKEN, {
      expiresIn: '1d'
    })

    await User.update({refresh_token: refreshToken}, {
      where: { uuid: userUuid }
    })

    console.log(userUsername, '<-- username');
    console.log(userUuid, '<-- uuid user');
    console.log(accessToken, '<-- access token');
    console.log(refreshToken, '<-- refresh token');


    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 30,
      secure: true,
      sameSite: 'none',
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: 'none',
      // signed: true
    })

    res.header('Access-Control-Allow-Credentials', true);

    res.json({
      status: 200,
      message: 'login successfully',
    })

  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- error login');
  }
}

const getRefreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken

    if(!refreshToken) return res.sendStatus(401)

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken
      }
    })

    if(!user) return res.sendStatus(403)

    verify(refreshToken, process.env.SIMADO_REFRESH_TOKEN, (err, decoded) => {
      if(err) return res.sendStatus(403)
      
      const userUuid = user.uuid
      const userUsername = user.username
      const accessToken = sign({userUuid, userUsername}, process.env.SIMADO_ACCESS_TOKEN, {
        expiresIn: '30s'
      })

      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 1000 * 30,
        secure: true,
        sameSite: 'none',
      })

      res.json({
        status: 200,
      })
    })

  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- error get refresh token');
  }
}

const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await User.findAll({
      where: {
        refresh_token: refreshToken
      }
    })
    if(!user[0]) return res.sendStatus(204)
    const userId = user[0].id
    await User.update({refresh_token: null}, {
      where: {id: userId}
    })
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')
    return res.status(200).json({ status: 200, message: 'logout successfully' })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- error logout');
  }
}

module.exports = { loginUser, getRefreshToken }