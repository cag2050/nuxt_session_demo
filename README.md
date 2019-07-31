# nuxt_session_demo

> My legendary Nuxt.js project

### 说明
1. session 过期后，会被删除
2. 用户登录后，将用户信息存到 session 上；
```
req.session.authUser = { username: 'demo' }
```
用户退出时，删除 session 上的用户信息
```
delete req.session.authUser
```
3. koa里使用 koa-session，session在ctx.session上。在nuxtServerInit里获取不到ctx, 那么解决方案就是在render的前面把ctx.session给ctx.req.session就好了：https://www.jianshu.com/p/1f8137a8e7b1
```
ctx.req.session = ctx.session
```

### 创建项目，选择的选项：
```
create-nuxt-app v2.9.0
✨  Generating Nuxt.js project in nuxt_session_demo
? Project name: nuxt_session_demo
? Project description: My legendary Nuxt.js project
? Author name: chen_anguo
? Choose the package manager: Npm
? Choose UI framework: Element
? Choose custom server framework: Koa
? Choose Nuxt.js modules: Axios
? Choose linting tools: ESLint, Prettier, Lint staged files
? Choose test framework: Jest
? Choose rendering mode: Universal (SSR)
```

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
