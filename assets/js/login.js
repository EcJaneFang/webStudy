window.onload = function () {
    let gotoRegister = document.querySelector("#gotoRegister");
    let gotoLogin = document.querySelector("#gotoLogin");

    let register = document.querySelector('.form-box>.register');
    let login = document.querySelector('.form-box>.login ');

    gotoRegister.addEventListener('click', function () {
        login.style.display = 'none'
        register.style.display = 'block'
    })

    gotoLogin.addEventListener('click', function () {
        login.style.display = 'block'
        register.style.display = 'none'
    })
}