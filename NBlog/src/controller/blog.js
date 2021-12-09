const getList = (author, keyword) => { // 获取博客列表我们只需要个author&keyword就行
    // 先返回假数据(格式一定要正确)
    return [
        {
            id: 1,
            title: 'titleA',
            content: 'contentA',
            createTime: 1111111111,
            author: 'jack'
        },
        {
            id: 2,
            title: 'titleB',
            content: 'contentB',
            createTime: 2222222222,
            author: 'rose'
        }
    ]
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