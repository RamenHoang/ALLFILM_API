module.exports = {
  up: (queryInterface) => Promise.all([
    queryInterface.addIndex('bookings', ['user_id'], { name: 'bookings_user_id' }),
    queryInterface.addIndex('bookings', ['session_id'], { name: 'bookings_session_id' }),
    queryInterface.addIndex('bookings', ['checked_out_at'], { name: 'bookings_checked_out_at' }),
    queryInterface.addIndex('bookings', ['is_close'], { name: 'bookings_is_close' }),
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeIndex('bookings', 'bookings_user_id'),
    queryInterface.removeIndex('bookings', 'bookings_session_id'),
    queryInterface.removeIndex('bookings', 'bookings_checked_out_at'),
    queryInterface.removeIndex('bookings', 'bookings_is_close'),
  ])
};
