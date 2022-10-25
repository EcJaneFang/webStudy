window.onload = function () {
    // ------------------------饼图制作开始-----------------------------------
    var PieCharts = echarts.init(document.querySelector('.row>.pie'))
    var Picoption = {
        title: {
            text: '籍贯 HomeTown',
            textStyle: {
                color: '#6d767e'
            },
        },
        tooltip: {
            formatter: '{a}<br/>{b}<strong>{c}</strong>人 占比{d}%'
        },
        series: [
            {
                name: '各地人员分布',
                type: 'pie',
                radius: ['10%', '80%'],
                center: ['50%', '50%'],
                roseType: 'area',
                itemStyle: {
                    borderRadius: 6
                },
                data: [
                    { value: 40, name: '北京' },
                    { value: 38, name: '山东' },
                    { value: 32, name: '上海' },
                    { value: 30, name: '江苏' },
                    { value: 28, name: '河北' },
                    { value: 26, name: '山西' },
                    { value: 22, name: '河南' },
                    { value: 18, name: '辽宁' }
                ]
            }
        ]
    };


    // ------------------------饼图制作结束-----------------------------------

    // 发送axios亲求
    axios({
        method: 'get',
        url: '/student/list'
    }).then(res => {
        // console.log(res);

        if (res.status === 200 && res.data.code === 0) {
            let arr = res.data.data
            let PicArr = [{ value: 0, name: arr[0].province }]
            arr.forEach(v => {
                //假设法
                let flag = false
                for (let i = 0; i < PicArr.length; i++) {
                    if (v.province === PicArr[i].name) {
                        flag = true
                        PicArr[i].value++
                        break

                    }
                }

                //处理假设
                if (flag === false) {
                    PicArr.push({ value: 1, name: v.province })
                }
            })

            // console.log(PicArr);
            Picoption.series[0].data = PicArr
            PieCharts.setOption(Picoption)
        }

    })

}