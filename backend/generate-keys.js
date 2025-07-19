const crypto = require('crypto');

console.log('🔐 Генерація безпечних ключів для Strapi\n');

// Генерація різних типів ключів
const adminJwtSecret = crypto.randomBytes(32).toString('base64');
const apiTokenSalt = crypto.randomBytes(32).toString('base64');
const transferTokenSalt = crypto.randomBytes(32).toString('base64');
const encryptionKey = crypto.randomBytes(32).toString('base64');

// Генерація 4 App Keys для ротації
const appKeys = Array.from({ length: 4 }, () => crypto.randomBytes(32).toString('base64')).join(',');

console.log('📋 Скопіюйте ці значення у ваш .env файл:\n');

console.log('🔑 ADMIN_JWT_SECRET=' + adminJwtSecret);
console.log('🔑 API_TOKEN_SALT=' + apiTokenSalt);
console.log('🔑 TRANSFER_TOKEN_SALT=' + transferTokenSalt);
console.log('🔑 ENCRYPTION_KEY=' + encryptionKey);
console.log('🔑 APP_KEYS=' + appKeys);

console.log('\n📝 Інструкції:');
console.log('1. Скопіюйте ці значення у файл backend/.env');
console.log('2. Ніколи не комітьте .env файл у Git');
console.log('3. Зберігайте ці ключі в безпечному місці');
console.log('4. Для production використовуйте різні ключі\n');

console.log('✅ Готово! Тепер можете налаштувати ваш .env файл.'); 