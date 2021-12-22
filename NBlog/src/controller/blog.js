import { execute } from "../db/mysql"

const getList = (author, keyword) => { // 获取博客列表我们只需要个author&keyword就行
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
    return execute(sql);
}

const getDetail = id => {
    // 先返回假数据
    return {
        id: 1,
        title: 'titleA',
        content: 'contentA',
        createTime: 1111111111,
        author: 'jack'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象，包含title content 属性
    return {
        id: 3 // 新建博客，插入到数据表里的 id
    }
}

const updateBlog = (blogData, updateId) => {
    if (blogData) {
        console.log('success update')
        return {
            msg: false,
            blogData,
            updateId
        }
    }
}

const delBlog = deleteId => {
    // 删除id

    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}