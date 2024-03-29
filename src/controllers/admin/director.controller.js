const { Op } = require('sequelize');
const _ = require('lodash');

const {
  Director
} = require('../../models');

const controller = 'directors';
const VIEW_SHOW_PATH = 'admin/directors/view';
const VIEW_EDIT_PATH = 'admin/directors/edit';
const VIEW_ADD_PATH = 'admin/directors/add';

const DirectorController = module.exports;

DirectorController.get = async(req, res) => {
  const directorQueryName = req.query.name;

  const directors = await Director.findAll({
    where: {
      name: {
        [Op.like]: `%${directorQueryName}%`
      }
    },
    raw: true
  });

  const idAndNameOfDirectors = _.map(
    directors,
    (director) => ({ id: director.id, name: director.name })
  );

  return res.status(200).json(idAndNameOfDirectors);
};

DirectorController.list = async(req, res) => {
  const loginUser = req.currentUser;
  const directors = await Director.findAll({
    raw: true
  });

  const action = 'list';
  const data = directors;
  const errorData = {};

  res.render('admin/directors/list', {
    page_title: 'Admin - Dashboard',
    data,
    loginUser,
    controller,
    action,
    errorData,
  });
};

DirectorController.getById = async(req, res) => {
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
      const user = await Director.findByPk(userid);

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

DirectorController.updateById = async(req, res) => {
  try {
    const userId = req.params.id;
    const {
      name, dateOfBirth, description, nation
    } = req.body;

    await Director.update(
      {
        name, dateOfBirth, description, nation
      },
      {
        where: { id: userId },
      }
    );

    req.flash('success', 'Đạo diễn được cập nhật thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật Đạo diễn');
    res.redirect(`/admin/${controller}/list`);
  }
};

DirectorController.deleteById = async(req, res) => {
  try {
    const userId = req.params.id;

    await Director.destroy({
      where: { id: userId }
    });

    req.flash('success', 'Đạo diễn được xóa thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa Đạo diễn');
    res.redirect(`/admin/${controller}/list`);
  }
};

DirectorController.createNew = async(req, res) => {
  try {
    const {
      name, dateOfBirth, description, nation
    } = req.body;

    await Director.create(
      {
        name, dateOfBirth, description, nation
      }
    );

    req.flash('success', 'Đạo diễn được thêm thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm Đạo diễn');
    res.redirect(`/admin/${controller}/list`);
  }
};

