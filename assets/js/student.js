window.onload = function () {
    function getData() {
        axios({
            method: "get",
            url: "/student/list",
            // headers: {
            //     "Authorization": localStorage.getItem('token')
            // }
        }).then(res => {
            // console.log(res);
            if (res.status === 200 && res.data.code === 0) {
                render(res.data.data)

            }
        })
    }
    getData()
    function render(arr) {
        document.querySelector("tbody").innerHTML = arr.map(res => {
            return `<tr>
                            <th scope="row">${res.id}</th>
                            <td>${res.name}</td>
                            <td>${res.sex}</td>
                            <td>${res.age}</td>
                            <td>${res.group}</td>
                            <td>${res.phone}</td>
                            <td>${res.salary}</td>
                            <td>${res.truesalary}</td>
                            <td>${res.province + res.city + res.county}</td>
                            <td>
                            <button data-id="${res.id}" type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
        data-bs-target="#addModal">修改</button>
                            <button data-id="${res.id}" type="button" class="btn del btn-danger btn-sm">删除</button>
                            </td>
                        </tr>`
        }).join("")

    }

    let addModal = document.querySelector('#addModal');
    let province = document.querySelector('[name="province"]');
    let city = document.querySelector('[name="city"]');
    let county = document.querySelector('[name="county"]');
    let id
    $('#addModal').on('show.bs.modal', function (e) {
        // do something...
        // console.log(e.relatedTarget);

        //发送AXIOs亲求
        axios({
            method: "",
            url: "/geo/province"
        }).then(res => {
            // console.log(res);

            if (res.status === 200) {
                let str = `<option selected="" value="">--省--</option>`
                str += res.data.map(v => `<option value="${v}">${v}</option>`
                ).join("")
                province.innerHTML = str

            }
        })

        //省下拉菜单的zhid

        province.addEventListener('change', function () {
            city.innerHTML = `<option selected="" value="">--市--</option>`
            county.innerHTML = `<option selected="" value="">--县--</option>`
            axios({
                method: "",
                url: "/geo/city",
                params: {
                    pname: this.value
                }
            }).then(res => {
                // console.log(res);

                if (res.status === 200) {
                    let str = `<option selected="" value="">--市--</option>`
                    str += res.data.map(v => `<option value="${v}">${v}</option>`
                    ).join("")
                    city.innerHTML = str

                }
            })
        })

        city.addEventListener('change', function () {
            // city.innerHTML = `<option selected="" value="">--市--</option>`
            county.innerHTML = `<option selected="" value="">--县--</option>`
            axios({
                method: "",
                url: "/geo/county",
                params: {
                    pname: province.value,
                    cname: this.value
                }
            }).then(res => {
                // console.log(res);

                if (res.status === 200) {
                    let str = `<option selected="" value="">--县--</option>`
                    str += res.data.map(v => `<option value="${v}">${v}</option>`
                    ).join("")
                    county.innerHTML = str

                }
            })
        })


        if (e.relatedTarget.innerHTML.trim() === '添加学员') {
            document.getElementById('addModalLabel').innerText = "录入新学员"
            document.getElementById('queren').innerText = "确认添加"
            document.getElementById('chongzhi').style.display = "inline-block"

        } else {
            document.getElementById('addModalLabel').innerText = "修改学员信息"
            document.getElementById('queren').innerText = "确认修改"
            document.getElementById('chongzhi').style.display = "none"
            //数据回填

            id = e.relatedTarget.dataset.id
            // console.log(id);
            //发送修改的axios亲求
            axios({
                method: "",
                url: "/student/one",
                params: {
                    id
                }
            }).then(res => {
                console.log(res);
                toastr.success(res.data.message);
                if (res.status === 200 && res.data.code === 0) {
                    let obj = res.data.data;
                    //数据回填
                    document.querySelector('[name="name"]').value = obj.name;
                    document.querySelector('[name="age"]').value = obj.age;

                    document.querySelector('[name="group"]').value = obj.group;

                    document.querySelector('[name="phone"]').value = obj.phone;
                    document.querySelector('[name="salary"]').value = obj.salary;

                    document.querySelector('[name="truesalary"]').value = obj.truesalary;
                    obj.sex === "男" ? (document.querySelectorAll('[name="sex"]')[0].checked) : (document.querySelectorAll('[name="sex"]')[1].checked)
                    province.value = obj.province
                    city.innerHTML = ` <option selected value="${obj.city}">${obj.city}</option>`
                    county.innerHTML = ` <option selected value="${obj.county}">${obj.county}</option>`


                }
            })
        }

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

        // 添加学生
        $('.add-form').bootstrapValidator(student()).on('success.form.bv', function (e) {
            e.preventDefault();

            if (document.getElementById("queren").innerText === "确认添加") {
                let fd = new FormData(document.querySelector('.add-form'))
                let obj = {}
                fd.forEach((v, k) => {
                    obj[k] = v
                })

                axios({
                    method: "post",
                    url: "/student/add",
                    data: obj
                }).then(res => {
                    // console.log(res);
                    toastr.success(res.data.message)
                    if (res.status === 200 && res.data.code === 0) {
                        getData()
                        $('#addModal').modal('hide')

                    }
                })

            } else {
                //提交逻辑
                // console.log(222);
                let fd = new FormData(document.querySelector('.add-form'))
                let obj = {}
                fd.forEach((v, k) => {
                    obj[k] = v
                })
                obj.id = id;
                //发送AXIOS请求
                axios({
                    method: "put",
                    url: "/student/update",
                    data: obj
                }).then(res => {
                    // console.log(res);
                    toastr.success(res.data.message);
                    getData()
                    $('#addModal').modal('hide')
                })
            }

            // if (document.getElementById("queren") {

            // }


        });


    })

    $('#addModal').on('hidden.bs.modal', function (e) {
        // do something...

        addModal.querySelector('.add-form').reset();
    })

    //删除学院 
    document.querySelector('tbody').onclick = function (e) {
        if (e.target.classList.contains("del")) {
            // console.log(1);
            let id = e.target.dataset.id
            axios({
                method: "DELETE",
                url: "/student/delete",
                params: {
                    id
                }
            }).then(res => {
                // console.log(res);
                toastr.success(res.data.message);
                if (res.status === 200 && res.data.code === 0) {
                    getData()
                }
            })
        }

    };
}