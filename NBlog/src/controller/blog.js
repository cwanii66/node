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

module.exports = {
    getList,
    getDetail
}