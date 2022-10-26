window.onload = function () {

    function inits() {
        //发送查询请求
        axios({
            method: 'get',
            url: "/score/list",
        }).then(res => {
            // console.log(res)
            if (res.status === 200 && res.data.code === 0) {
                let arr = []
                // res返回一个对象
                for (let k in res.data.data) {
                    // console.log(k)
                    arr.push(`<tr>
	                            <th scope="row">${k}</th>
	                            <td>${res.data.data[k].name}</td>
	                            <td data-batch='1' class="score">${res.data.data[k].score[0]}</td>
	                            <td data-batch='2' class="score">${res.data.data[k].score[1]}</td>
	                            <td data-batch='3' class="score">${res.data.data[k].score[2]}</td>
	                            <td data-batch='4' class="score">${res.data.data[k].score[3]}</td>
	                            <td data-batch='5' class="score">${res.data.data[k].score[4]}</td>
	                        </tr>`)
                }
                document.querySelector('tbody').innerHTML = arr.join('')
            }
        })
    }
    inits()
    //委托点击事件：score
    document.querySelector('tbody').onclick = function (e) {
        let td = e.target  // 鼠标点击的td
        // console.log(td)
        if (td.classList.contains('score')) {
            if (!td.querySelector('input')) { //判断当前点击的td是否有input
                let txt = td.innerText      //保存td的值
                td.innerHTML = ''           //获取之后去除

                let input = document.createElement('input')
                input.value = txt
                td.appendChild(input)

                input.focus()  //获取焦点

                input.addEventListener('keyup', function (e) { //获取input按下事件
                    if (e.key == 'Enter') {
                        let newScore = +input.value  //获取输入的值

                        //判断输入的input是否合法
                        if (isNaN(newScore) || newScore < 0 || newScore > 100) {
                            return toastr.warning('请输入1-100的数值');
                        }

                        //发送修改请求
                        axios({
                            method: 'post',
                            url: "/score/entry",
                            data: {
                                stu_id: td.parentNode.firstElementChild.innerHTML,
                                batch: td.getAttribute('data-batch'),
                                score: newScore
                            }
                        }).then(res => {
                            // console.log(res)
                            if (res.status === 200 && res.data.code === 0) {
                                toastr.success('修改成功')
                                txt = newScore  //修改成功，将新成绩的值赋值给txt
                                input.blur()    //失去焦点
                            }
                        })
                    }
                })
                input.addEventListener('blur', function () {  //给input设置一个失去焦点的事件
                    td.innerHTML = txt    //将txt的值赋值给td
                })

            }
        }
    }
}