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
                            <button data-id="${res.id}" type="button" class="btn btn-primary btn-sm">修改</button>
                            <button data-id="${res.id}" type="button" class="btn btn-danger btn-sm">删除</button>
                            </td>
                        </tr>`
        }).join("")

    }
}