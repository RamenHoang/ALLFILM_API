const { Op } = require('sequelize');
const _ = require('lodash');

const {
  Actor
} = require('../../models');

const controller = 'actors';
const VIEW_SHOW_PATH = 'admin/actors/view';
const VIEW_EDIT_PATH = 'admin/actors/edit';
const VIEW_ADD_PATH = 'admin/actors/add';

const ActorController = module.exports;

ActorController.get = async(req, res) => {
  const actorQueryName = req.query.name;

  const actors = await Actor.findAll({
    where: {
      name: {
        [Op.like]: `%${actorQueryName}%`
      }
    },
    raw: true
  });

  const idAndNameOfActors = _.map(
    actors,
    (actor) => ({ id: actor.id, name: actor.name })
  );

  return res.status(200).json(idAndNameOfActors);
};

ActorController.list = async(req, res) => {
  const loginUser = req.currentUser;
  const actors = await Actor.findAll({
    raw: true
  });

  const action = 'list';
  const data = actors;
  const errorData = {};

  res.render('admin/actors/list', {
    page_title: 'Admin - Dashboard',
    data,
    loginUser,
    controller,
    action,
    errorData,
  });
};

ActorController.getById = async(req, res) => {
  try {
    const userid = req.params.id;
    const loginUser = req.currentUser;
    const { originalUrl } = req;

    let viewPath = '';
    const data = { user: {} };
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
      const user = await Actor.findByPk(userid);

      data.user = user;
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

ActorController.updateById = async(req, res) => {
  try {
    const userId = req.params.id;
    const {
      name, dateOfBirth, description, nation
    } = req.body;

    await Actor.update(
      {
        name, dateOfBirth, description, nation
      },
      {
        where: { id: userId },
      }
    );

    req.flash('success', 'Diễn viên được cập nhật thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật Diễn viên');
    res.redirect(`/admin/${controller}/list`);
  }
};

ActorController.deleteById = async(req, res) => {
  try {
    const userId = req.params.id;

    await Actor.destroy({
      where: { id: userId }
    });

    req.flash('success', 'Diễn viên được xóa thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa Diễn viên');
    res.redirect(`/admin/${controller}/list`);
  }
};

ActorController.createNew = async(req, res) => {
  try {
    const {
      name, dateOfBirth, description, nation
    } = req.body;

    await Actor.create(
      {
        name, dateOfBirth, description, nation
      }
    );

    req.flash('success', 'Diễn viên được thêm thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm Diễn viên');
    res.redirect(`/admin/${controller}/list`);
  }
};

