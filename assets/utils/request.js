// 配置axios的基地址
axios.defaults.baseURL = 'http://www.itcbc.com:8000';

// 配置axios的全局请求头.
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('myToken');

// // 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    // console.log(config); //打印config发现里面就有一个headers.

    // 所以刚好就可以用config.headers把token带过去.
    let tokenVaue = localStorage.getItem('myToken')
    // 如果没有token这个值(注册和登录),那就不要发送token过去.
    if (tokenVaue) {
        config.headers.common['Authorization'] = localStorage.getItem('myToken');
    }

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});