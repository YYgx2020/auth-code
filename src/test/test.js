let email = '123'
setTimeout(async () => {
  console.log('在这里打印外部的变量', email);
}, 1000)