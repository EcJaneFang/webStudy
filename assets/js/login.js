window.onload = function () {
    let gotoRegister = document.querySelector("#gotoRegister");
    let gotoLogin = document.querySelector("#gotoLogin");

    let register = document.querySelector('.form-box>.register');
    let login = document.querySelector('.form-box>.login ');
    let loginBtn = document.querySelector('#loginBtn ');
    let registerBtn = document.querySelector('#registerBtn ');


    gotoRegister.addEventListener('click', function () {
        login.style.display = 'none'
        register.style.display = 'block'
    })

    gotoLogin.addEventListener('click', function () {
        login.style.display = 'block'
        register.style.display = 'none'
    })

    registerBtn.addEventListener('click', function (e) {
        e.preventDefault()
        let username = document.querySelector('.register [name="username"]').value.trim()
        let password = document.querySelector('.register [name="password"]').value.trim()
        // console.log(username, password);

        axios({
            method: 'post',
            url: "http://www.itcbc.com:8000/api/register",
            data: {
                username,
                password
            }
        }).then(res => {
            // console.log(res);
            if (res.status === 200) {
                toastr.success('res.data.message');
                if (res.data.code === 0) {
                    gotoLogin.click();
                    document.querySelector('.register form').reset()

                }

            }
        })
    })


    $('.login form').bootstrapValidator(test()).on('success.form.bv', function (e) {
        e.preventDefault();
        // 通过验证，这里的代码将会执行。我们将Ajax请求的代码放到这里即可
        let username = document.querySelector('.login [name="username"]').value.trim()
        let password = document.querySelector('.login [name="password"]').value.trim()
        // console.log(username, password);
        // 发送AXIOS请求
        axios({
            method: 'post',
            url: "http://www.itcbc.com:8000/api/login",
            data: {
                username,
                password
            }
        }).then(res => {
            console.log(res);
            if (res.status === 200) {
                toastr.success('res.data.message');
                if (res.data.code === 0) {
                    setTimeout(() => {
                        localStorage.setItem('token', res.data.token)
                        location.href = './index.html'
                    }, 1000);

                }

            }
        })


    });
}