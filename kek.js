require('moment-timezone');
const moment = require('moment');
// console.log(moment().format());
// console.log(moment().format().toLocaleString().slice(0, 19).replace('T', ' '));
console.log(moment.tz("Asia/Almaty").format().slice(0, 19).replace('T', ' '));
// console.log(new Date());