const User = require('../models/USER');

!(async () => {

    // 创建用户
    // const kawayi = await User.create({
    //     username: 'kawayi',
    //     password: '123',
    //     realname: '川合'
    // });
    // console.log(kawayi);

    // 查询
    // const list = await User.find();
    // console.log(list);

    // 模拟登录
    const kawayi = await User.find({
        username: 'kawayi',
        password: '123'
    });
    console.log(kawayi);
})();