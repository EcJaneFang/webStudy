
//侧边导航点击颜色控制

window.onload = function () {
    let allA = document.querySelectorAll(".nav>li li a")//获取A标签

    allA.forEach(item => {
        item.addEventListener('click', function () {
            document.querySelector(".nav>li li a.active").classList.remove("active")
            this.classList.add('active')
        })
    })

    let init = document.querySelector('.init').onclick = function () {
        axios({
            method: 'get',
            url: "http://www.itcbc.com:8000/init/data",
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res);
        })
    };

}


