window.onload = function () {
    //-------------------------------饼图开始-----------------------------
    //初始化echart实例
    let myPieChart = echarts.init(document.querySelector('.row>.pie'));
    let pieOption = {
        title: {
            text: '籍贯 Hometown',
            textStyle: {
                color: '#6d767e' // 标题演示
            }
        },
        tooltip: {
            // {a} 表示series中的name
            // {b} 表示数据中的series.data中的name
            // {c} 表示每一项的值
            // {d} 表示百分比
            formatter: '{a}:<br />{b}: <strong>{c}</strong>人 占比{d}%'
        },
        series: [
            {
                name: '各地学员分布',
                type: 'pie', // pie 表示饼图
                radius: ['10%', '65%'], // 内外圈的半径
                center: ['50%', '50%'], // 中心点
                roseType: 'area', // area表示面积模式，radius表示半径模式
                itemStyle: { // 每一项的设置
                    borderRadius: 4, // 扇形边缘圆角设置
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
    }
    //使用刚指定的配置项和数据显示图表
    // myPieChart.setOption(pieOption)
    //-------------------------------饼图结束-----------------------------
    //发送查询请求
    axios({
        method: 'get',
        url: '/student/list'
    }).then(res => {
        // console.log(res)
        if (res.status === 200 && res.data.code === 0) {
            //取出res.data.data
            let arr = res.data.data
            // 定义一个数组对象
            let newPieOption = [{ value: 0, name: arr[0].province }]
            // console.log(newPieOption)
            arr.forEach(v => {  //遍历出省份
                // console.log(v.province) 省份

                //假设法
                let flag = false
                for (let i = 0; i < newPieOption.length; i++) {
                    //当存在时
                    if (v.province === newPieOption[i].name) {
                        flag = true
                        newPieOption[i].value++
                        break
                    }
                }
                //不存在时
                if (flag == false) {
                    newPieOption.push({ value: 1, name: v.province })
                }
            })
            // console.log(newPieOption)
            //重新赋值
            pieOption.series[0].data = newPieOption
            //使用刚指定的配置项和数据显示图表
            myPieChart.setOption(pieOption);
        }
    })
}