const _ = require('lodash');
const bcrypt = require('bcrypt');

const { REGEX } = require('../../constants');
const { User } = require('../../models');

const AuthController = module.exports;
const controller = 'admin';

// eslint-disable-next-line consistent-return
AuthController.login = async(req, res, next) => {
  try {
    let data = {};
    const errorData = {};

    if (req.method === 'POST') {
      const { username, password } = req.body;

      if (!username.match(REGEX.USERNAME_ONLY)) {
        errorData.username = 'Tên đăng nhập phải có tối thiểu 5 kí tự';
      }
      if (!password.match(REGEX.PASSWORD)) {
        errorData.password = 'Mật khẩu tổi thiểu 8 kí tự: hoa, thường, đặc biệt và số';
      }

      if (!_.isEmpty(errorData)) {
        data = { username, password };
      } else {
        const user = await User.findOne({
          where: {
            username
          }
        });

        if (_.isNil(user)) {
          errorData.username = 'Tên đăng nhập không tồn tại';
        } else {
          const isMatchPassword = await bcrypt.compare(password, user.passwordHash);

          if (!isMatchPassword) {
            errorData.password = 'Mật khẩu không chính xác';
          } else {
            return res.redirect('/admin/dashboard');
          }
        }
      }
    }

    return res.render('admin/login', {
      page_title: 'Admin - Login',
      data,
      errorData
    });
  } catch (e) {
    next(e);
  }
};

AuthController.dashboard = async(req, res, next) => {
  try {
    const action = 'login';

    res.set('content-type', 'text/html; charset=mycharset');
    const data = {};
    const LoginUser = {};
    const errorData = {};

    res.render('admin/dashboard', {
      page_title: 'Admin - Dashboard',
      data,
      LoginUser,
      controller,
      action,
      errorData
    });
  } catch (e) {
    next(e);
  }
};
