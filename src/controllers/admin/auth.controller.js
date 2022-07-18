const _ = require('lodash');
const bcrypt = require('bcrypt');

const { REGEX } = require('../../constants');
const {
  User, Role, Booking, FilmType, Film, Session, FoodDrink
} = require('../../models');
const jwtHelper = require('../../helpers/jwt.helper');
const cookieHelper = require('../../helpers/cookie.helper');

const AuthController = module.exports;
const controller = 'admin';

function userIsAdmin(user) {
  const { Roles } = user;

  for (let i = 0; i < Roles.length; i++) {
    if (Roles[i].name === 'admin') {
      return true;
    }
  }

  return false;
}

// eslint-disable-next-line consistent-return
AuthController.login = async(req, res) => {
  try {
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

        if (userIsAdmin(user)) {
          return res.redirect('/admin/dashboard');
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

            return res.redirect('/admin/dashboard');
          }
        }
      }
    }

    cookieHelper.deleteData(res, 'token');

    return res.render('admin/login', {
      page_title: 'Admin - Login',
      data,
      errorData
    });
  } catch (e) {
    cookieHelper.deleteData(res, 'token');

    return res.redirect('/admin/dashboard');
  }
};

AuthController.dashboard = async(req, res, next) => {
  try {
    const action = 'login';

    const rawData = JSON.parse(JSON.stringify(await Booking.findAll({
      include: [
        {
          model: Session,
          include: [
            {
              model: Film,
              include: {
                model: FilmType,
                through: {
                  attributes: []
                }
              }
            }
          ]
        },
        {
          model: FoodDrink,
          through: {
            attributes: []
          }
        }
      ]
    })));

    const data = {
      totalMoney: 0,
      foodDrinks: {},
      filmTypes: {}
    };

    if (rawData) {
      rawData.forEach((booking) => {
        data.totalMoney += booking.fee;

        booking.FoodDrinks.forEach(({ name }) => {
          if (data.foodDrinks[name]) {
            data.foodDrinks[name]++;
          } else {
            data.foodDrinks[name] = 1;
          }
        });

        booking.Session.Film.FilmTypes.forEach(({ name }) => {
          if (data.filmTypes[name]) {
            data.filmTypes[name]++;
          } else {
            data.filmTypes[name] = 1;
          }
        });
      });
    }

    data.totalMoney = new Intl
      .NumberFormat(
        'vi-VN',
        {
          style: 'currency',
          currency: 'VND'
        }
      )
      .format(data.totalMoney);

    const loginUser = req.currentUser;
    const errorData = {};

    res.render('admin/dashboard', {
      page_title: 'Admin - Dashboard',
      data,
      loginUser,
      controller,
      action,
      errorData
    });
  } catch (e) {
    next(e);
  }
};

AuthController.logout = async(req, res) => {
  try {
    cookieHelper.deleteData(res, 'token');

    res.redirect('/admin/login');
  } catch (e) {
    console.error(e);
  }
};
