axios.defaults.baseURL = 'http://www.itcbc.com:8000';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')

axios.interceptors.request.use(function (config) {
    let tokenVal = localStorage.getItem('token')
    if (tokenVal) {
        config.headers.common['Authorization'] = localStorage.getItem('token')
    }
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么???
    return Promise.reject(error);
});