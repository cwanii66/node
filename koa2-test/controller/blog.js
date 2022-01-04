const xss = require('xss');
const { execute } = require('../db/mysql');

const getList = async (author, keyword) => { // 获取博客列表我们只需要个author&keyword就行
    // where 1 = 1 占位，防止查询数据错误
    let sql = `
        select * from blogs where 1 = 1
    `;
    if (author) {
        sql += ` and author = '${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc;`

    // 返回promise
    return await execute(sql);
}

const getDetail = async (id)=> {
    const sql_detail = `
        select * from blogs where id = ${id};
    `;

    // 查询结果是数组
    // 在getDetail中，我们只会查询到一个元素
    const rows = await execute(sql_detail);
    return rows[0];
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象，包含title, content, author等属性
    // 转义 blogData.title
    const title = xss(blogData.title);
    console.log(title);
    const {
        content,
        author,
    } = blogData;
    const createtime = Date.now();

    const sql_new = `
        insert into blogs (title, content, createtime, author)
            values ('${title}', '${content}', '${createtime}', '${author}');
    `;
    const insertData = await execute(sql_new);
    return {
        id: insertData.insertId
    };
}

const updateBlog = async (blogData = {}, updateId) => {
    const {
        title,
        content
    } = blogData;

    const sql_update = `
        update blogs set title = '${title}', content = '${content}'
            where id = ${updateId};
    `;

    try {
        const updateData = await execute(sql_update);
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    } catch (e) {}
}

const delBlog = async (deleteId, author) => {
    const sql_delete = `
        delete from blogs 
        where id = ${deleteId} and author = '${author}';
    `;
    try {
        const deleteData = await execute(sql_delete);

        if (deleteData.affectedRows > 0) {
            return true;
        }
        return false;
    } catch(e) {}
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}