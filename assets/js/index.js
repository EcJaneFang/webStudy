window.onload = function () {
    //侧边栏颜色
    //获取nav里边所有li标签里边的a标签
    let navAll = document.querySelectorAll('.nav>li li>a')
    navAll.forEach((item, index) => {
        item.onclick = function () {
            //排他思想
            document.querySelector('.nav>li li>a.active').classList.remove('active')
            this.classList.add('active')
        }
    })

    //初始化
    document.querySelector('.init').onclick = function () {
        //发送AJAX
        axios({
            method: 'get',
            url: '/init/data',
            //接受token令牌
            // headers: {
            //     'Authorization': localStorage.getItem('myToken')
            // }
        }).then(res => {
            // console.log(res)
            toastr.info(res.data.message)
        })
    }

    //退出
    document.querySelector('.logout').onclick = function () {
        //退出删除token令牌
        localStorage.removeItem('myToken')
        //退出回退登录页
        location.href = './login.html'
    }
}


