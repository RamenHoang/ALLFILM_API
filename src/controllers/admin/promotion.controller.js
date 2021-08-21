const { Op } = require('sequelize');
const _ = require('lodash');
const { generateRandomString } = require('../../helpers/string.helper');

const {
  Promotion
} = require('../../models');

const controller = 'promotions';
const VIEW_SHOW_PATH = 'admin/promotions/view';
const VIEW_EDIT_PATH = 'admin/promotions/edit';
const VIEW_ADD_PATH = 'admin/promotions/add';

const PromotionController = module.exports;

PromotionController.get = async(req, res) => {
  const actorQueryName = req.query.name;

  const promotion = await Promotion.findAll({
    where: {
      name: {
        [Op.like]: `%${actorQueryName}%`
      }
    },
    raw: true
  });

  const idAndNameOfpromotion = _.map(
    promotion,
    (actor) => ({ id: actor.id, name: actor.name })
  );

  return res.status(200).json(idAndNameOfpromotion);
};

PromotionController.list = async(req, res) => {
  const loginUser = req.currentUser;
  const promotion = await Promotion.findAll({
    raw: true
  });

  const action = 'list';
  const data = promotion;
  const errorData = {};

  res.render('admin/promotions/list', {
    page_title: 'Admin - Dashboard',
    data,
    loginUser,
    controller,
    action,
    errorData,
  });
};

PromotionController.getById = async(req, res) => {
  try {
    const promotionId = req.params.id;
    const loginUser = req.currentUser;
    const { originalUrl } = req;

    let viewPath = '';
    const data = { promotion: {} };
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
      const promotion = await Promotion.findByPk(promotionId);

      data.promotion = promotion;
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

PromotionController.updateById = async(req, res) => {
  try {
    const promotionId = req.params.id;
    const {
      name, image, content
    } = req.body;

    await Promotion.update(
      {
        name, image, content
      },
      {
        where: { id: promotionId },
      }
    );

    req.flash('success', 'Ưu đãi được cập nhật thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật ưu đãi');
    res.redirect(`/admin/${controller}/list`);
  }
};

PromotionController.deleteById = async(req, res) => {
  try {
    const promotionId = req.params.id;

    await Promotion.destroy({
      where: { id: promotionId }
    });

    req.flash('success', 'Ưu đãi được xóa thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa ưu đãi');
    res.redirect(`/admin/${controller}/list`);
  }
};

PromotionController.createNew = async(req, res) => {
  try {
    const {
      name, image, content
    } = req.body;

    let promotion = null;
    let id = null;

    do {
      id = generateRandomString();
      // eslint-disable-next-line no-await-in-loop
      promotion = await Promotion.findByPk(id);
    } while (promotion);

    await Promotion.create(
      {
        id, name, image, content
      }
    );

    req.flash('success', 'Ưu đãi được thêm thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm ưu đãi');
    res.redirect(`/admin/${controller}/list`);
  }
};

