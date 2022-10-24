window.onload = function () {
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
                            <button data-id="${res.id}" type="button" class="btn btn-danger btn-sm">删除</button>
                            </td>
                        </tr>`
        }).join("")

    }

    let addModal = document.querySelector('#addModal');
    let province = document.querySelector('[name="province"]');
    let city = document.querySelector('[name="city"]');
    let county = document.querySelector('[name="county"]');
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
                console.log(res);

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
                console.log(res);

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
        }


    })
}