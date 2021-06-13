module.exports = {
  up: (queryInterface) => Promise.all([
    queryInterface.addIndex('users', ['username'], { name: 'users_username' }),
    queryInterface.addIndex('users', ['password_hash'], { name: 'users_password_hash' }),
    queryInterface.addIndex('users', ['phone'], { name: 'users_phone' }),
    queryInterface.addIndex('users', ['fullname'], { name: 'users_fullname' }),
    queryInterface.addIndex('users', ['register_verifying_token'], { name: 'users_register_verifying_token' }),
    queryInterface.addIndex('users', ['email'], { name: 'users_email' }),
    queryInterface.addIndex('users', ['name'], { name: 'users_name' }),
  ]),

  down: (queryInterface) => Promise.all([
    queryInterface.removeIndex('users', 'users_user_id'),
    queryInterface.removeIndex('users', 'users_password_hash'),
    queryInterface.removeIndex('users', 'users_phone'),
    queryInterface.removeIndex('users', 'users_fullname'),
    queryInterface.removeIndex('users', 'users_register_verifying_token'),
    queryInterface.removeIndex('users', 'users_email'),
    queryInterface.removeIndex('users', 'users_name'),
  ])
};
