
const crypto = require("crypto");

// 微信公众平台服务器配置中的 Token
const token = "weixin_lhy15778003016";

function sha1(str) {
  const md5sum = crypto.createHash("sha1");
  md5sum.update(str);
  const ciphertext = md5sum.digest("hex");
  return ciphertext;
}

class CkeckController {
  async checkSignature(ctx, next) {
    // console.log('signature: ', ctx.query.signature);
    // console.log('echostr: ', ctx.query.echostr);
    // console.log('timestamp: ', ctx.query.timestamp);
    // console.log('nonce: ', ctx.query.nonce);
    // console.log('微信：', ctx);
    const query = ctx.query;
    // console.log("Request URL: ", req.url);
    const signature = query.signature;
    const timestamp = query.timestamp;
    const nonce = query.nonce;
    const echostr = query.echostr;
    console.log('signature: ', signature);
    console.log("timestamp: ", timestamp);
    console.log("nonce: ", nonce);
    console.log("signature: ", signature);
    // 将 token/timestamp/nonce 三个参数进行字典序排序
    const tmpArr = [token, timestamp, nonce];
    const tmpStr = sha1(tmpArr.sort().join(""));
    console.log("Sha1 String: ", tmpStr);
    // 验证排序并加密后的字符串与 signature 是否相等
    if (tmpStr === signature) {
      // 原样返回echostr参数内容
      ctx.body = echostr
      console.log("Check Success");
    } else {
      ctx.body = '校验错误'
      console.log("Check Failed");
    }
  }
}

module.exports = new CkeckController()