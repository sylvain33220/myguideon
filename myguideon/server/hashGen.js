const { hashPassword } = require('./app/helpers/argonHelper');

(async () => {
  const hash = await hashPassword('adminpassword');
  console.log('🔐 Hash généré :', hash);
})();
