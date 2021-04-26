const _ = require('lodash');

const FilmMapper = module.exports;

FilmMapper.toFilmAtHomepage = (film) => ({
  id: _.get(film, 'id'),
  title: _.get(film, 'name'),
  subTitle: _.get(film, 'subName'),
  image: _.get(film, 'poster')
});

FilmMapper.toListAtHomepage = (films) => _.map(films, FilmMapper.toFilmAtHomepage);

