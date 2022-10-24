
//侧边导航点击颜色控制

window.onload = function () {
    let allA = document.querySelectorAll(".nav>li li a")//获取A标签

    allA.forEach(item => {
        item.addEventListener('click', function () {
            document.querySelector(".nav>li li a.active").classList.remove("active")
            this.classList.add('active')
        })
    })

    document.querySelector('.init').onclick = function () {
        axios({
            method: 'get',
            url: "/init/data",
            // headers: {
            //     "Authorization": localStorage.getItem('token')
            // }
        }).then(res => {
            // console.log(res);
            toastr.success(res.data.message);
        })
    };

    document.querySelector('.logout').addEventListener('click', function () {
        localStorage.removeItem("token")
        location.href = "./login.html"

    });

}


