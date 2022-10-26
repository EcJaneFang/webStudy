window.onload = function () {
    let gotoRegister = document.getElementById('gotoRegister')//还没账号
    let gotoLogin = document.getElementById('gotoLogin')//已有帐号
    let registerBox = document.querySelector('.form-box>.register')//注册盒子
    let logingBox = document.querySelector('.form-box>.login')//登录盒子
    // let 

    // 注册
    gotoRegister.onclick = function () {
        registerBox.style.display = 'block'
        logingBox.style.display = 'none'
    }
    //登录
    gotoLogin.onclick = function () {
        registerBox.style.display = 'none'
        logingBox.style.display = 'block'
    }

    // 比如，验证一个用户名和密码
    function test() {
        return {
            fields: {
                username: { // 这里username是 input 的name属性值，表示对这个输入框进行验证
                    validators: { // 添加真正的校验规则
                        notEmpty: { //不能为空
                            message: '用户名不能为空.' // 如果不满足校验规则，则给出这句提示
                        },
                        stringLength: { //检测长度
                            min: 2, // 最少2位
                            max: 15, // 最多15位
                            message: '用户名需要2~15个字符'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: { //检测长度
                            min: 6,
                            max: 15,
                            message: '密码需要6~15个字符'
                        }
                    }
                }
            }
        }
    }


    // 比如，注册
    $('.register form').bootstrapValidator(test()).on('success.form.bv', function (e) {
        e.preventDefault();

        let password = document.querySelector('.register [name="password"]').value.trim()
        let username = document.querySelector('.register [name="username"]').value.trim()

        // 通过验证，这里的代码将会执行。我们将Ajax请求的代码放到这里即可
        axios({
            method: 'post',
            url: '/api/register',
            data: {
                username,
                password
            }
        }).then(res => {
            // console.log(res)
            if (res.status === 200) {
                //注册成功提示
                toastr.info(res.data.message)
                if (res.data.code === 0) {
                    //调用登录，注册完跳转登录
                    gotoLogin.click()
                    //注册完清空
                    document.querySelector('.register [name="password"]').value = ''
                    document.querySelector('.register [name="username"]').value = ''
                }
            }
        })
    })

    //登录
    $('.login form').bootstrapValidator(test()).on('success.form.bv', function (e) {
        e.preventDefault();

        let password = document.querySelector('.login [name="password"]').value.trim()
        let username = document.querySelector('.login [name="username"]').value.trim()

        // 发送AJax登录请求
        axios({
            method: 'post',
            url: '/api/login',
            data: {
                username,
                password
            }
        }).then(res => {
            // console.log(res)
            if (res.status === 200) {
                //登录成功提示
                toastr.info(res.data.message)
                if (res.data.code === 0) {
                    // 保存后端返回一个token令牌到本地
                    localStorage.setItem('myToken', res.data.token)

                    //给一个定时器,定时跳转
                    setTimeout(() => {
                        location.href = './index.html'
                    }, 1000)
                }
            }
        })
    })
}