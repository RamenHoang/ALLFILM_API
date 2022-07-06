const _ = require('lodash');
const bcrypt = require('bcrypt');

const { REGEX } = require('../../constants');
const {
  User, Role, Booking, FilmType, Film, Session, FoodDrink
} = require('../../models');
const jwtHelper = require('../../helpers/jwt.helper');
const cookieHelper = require('../../helpers/cookie.helper');

const AuthController = module.exports;
const controller = 'ticket-inspector';

function userIsTicketInspector(user) {
  const { Roles } = user;

  for (let i = 0; i < Roles.length; i++) {
    if (Roles[i].name === 'ticket-inspector') {
      return true;
    }
  }

  return false;
}

AuthController.login = async(req, res) => {
  try {
    console.log(1);
    let data = {};
    const errorData = {};

    const { token } = cookieHelper.getData(req, 'token');

    if (token) {
      const { id } = jwtHelper.verifyAccessToken(token);

      if (id) {
        const user = await User.findOne({
          where: { id },
          attributes: [],
          include: {
            model: Role,
            through: { attributes: [] }
          }
        });

        if (userIsTicketInspector(user)) {
          return res.redirect(`/${controller}/verify-booking`);
        }
      }
    }

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
          },
          include: {
            model: Role,
            through: {
              attributes: []
            },
            attributes: ['permition', 'entity']
          },
          attributes: ['id', 'passwordHash']
        });

        if (_.isNil(user)) {
          errorData.username = 'Tên đăng nhập không tồn tại';
        } else {
          const isMatchPassword = await bcrypt.compare(password, user.passwordHash);

          if (!isMatchPassword) {
            errorData.password = 'Mật khẩu không chính xác';
          } else {
            const payload = _.pick(user, ['id', 'Roles']);
            const accessToken = jwtHelper.generateAccessToken(payload);

            cookieHelper.storeData(res, { token: accessToken });

            return res.redirect(`/${controller}/verify-booking`);
          }
        }
      }
    }

    cookieHelper.deleteData(res, 'token');

    return res.render(
      `${controller}/login`,
      {
        page_title: 'Ticket Inspector - Login',
        data,
        errorData
      }
    );
  } catch (e) {
    cookieHelper.deleteData(res, 'token');

    return res.redirect(`/${controller}/verify-booking`);
  }
};

AuthController.verifyBooking = async(req, res, next) => {
  try {
    const action = 'login';

    const loginUser = req.currentUser;
    const errorData = {};

    res.render(
      `${controller}/verify-booking`,
      {
        page_title: 'Admin - verify-booking',
        loginUser,
        controller,
        action,
        errorData
      }
    );
  } catch (e) {
    next(e);
  }
};

AuthController.logout = async(req, res) => {
  try {
    cookieHelper.deleteData(res, 'token');

    res.redirect(`/${controller}/login`);
  } catch (e) {
    console.error(e);
  }
};
