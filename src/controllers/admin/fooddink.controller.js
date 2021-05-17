const {
  FoodDrink
} = require('../../models');

const controller = 'fooddrinks';
const VIEW_SHOW_PATH = 'admin/fooddrinks/view';
const VIEW_EDIT_PATH = 'admin/fooddrinks/edit';
const VIEW_ADD_PATH = 'admin/fooddrinks/add';

const FoodDrinkController = module.exports;

FoodDrinkController.list = async(req, res) => {
  const loginUser = req.currentUser;
  const fooddrinks = await FoodDrink.findAll({
    raw: true
  });

  const action = 'list';
  const data = fooddrinks;
  const errorData = {};

  res.render('admin/fooddrinks/list', {
    page_title: 'Admin - Dashboard',
    data,
    loginUser,
    controller,
    action,
    errorData,
  });
};

FoodDrinkController.getById = async(req, res) => {
  try {
    const fooddrinkId = req.params.id;
    const loginUser = req.currentUser;
    const { originalUrl } = req;

    let viewPath = '';
    let data = {};
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
      const foodDrink = await FoodDrink.findByPk(fooddrinkId);

      data = foodDrink;
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

FoodDrinkController.updateById = async(req, res) => {
  try {
    const fooddrinkId = req.params.id;
    const {
      name, price
    } = req.body;

    await FoodDrink.update(
      {
        name, price
      },
      {
        where: { id: fooddrinkId },
      }
    );

    req.flash('success', 'Bắp nước được cập nhật thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật Bắp nước');
    res.redirect(`/admin/${controller}/list`);
  }
};

FoodDrinkController.deleteById = async(req, res) => {
  try {
    const fooddrinkId = req.params.id;

    await FoodDrink.destroy({
      where: { id: fooddrinkId }
    });

    req.flash('success', 'Bắp nước được xóa thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa Bắp nước');
    res.redirect(`/admin/${controller}/list`);
  }
};

FoodDrinkController.createNew = async(req, res) => {
  try {
    const {
      name, price
    } = req.body;

    await FoodDrink.create(
      {
        name, price
      }
    );

    req.flash('success', 'Bắp nước được thêm thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm Bắp nước');
    res.redirect(`/admin/${controller}/list`);
  }
};

