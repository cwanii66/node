const Blog = require('../models/BLOG');

!(async () => {
    
    // 新建博客
    // const blog1 = await Blog.create({
    //     title: '标题1',
    //     content: '内容1',
    //     author: 'cwluvani'
    // });
    // console.log(blog1);

    // 获取博客列表
    // const list = await Blog.find(
    //     {
    //         title: /A/ // 正则表达式：模拟模糊查询
    //     }
    // ).sort({ id : -1});
    // console.log(list);

    // 根据id获取单个博客
    // const blog2 = await Blog.findById('id');

    // // 修改
    // const res = await Blog.findOneAndUpdate(
    //     {
    //         _id: '...' // 条件
    //     }, 
    //     {
    //         content: 'content22'
    //     },
    //     {
    //         new: true // 返回修改后的最新内容，default是false
    //     }
    // );

    // 删除
    const res = await Blog.findOneAndDelete({
        _id: '...',
        author: 'jack' // 验证一下作者，增加安全性，防止误删
    });
    console.log(res);

})();