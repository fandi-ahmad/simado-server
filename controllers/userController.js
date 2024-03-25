const { User, Sequelize } = require('../models')
const { v4: uuidv4 } = require('uuid')
const { sign, verify } = require('jsonwebtoken')
const { genSalt, hash, compare } = require('bcrypt')
const { Op } = require('sequelize')
const { errorJSON, resJSON } = require('../repository/resJSON.js')
const { deleteData } = require('../repository/crudAction.js')

const getAllUser = async (req, res) => {
  try {
    const user = await User.findAll()
    res.json({ status: 200, data: user })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- get all user register');
  }
}

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const randomUUID = uuidv4();

    const timeNow = new Date()
    timeNow.setHours(timeNow.getHours() + 8);

    const user = await User.findAll({
      where: { username: username }
    })
    
    if (user[0]) {
      // check if email is available in database
      res.status(422).json({
        status: 422,
        message: 'username tidak tersedia',
      })
    } else {
      // check password minimal 8 chacarter, 1 uppercase, 1 lowercase, 1 number, and 1 symbol
      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
      // if (!passwordRegex.test(password)) {
      //   return res.status(400).json({ status: 400, message: 'Password harus minimal 8 karakter, memiliki setidaknya 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 karakter simbol seperti @$!%*?&#' });
      // } else {
       
      // }
      // generate account
      const salt = await genSalt()
      const hashPassword = await hash(password, salt)

      await User.create({
        id: randomUUID,
        password: hashPassword,
        username: username,
        createdAt: timeNow,
        updateAt: timeNow
      })

      res.status(200).json({
        status: 200,
        message: 'register successfully',
      })
    }
} catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- error register');
  }
}

const updateUser = async (req, res) => {
  try {
    const { id, password, username, new_password }  = req.body

    // const refreshToken = req.cookies.refreshToken

    // await User.update({ username: username }, {
    //   where: {
    //     refresh_token: refreshToken
    //   }
    // })
   

    // jika ada password yang diperbarui
    if (password) {
      const userByUuid = await User.findOne({
        where: { id: id }
      })

      if (userByUuid) {

        // membandingkan password lama dengan yang di database
        const match = await compare(password, userByUuid.password)
  
        if (!match) {
          // password tidak sesuai
          return errorJSON(res, 'username or password is wrong', 400)
        } else {
          const salt = await genSalt()
          const hashPassword = await hash(new_password, salt)
  
          await User.update({ username: username, password: hashPassword }, {
            where: {
              id: id
            }
          })
        }
      } else {
        return errorJSON(res, 'data is not found', 400)
      }

    // jika tidak memperbarui password baru
    } else {
      await User.update({ username: username }, {
        where: {
          id: id
        }
      })
    }

    resJSON(res)
  } catch (error) {
    errorJSON(res)
    console.log(error, '<-- error update user');
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params

    const data = await deleteData(User, id)
    if (!data) return errorJSON(res, 'data is not found', 404);

    resJSON(res, '', 'delete user successfully')
  } catch (error) {
    errorJSON(res)
  }
}

const getUser = async (req, res) => {
  try {
    const { username, uuid } = req.body

    // const user = await User.findAll({
    //   where: { uuid: uuid }
    // })

    const user = await User.findAll({
      where: {
        email: {
          [Op.like]: `%${username}%`
        }
      }
    })

    res.status(200).json({
      status: 200,
      data: user
    })
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- error get user');
  }
}

const getUserLogin = async (req, res) => {
  const refreshToken = req.cookies.refreshToken

  try {
    const user = await User.findAll({
      attributes: ['uuid', 'email', 'username'],
      where: {
        refresh_token: refreshToken
      }
    })
    const userProfile = await User_profile.findAll({
      attributes: ['profile_picture'],
      where: {
        uuid_user: user[0].uuid
      }
    })

    const data = {
      uuid: user[0].uuid,
      email: user[0].email,
      username: user[0].username,
      profile_picture: userProfile[0].profile_picture
    }

    return res.status(200).json({ status: 200, message: 'ok', data: data })

  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
    console.log(error, '<-- error get user login');
  }
}


module.exports = { createUser, getAllUser, updateUser, deleteUser }