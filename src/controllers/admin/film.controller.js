const _ = require('lodash');
const { Op } = require('sequelize');

const {
  Film, FilmType, masterDB, FilmHasType, FilmActor, Director, Actor
} = require('../../models');

const FilmController = module.exports;

const controller = 'films';
const VIEW_SHOW_PATH = 'admin/films/view';
const VIEW_EDIT_PATH = 'admin/films/edit';
const VIEW_ADD_PATH = 'admin/films/add';

function filmMapper(film) {
  if (_.isNil(film)) return {};

  return {
    id: film.id,
    name: film.name,
    subName: film.subName,
    publishDate: film.publishDate,
    trailer: film.trailer,
    poster: film.poster,
    nation: film.nation,
    description: film.description,
    duration: film.duration,
    types: _.map(film.FilmTypes, (filmType) => filmType.id),
    actors: _.map(film.Actors, (actor) => ({ id: actor.id, name: actor.name })),
    director: { id: film.Director.id, name: film.Director.name }
  };
}

FilmController.get = async(req, res) => {
  const filmQueryName = req.query.name;

  const films = await Film.findAll({
    where: {
      name: {
        [Op.like]: `%${filmQueryName}%`
      }
    },
    attributes: ['id', 'name', 'duration'],
    raw: true
  });

  res.status(200).json(_.map(films, (film) => ({
    id: film.id,
    name: film.name,
    duration: film.duration
  })));
};

FilmController.list = async(req, res) => {
  try {
    const loginUser = req.currentUser;
    const films = await Film.findAll({
      attributes: ['id', 'name', 'publishDate', 'poster', 'rating', 'nation', 'duration'],
      raw: true
    });

    const action = 'list';
    const data = films;
    const errorData = {};

    res.render('admin/films/list', {
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

FilmController.getById = async(req, res) => {
  try {
    const filmId = req.params.id;
    const loginUser = req.currentUser;
    const { originalUrl } = req;

    let viewPath = '';
    const filmTypes = await FilmType.findAll({ raw: true });
    const data = { filmTypes, film: {} };
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
      const film = await Film.findByPk(filmId, {
        include: [
          {
            model: FilmType,
            through: { attributes: [] }
          },
          {
            model: Actor,
            through: { attributes: [] }
          },
          {
            model: Director
          }
        ]
      });

      data.film = filmMapper(film);
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

FilmController.updateById = async(req, res) => {
  try {
    const filmId = req.params.id;
    const {
      name, subName, publishDate, trailer, poster, nation, description, duration, directorId,
      actorIds, filmTypes
    } = req.body;

    await masterDB.transaction(async(t) => {
      await Promise.all([
        Film.update(
          {
            name, subName, publishDate, trailer, poster, nation, description, duration, directorId
          },
          {
            where: { id: filmId },
            transaction: t
          }
        ),
        FilmHasType.destroy({
          where: { filmId },
          transaction: t
        }),
        FilmActor.destroy({
          where: { filmId },
          transaction: t
        })
      ]);

      const filmHasTypes = _.map(filmTypes, (typeId) => ({
        filmId,
        filmTypeId: typeId
      }));
      const filmHasActors = _.map(actorIds, (actorId) => ({
        filmId,
        actorId
      }));

      await Promise.all([
        FilmHasType.bulkCreate(filmHasTypes, { transaction: t }),
        FilmActor.bulkCreate(filmHasActors, { transaction: t })
      ]);
    });

    req.flash('success', 'Phim được cập nhật thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình cập nhật Phim');
    res.redirect(`/admin/${controller}/list`);
  }
};

FilmController.deleteById = async(req, res) => {
  try {
    const filmId = req.params.id;

    await masterDB.transaction(async(t) => {
      await Promise.all([
        Film.destroy({
          where: { id: filmId },
          transaction: t
        }),
        FilmHasType.destroy({
          where: { filmId },
          transaction: t
        }),
        FilmActor.destroy({
          where: { filmId },
          transaction: t
        })
      ]);
    });

    req.flash('success', 'Phim được xóa thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình xóa Phim');
    res.redirect(`/admin/${controller}/list`);
  }
};

FilmController.createNew = async(req, res) => {
  try {
    const {
      name, subName, publishDate, trailer, poster, nation, description, duration, directorId,
      actorIds, filmTypes
    } = req.body;

    await masterDB.transaction(async(t) => {
      const newFilm = await Film.create(
        {
          name, subName, publishDate, trailer, poster, nation, description, duration, directorId
        },
        {
          transaction: t
        }
      );

      const filmHasActors = _.map(actorIds, (actorId) => ({
        filmId: newFilm.id,
        actorId
      }));

      const filmHasTypes = _.map(filmTypes, (typeId) => ({
        filmId: newFilm.id,
        filmTypeId: typeId
      }));

      await Promise.all([
        FilmHasType.bulkCreate(filmHasTypes, { transaction: t }),
        FilmActor.bulkCreate(filmHasActors, { transaction: t })
      ]);
    });

    req.flash('success', 'Phim được thêm thành công');
    res.redirect(`/admin/${controller}/list`);
  } catch (e) {
    console.error(e);
    req.flash('error', 'Có lỗi xảy ra trong quá trình thêm Phim');
    res.redirect(`/admin/${controller}/list`);
  }
};
