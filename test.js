const cookies ='JSESSIONID=12341CD1E03CD07042F1F1E21FB9A7A2; Path=/; HttpOnly'
const cookie = cookies.split(';')[0];
console.log(cookie);