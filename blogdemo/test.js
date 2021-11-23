const serverHandler = (req, res) => {
    // 设置返回格式
    res.setHeader('Content-type', 'application/json')
    // 设置返回数据
    const resData = {
        name: 'cwluvani',
        site: 'github',
        env: process.env.NODE_ENV // 可以通过process.env 对象的NODE_ENV prop 识别当前环境
    }
    res.end(JSON.stringify(resData));
}

module.exports = serverHandler;