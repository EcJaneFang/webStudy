window.onload = function () {
    function inset() {
        axios({
            method: "get",
            url: '/score/list'
        }).then(res => {
            // console.log(res);
            if (res.status === 200 && res.data.code === 0) {
                // console.log(res.data.data);
                let obj = res.data.data
                let arr = []
                for (let key in obj) {
                    arr.push(`<tr>
                            <th scope="row">${key}</th>
                            <td>${obj[key].name}</td>
                            <td  data-batch="1"  class="score">${obj[key].score[0]}</td>
                            <td  data-batch="2"  class="score">${obj[key].score[1]}</td>
                            <td  data-batch="3"  class="score">${obj[key].score[2]}</td>
                            <td  data-batch="4"  class="score">${obj[key].score[3]}</td>
                            <td  data-batch="5"  class="score">${obj[key].score[4]}</td>
                        </tr>`)
                }
                document.querySelector('tbody').innerHTML = arr.join('')
            }
        })
    }

    inset()

    //修改数据
    document.querySelector('tbody').onclick = function (e) {
        let td = e.target
        if (td.classList.contains("score")) {
            if (!td.querySelector("input")) {
                let txt = td.innerText
                td.innerHTML = ''

                let input = document.createElement("input")
                input.value = txt
                td.appendChild(input)
                input.focus()


                //input 点击按下
                input.addEventListener("keyup", function (e) {
                    if (e.key === 'Enter') {
                        //获取用户输入的值
                        let newValue = +input.value;

                        if (isNaN(newValue) || newValue < 0 || newValue > 100) {
                            toastr.error('请输入1-100的数字');
                        } else {
                            axios({
                                method: 'post',
                                url: "/score/entry",
                                data: {
                                    stu_id: td.parentNode.firstElementChild.innerText,
                                    batch: td.getAttribute('data-batch'),
                                    score: newValue
                                }
                            }).then(res => {
                                // console.log(res);
                                if (res.status === 200 && res.data.code === 0) {
                                    toastr.error(res.data.message);
                                    txt = newValue
                                    input.blur()
                                }
                            })
                        }

                    }

                })

                input.addEventListener("blur", function () { td.innerHTML = txt })



            }
        }
    };
}