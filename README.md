# 溢狗之家后端

## 主要技术栈

- node.js
- koa
- sequelize

## 项目使用方法

### 安装依赖

```
npm install
```

### 运行

```
npm run serve
```

### 配置

1. 在根目录下新建一个 `.env` 文件，并编写如下配置：

```
# 本地端口
APP_PORT = 6001
# 发送验证码的邮箱（可以使用自己的qq邮箱做测试）
HOST_EMAIL = yigou.lhy@foxmail.com
# qq邮箱 SMTP
SMTP = xnessxskqszdbgce
# qq邮箱的 SMTP 服务
HOST = smtp.qq.com

# 数据库相关，可以使用自己的本地数据库，也可以使用云数据库
MYSQL_HOST = 
MYSQL_PORT = 
MYSQL_USER = 
MYSQL_PWD = 
MYSQL_DB = 

# token 密钥（随便一个英文字符）
JWT_SECRET = yigou
```

2. 在 `src/upload` 目录下新建一个 `img` 目录，用于存放文章的封面

## 接口文档

暂无

