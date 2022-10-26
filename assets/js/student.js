window.onload = function () {
    function init() {
        //发送AJAX请求
        axios({
            method: 'get',
            url: '/student/list',

            //接受token令牌
            // headers: {
            //     'Authorization': localStorage.getItem('myToken')
            // }
        }).then(res => {
            // console.log(res)
            if (res.status === 200 && res.data.code === 0) {
                renderData(res.data.data)
            }
        })
    }
    init()
    //封装一个函数来渲染页面
    function renderData(arr) {
        document.querySelector('tbody').innerHTML = arr.map(item => {
            return `
                <tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.name}</td>
                    <td>${item.age}</td>
                    <td>${item.sex}</td>
                    <td>${item.group}</td>
                    <td>${item.phone}</td>
                    <td>${item.salary}</td>
                    <td>${item.truesalary}</td>
                    <td>${item.province + item.city + item.county}</td>
                    <td>
                    <button type="button" class="btn btn-primary btn-sm" data-id = '${item.id}' data-bs-toggle="modal" data-bs-target="#addModal" >修改</button>
                    <button type="button" class="btn btn-danger btn-sm delete" data-id = '${item.id}'>删除</button>
                    </td>
                </tr> 
                    `
        }).join('')
    }

    //添加与修改
    let addModal = document.getElementById('addModal')
    let province = document.querySelector('[name="province"]') //省
    let city = document.querySelector('[name="city"]')  //市
    let county = document.querySelector('[name="county"]') //县
    let studentTd
    //模态框显示
    $('#addModal').on('show.bs.modal', function (e) {
        //点击按钮发送Ajax请求
        //省
        axios({
            method: 'get',
            url: '/geo/province',
        }).then(res => {
            // console.log(res)
            if (res.status === 200) {
                let str = ` <option selected value="">--省--</option>`
                str += res.data.map(v => {
                    return `<option  value="${v}">${v}</option>`
                }).join('')
                province.innerHTML = str
            }
        })

        //省改变事件:当选择一个省时，市发生改变，并且省未选择时，市、县默认
        province.addEventListener('change', function () {
            //当this.value为空时,市，县默认
            city.innerHTML = ` <option option selected value = "" > --市--</option > `
            county.innerHTML = ` <option option selected value = "" > --县--</option> `
            if (this.value == '') {
                return
            }
            //点击按钮发送Ajax请求
            axios({
                method: 'get',
                url: '/geo/city',
                params: {
                    pname: this.value
                }
            }).then(res => {
                // console.log(res)
                if (res.status === 200) {
                    let str = ` <option selected value="">--市--</option>`
                    str += res.data.map(v => {
                        return `<option  value="${v}">${v}</option>`
                    }).join('')
                    city.innerHTML = str
                }
            })
        })

        //关闭后重新点击弹出，修改市、县为默认
        city.innerHTML = ` <option  selected value = "" > --市--</option > `
        county.innerHTML = ` <option  selected value = "" > --县--</option> `
        city.addEventListener('change', function () {
            //当this.value为空时,市，县默认
            county.innerHTML = ` <option  selected value = "" > --县--</option> `
            if (this.value == '') {
                return
            }
            //点击按钮发送Ajax请求
            axios({
                method: 'get',
                url: '/geo/county',
                params: {
                    pname: province.value,
                    cname: this.value
                }
            }).then(res => {
                // console.log(res)
                if (res.status === 200) {
                    let str = ` <option selected value="">--县--</option>`
                    str += res.data.map(v => {
                        return `<option  value="${v}">${v}</option>`
                    }).join('')
                    county.innerHTML = str
                }
            })
        })

        //点击添加、修改框，对添加、修改框进行调整
        // console.log(e.relatedTarget)
        if (e.relatedTarget.innerHTML === '添加学员') {
            document.querySelector('#addModalLabel').innerText = '录入新学员'
            document.querySelector('#queren').innerText = '确认添加'
            document.querySelector('#chongzhi').style.display = "inline-block"
        } else {
            document.querySelector('#addModalLabel').innerText = '修改学员信息'
            document.querySelector('#queren').innerText = '确认修改'
            document.querySelector('#chongzhi').style.display = "none"

            //获取id
            studentTd = e.relatedTarget.getAttribute('data-id')
            //发送请求
            axios({
                method: 'get',
                url: '/student/one',
                params: {
                    id: studentTd
                }
            }).then(res => {
                // console.log(res)
                if (res.status === 200 && res.data.code === 0) {
                    document.querySelector('[name="name"]').value = res.data.data.name
                    document.querySelector('[name="age"]').value = res.data.data.age
                    document.querySelector('[name="group"]').value = res.data.data.group
                    document.querySelector('[name="phone"]').value = res.data.data.phone
                    document.querySelector('[name="salary"]').value = res.data.data.salary
                    document.querySelector('[name="truesalary"]').value = res.data.data.truesalary

                    //男女
                    res.data.data.sex = "男" ?
                        (document.querySelectorAll('[name="sex"]')[0].checked = true) :
                        (document.querySelectorAll('[name="sex"]')[1].checked = true)

                    //省市县
                    province.value = res.data.data.province
                    city.innerHTML = ` <option  selected value = "${res.data.data.city}" > --${res.data.data.city}--</option > `
                    county.innerHTML = ` <option opion selected value = "${res.data.data.county}" > --${res.data.data.county}-</option> `
                }
            })

        }
    })
    //模态框隐藏
    $('#addModal').on('hide.bs.modal', function (e) {
        addModal.querySelector('.add-form').reset()
    })

    //模态框输入规则
    // 比如，验证一个用户名和密码
    function student() {
        return {
            fields: {
                name: {
                    validators: {
                        notEmpty: {
                            message: '姓名不能为空',
                        },
                        stringLength: {
                            min: 2,
                            max: 10,
                            message: '姓名长度2~10位'
                        }
                    }
                },
                age: {
                    validators: {
                        notEmpty: {
                            message: '年龄不能为空',
                        },
                        greaterThan: {
                            value: 18,
                            message: '年龄不能小于18岁'
                        },
                        lessThan: {
                            value: 60,
                            message: '年龄不能超过60岁'
                        }
                    }
                },
                sex: {
                    validators: {
                        choice: {
                            min: 1,
                            max: 1,
                            message: '请选择性别'
                        }
                    }
                },
                group: {
                    validators: {
                        notEmpty: {
                            message: '组号不能为空',
                        },
                        regexp: {
                            regexp: /^\d{1,2}$/,
                            message: '请选择有效的组号'
                        }
                    }
                },
                phone: {
                    validators: {
                        notEmpty: {
                            message: '手机号不能为空',
                        },
                        regexp: {
                            regexp: /^1\d{10}$/,
                            message: '请填写有效的手机号'
                        }
                    }
                },
                salary: {
                    validators: {
                        notEmpty: {
                            message: '实际薪资不能为空',
                        },
                        greaterThan: {
                            value: 800,
                            message: '期望薪资不能低于800'
                        },
                        lessThan: {
                            value: 100000,
                            message: '期望薪资不能高于100000'
                        }
                    }
                },
                truesalary: {
                    validators: {
                        notEmpty: {
                            message: '实际薪资不能为空',
                        },
                        greaterThan: {
                            value: 800,
                            message: '实际薪资不能低于800'
                        },
                        lessThan: {
                            value: 100000,
                            message: '实际薪资不能高于100000'
                        }
                    }
                },
                province: {
                    validators: {
                        notEmpty: {
                            message: '省份必填',
                        },
                    }
                },
                city: {
                    validators: {
                        notEmpty: {
                            message: '市必填',
                        },
                    }
                },
                county: {
                    validators: {
                        notEmpty: {
                            message: '县必填',
                        },
                    }
                },
            }
        }
    }

    $('.add-form').bootstrapValidator(student()).on('success.form.bv', function (e) {
        e.preventDefault();
        //提交逻辑
        if (document.querySelector('#queren').innerText === '确认添加') {
            let fd = new FormData(document.querySelector('.add-form'))
            let obj = {}
            fd.forEach((v, k) => {
                obj[k] = v
            })
            // 发送AJAX请求
            axios({
                method: 'post',
                url: '/student/add',
                data: obj
            }).then(res => {
                // console.log(res)
                //添加成功
                toastr.info(res.data.message)
                if (res.status === 200 & res.data.code == 0) {
                    //重新渲染页面
                    init()
                    //成功后隐藏模态框
                    $('#addModal').modal('hide')
                }
            })
        } else {
            //获取
            let fd = new FormData(document.querySelector('.add-form'))
            let obj = {}
            fd.forEach((v, k) => {
                obj[k] = v
            })
            //studentTd 为全局，然后取值
            obj.id = studentTd
            //发送修改请求
            axios({
                method: 'put',
                url: '/student/update',
                data: obj
            }).then(res => {
                // console.log(res)
                toastr.info(res.data.message)
                if (res.status === 200 && res.data.code === 0) {
                    //渲染页面
                    init()
                    //隐藏
                    $('#addModal').modal('hide')
                }
            })
        }
    })

    //删除
    document.querySelector('tbody').onclick = function (e) {
        
        if (e.target.classList.contains('delete')) {
            //获取id
            let id = e.target.getAttribute('data-id')

            //发送删除请求
            axios({
                method: 'delete',
                url: '/student/delete',
                params: {
                    id
                }
            }).then(res => {
                // console.log(res)
                toastr.info(res.data.message)
                if (res.status === 200 && res.data.code === 0) {
                    //重新渲染
                    init()
                }
            })
        }
    }

}