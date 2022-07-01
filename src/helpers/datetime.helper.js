const DatetimeHelper = module.exports;
const moment = require('moment');

DatetimeHelper.now = () => moment().format('YYYY-MM-DD HH:mm:ss');

DatetimeHelper.startOfDate = (date) => moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');

DatetimeHelper.endOfDate = (date) => moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');
