const _ = require('lodash');

const {
  Room, Cinema
} = require('../../models');

const RoomController = module.exports;

const controller = 'rooms';
const VIEW_SHOW_PATH = 'admin/rooms/view';
const VIEW_EDIT_PATH = 'admin/rooms/edit';
const VIEW_ADD_PATH = 'admin/rooms/add';

function roomMapper(room) {
  if (_.isNil(room)) return {};

  return {
    id: room.id,
    name: room.name,
    row: room.row,
    column: room.col,
    cinema: { id: room.Cinema.id, name: room.Cinema.name }
  };
}

RoomController.list = async(req, res) => {
  try {
    const loginUser = req.currentUser;
    const rooms = await Room.findAll({
      attributes: ['id', 'name', 'row', 'col'],
      include: {
        model: Cinema
      }
    });

    const action = 'list';
    const data = _.map(rooms, roomMapper);
    const errorData = {};

    res.render('admin/rooms/list', {
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

RoomController.getById = async(req, res) => {
  try {
    const roomId = req.params.id;
    const loginUser = req.currentUser;
    const { originalUrl } = req;

    let viewPath = '';
    const systemCinemas = await Cinema.findAll({ raw: true });
    const data = { systemCinemas, room: {} };
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
      const room = await Room.findByPk(roomId, {
        attributes: ['id', 'name', 'row', 'col'],
        include: {
          model: Cinema
        }
      });

      data.room = roomMapper(room);
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

RoomController.updateById = async(req, res) => {
  try {
    const filmId = req.params.id;
    const {
      name, row, column, cinemaId
    } = req.body;

    await Room.update(
      {
        name, row, col: column, cinemaId
      },
      {
        where: { id: filmId }
      }
    );

    req.flash('success', 'Phòng chiếu được cập nhật thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật Phòng chiếu');
    res.redirect(`/admin/${controller}/list`);
  }
};

RoomController.deleteById = async(req, res) => {
  try {
    const roomId = req.params.id;

    await Room.destroy({
      where: { id: roomId }
    });

    req.flash('success', 'Phòng chiếu được xóa thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa Phòng chiếu');
    res.redirect(`/admin/${controller}/list`);
  }
};

RoomController.createNew = async(req, res) => {
  try {
    const {
      name, row, column, cinemaId
    } = req.body;

    await Room.create(
      {
        // eslint-disable-next-line quote-props
        name, row, col: column, cinemaId
      }
    );

    req.flash('success', 'Phòng chiếu được thêm thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm Phòng chiếu');
    res.redirect(`/admin/${controller}/list`);
  }
};
