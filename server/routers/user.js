const Router = require('koa-router')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  console.log('服务端接受到了用户的登录请求 user', user)
  if (user.username === 'ahiba' && user.password === 'ahiba') {
    ctx.session.user = {
      username: 'ahiba'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'ahiba'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password is error'
    }
  }
})

module.exports = userRouter
