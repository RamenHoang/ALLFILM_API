const _ = require('lodash');

const {
  Room, Cinema, Session, Film, Booking
} = require('../../models');

const SessionController = module.exports;

const controller = 'sessions';
const START_TIME = '08:00';
const END_TIME = '23:00';
const VIEW_SHOW_PATH = 'admin/sessions/view';
const VIEW_EDIT_PATH = 'admin/sessions/edit';
const VIEW_ADD_PATH = 'admin/sessions/add';

function timeMapper(fullyTime) {
  if (_.isNil(fullyTime)) return '';

  return fullyTime.split(' ')[1].slice(0, 5);
}

function sessionMapper(session) {
  if (_.isNil(session)) return {};

  const bookedSeatsQuantity = _.isNil(session.bookedSeats) ? 0 : session.bookedSeats.split(',').length;
  const totalSeats = (+session.Room.row) * (+session.Room.col);

  return {
    id: session.id,
    price: new Intl
      .NumberFormat(
        'vi-VN',
        {
          style: 'currency',
          currency: 'VND'
        }
      )
      .format(session.price),
    date: session.date,
    startTime: timeMapper(session.startTime),
    endTime: timeMapper(session.endTime),
    cinema: {
      id: session.Cinema.id,
      name: session.Cinema.name
    },
    room: {
      id: session.Room.id,
      name: session.Room.name
    },
    film: {
      id: session.Film.id,
      name: session.Film.name,
      duration: session.Film.duration
    },
    bookedSeats: `${bookedSeatsQuantity}/${totalSeats}`
  };
}

function generateEmptySeats(row, col) {
  let seats = '';

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      seats += `${String.fromCharCode(65 + i)}-${j},`;
    }
  }

  return seats.slice(0, seats.length - 1);
}

SessionController.get = async(req, res) => {
  try {
    const { date, cinemaId, roomId } = req.query;

    const scheduledTimes = await Session.findAll({
      where: {
        date, cinemaId, roomId
      },
      attributes: ['startTime', 'endTime'],
      order: [['startTime', 'ASC']],
      raw: true
    });

    res.status(200).json(_.map(scheduledTimes, (time) => ({
      startTime: timeMapper(time.startTime),
      endTime: timeMapper(time.endTime)
    })));
  } catch (e) {
    console.error(e);
  }
};

SessionController.list = async(req, res) => {
  try {
    const loginUser = req.currentUser;
    const sessions = await Session.findAll({
      attributes: ['id', 'date', 'startTime', 'endTime', 'price', 'bookedSeats'],
      include: [
        {
          model: Cinema,
          attributes: ['id', 'name']
        },
        {
          model: Room,
          attributes: ['id', 'name', 'row', 'col']
        },
        {
          model: Film,
          attributes: ['id', 'name']
        }
      ]
    });

    const action = 'list';
    const data = _.map(sessions, sessionMapper);
    const errorData = {};

    res.render('admin/sessions/list', {
      page_title: 'Admin - Dashboard',
      data,
      loginUser,
      controller,
      action,
      errorData,
    });
  } catch (e) {
    console.error(e);
  }
};

SessionController.getById = async(req, res) => {
  try {
    const sessionId = req.params.id;
    const loginUser = req.currentUser;
    const { originalUrl } = req;

    let viewPath = '';
    const data = { session: {} };
    const errorData = {};
    let action;

    if (originalUrl.indexOf('edit') !== -1) {
      viewPath = VIEW_EDIT_PATH;
      action = 'edit';
    } else if (originalUrl.indexOf('add') !== -1) {
      viewPath = VIEW_ADD_PATH;
      action = 'add';
    } else {
      viewPath = VIEW_SHOW_PATH;
      action = 'show';
    }

    if (viewPath !== VIEW_ADD_PATH) {
      const session = await Session.findByPk(sessionId, {
        attributes: ['id', 'date', 'startTime', 'endTime', 'price', 'bookedSeats'],
        include: [
          {
            model: Cinema,
            attributes: ['id', 'name']
          },
          {
            model: Room,
            attributes: ['id', 'name', 'row', 'col']
          },
          {
            model: Film,
            attributes: ['id', 'name', 'duration']
          }
        ],
        raw: true,
        nest: true
      });

      data.session = sessionMapper(session);

      const scheduledTimes = await Session.findAll({
        where: {
          cinemaId: data.session.cinema.id,
          roomId: data.session.room.id,
          date: data.session.date
        },
        attributes: ['startTime', 'endTime'],
        order: [['startTime', 'ASC']],
        raw: true,
      });

      data.scheduledTimes = _.map(scheduledTimes, (fullyTimeObject) => ({
        startTime: timeMapper(fullyTimeObject.startTime),
        endTime: timeMapper(fullyTimeObject.endTime)
      }));
      data.startTime = START_TIME;
      data.endTime = END_TIME;
    }

    res.render(viewPath, {
      page_title: 'Admin - Dashboard',
      controller,
      loginUser,
      data,
      action,
      errorData
    });
  } catch (e) {
    console.error(e);
  }
};

SessionController.updateById = async(req, res) => {
  try {
    const sessionId = req.params.id;
    const {
      cinemaId, filmId, roomId, date, startTime, endTime, price
    } = req.body;

    await Session.update(
      {
        cinemaId,
        filmId,
        roomId,
        date,
        startTime: `${date} ${startTime}:00`,
        endTime: `${date} ${endTime}:00`,
        price
      },
      {
        where: { id: sessionId }
      }
    );

    req.flash('success', 'Suất chiếu được cập nhật thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật Suất chiếu');
    res.redirect(`/admin/${controller}/list`);
  }
};

SessionController.deleteById = async(req, res) => {
  try {
    const sessionId = req.params.id;

    const bookingSessions = await Booking.findOne({ sessionId });

    if (bookingSessions) {
      req.flash('error', 'Không thể xóa Suất chiếu vì đã có vé được đặt');
      res.redirect(`/admin/${controller}/list`);

      return;
    }

    await Session.destroy({
      where: { id: sessionId }
    });

    req.flash('success', 'Suất chiếu được xóa thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa Suất chiếu');
    res.redirect(`/admin/${controller}/list`);
  }
};

SessionController.createNew = async(req, res) => {
  try {
    const {
      cinemaId, filmId, roomId, date, startTime, endTime, price
    } = req.body;

    const room = await Room.findByPk(roomId, { raw: true });

    await Session.create(
      {
        cinemaId,
        filmId,
        roomId,
        date,
        startTime: `${date} ${startTime}:00`,
        endTime: `${date} ${endTime}:00`,
        emptySeats: generateEmptySeats(room.row, room.col),
        price
      }
    );

    req.flash('success', 'Suất chiếu được thêm thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm Suất chiếu');
    res.redirect(`/admin/${controller}/list`);
  }
};
