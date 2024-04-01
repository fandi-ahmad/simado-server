const { User} = require('../models')
const { sign, verify } = require('jsonwebtoken')
const { compare } = require('bcrypt')
const { errorJSON, resJSON } = require('../repository/resJSON.js')


const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({
      where: {
        username: username
      }
    })

    if (!user) return errorJSON(res, 'Username atau password salah!', 406)
     
    const match = await compare(password, user.password)
    // password salah
    if(!match) return errorJSON(res, 'Username atau password salah!', 406)

    const userId = user.id
    const userUsername = user.username

    const accessToken = sign({userId, userUsername}, process.env.SIMADO_ACCESS_TOKEN, {
      expiresIn: '30s'
    })

    const refreshToken = sign({userId, userUsername}, process.env.SIMADO_REFRESH_TOKEN, {
      expiresIn: '1d'
    })

    await User.update({refresh_token: refreshToken}, {
      where: { id: userId }
    })

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 1000 * 30,
      secure: true,
      sameSite: 'strict',
    })

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: 'strict',
      // signed: true
    })

    res.header('Access-Control-Allow-Credentials', true);

    res.json({
      status: 200,
      message: 'login successfully',
    })

  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error login');
  }
}

const getUserLogin = async (req, res) => {
  try {
    if (req.cookies.refreshToken) {
      const refreshToken = req.cookies.refreshToken
      const user = await User.findOne({
        attributes: ['id', 'username', 'role'],
        where: {
          refresh_token: refreshToken
        }
      })
  
      if (!user) {
        // user by refresh_token tidak ditemukan
        return errorJSON(res, 'Belum melakukan login!', 406)
      } else {
        return resJSON(res, user)
      }
    } else {
      // tidak ada refreshToken dari cookies
      return errorJSON(res, 'Belum melakukan login!', 406)
    }

  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error get user login');
  }
}

const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(204)
    const user = await User.findOne({
      where: {
        refresh_token: refreshToken
      }
    })
    if(!user) return res.sendStatus(204)
    const userId = user.id
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

module.exports = { loginUser, getUserLogin, logoutUser }