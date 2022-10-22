
//侧边导航点击颜色控制

let allA = document.querySelectorAll(".nav>li li a")//获取A标签

allA.forEach(item => {
    item.addEventListener('click', function () {
        document.querySelector(".nav>li li a.active").classList.remove("active")
        this.classList.add('active')
    })
})



