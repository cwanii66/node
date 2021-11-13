'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = `
    <form action="/login">
      <label>登录名</label><input name="username"><br/>
      <label>密码</label><input type="password" name="password">
      <br />
      <button>提交</button>
    </form>
    `;
  }

  async login() {
    const { ctx } = this;
    const username = ctx.query.username;
    const password = ctx.query.password;
    if (username === 'admin' && password === '123456') {
      ctx.body = '<h3>success</h3>';
    } else {
      ctx.body = '<h3>fail</h3>';
    }
  }

}

module.exports = HomeController;
