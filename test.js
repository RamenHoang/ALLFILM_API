const bcrypt = require('bcrypt');

const saltRound = 5;

const hash = bcrypt.hashSync('Aa@12345', saltRound);

console.log({ hash });

const result = bcrypt.compareSync('Aa@12345', '$2b$05$0fKICtrg4L9foQ3pbhWmQOuCqxCfRUjA9UA7J1L1X.Uoj.Ss5FsZ.');

console.log({ result });
