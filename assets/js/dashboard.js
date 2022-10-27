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

    //--------------------------线图开始-----------------------------
    let myLineChart = echarts.init(document.querySelector('.row > .line'));
    let lineOption = {
        //标题
        title: {
            text: '薪资 Salary',
            textStyle: {
                color: '#6d767e'
            }
        },
        //鼠标移入事件
        tooltip: {
            trigger: 'axis',
            //位置
            position: function (option) {
                return [option[0] + 10, option[1] + 10]
            }
        },
        //图例组件
        legend: {
            top: 20
        },
        xAxis: {
            type: 'category',
            //坐标轴两边留白策略
            boundaryGap: true,
            data: ['张三', '李四', '张飞', '赵云', '狗哥', '张三', '李四', '张飞', '赵云', '狗哥', '张三', '李四', '张飞', '赵云', '狗哥', '张三', '李四', '张飞', '赵云', '狗哥']
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                formatter: '{value}'
            },
            interval: 5000
        },
        //数据缩放
        dataZoom: [
            {
                type: 'slider',
                start: 0,
                end: 60
            }
        ],
        series: [
            {
                name: '期望薪资',
                type: 'line',
                //是否平滑显示
                smooth: true,
                //不显示标记点
                symbol: 'none',
                //线条和标记的样式
                itemStyle: {
                    color: '#ee6666'
                },
                //线条样式的设置
                // lineStyle:{
                //   color:'pink'
                // },
                //线条下方区域的样式设置
                // areaStyle:{
                //   color:'skyblue'
                // },
                data: [8300, 9600, 15000, 30000, 12000, 8300, 9600, 15000, 17000, 12000, 8300, 9600, 15000, 17000, 12000, 8300, 9600, 15000, 17000, 12000],
            },
            {
                name: '实际薪资',
                type: 'line',
                smooth: true,
                symbol: 'none',
                itemStyle: {
                    color: '#5470c6'
                },
                data: [9600, 15000, 17000, 12000, 8300, 9600, 15000, 17000, 12000, 8300, 9600, 15000, 17000, 12000, 8300, 9600, 15000, 17000, 12000, 13000],
            }
        ]
    };
    // myLineChart.setOption(lineOption);
    //==------------------------线图开始-----------------------------

    // =================================柱状图开始====================================
    let bar = echarts.init(document.querySelector('.barChart'));
    let Baroption = {
        //鼠标移入的提示
        tooltip: {
            trigger: 'axis',
            //指示器类型。
            axisPointer: {
                //阴影指示器
                type: 'cross'
            }
        },
        legend: {
            data: ['平均分', '低于60分人数', '60到80之间', '高于80分人数']
        },
        // 类似于内边距
        grid: {
            top: 30,
            bottom: 30,
            left: '7%',
            right: '7%'
        },
        //x轴
        xAxis: [
            {
                type: 'category',
                //刻度
                axisTick: { show: true },
                data: ['1组', '2组', '3组', '4组', '5组', '6组', '7组'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        //y轴
        yAxis: [
            {
                type: 'value',
                //最大最小
                min: 0,
                max: 100,
                //强制设置坐标轴分割间隔
                interval: 10,
                //控制整个Y轴是否显示的
                // show:true,
                //控制轴线的
                // axisLine:{
                //   show:true
                // },
                //轴文本
                axisLabel: {
                    formatter: function (value) {
                        return value + '分';
                    }
                }
            },
            {
                type: 'value',
                //最大最小
                min: 0,
                max: 10,
                //强制设置坐标轴分割间隔
                interval: 1,
                //控制整个Y轴是否显示的
                // show:true,
                //控制轴线的
                // axisLine:{
                //   show:true
                // },
                //轴文本
                axisLabel: {
                    formatter: function (value) {
                        return value + '人';
                    }
                }
            }
        ],
        series: [
            {
                name: '平均分',
                type: 'bar',
                //不同柱子之间的间隙
                barGap: '10%',
                //柱条的宽度
                barWidth: '20%',
                //高亮的图形样式和标签样式。
                emphasis: {
                    //none' 不淡出其它图形，默认使用该配置。
                    focus: 'none'
                },
                data: [83, 57, 90, 78, 66, 76, 77, 87, 69, 92, 88, 78],
                //表示这个图例使用的是第一条Y轴
                yAxisIndex: 0
            },
            {
                name: '低于60分人数',
                type: 'bar',
                data: [2, 1, 3, 4, 2, 5, 2, 2, 4, 1, 6, 2],
                //表示这个图例使用的是第二条Y轴
                yAxisIndex: 1
            },
            {
                name: '60到80之间',
                type: 'bar',
                data: [3, 2, 1, 5, 1, 2, 3, 4, 5, 2, 2, 4],
                //表示这个图例使用的是第二条Y轴
                yAxisIndex: 1
            },
            {
                name: '高于80分人数',
                type: 'bar',
                data: [3, 2, 1, 5, 1, 2, 3, 4, 5, 2, 2, 4],
                //表示这个图例使用的是第二条Y轴
                yAxisIndex: 1
            }
        ]
    };
    // bar.setOption(Baroption);

    //分装函数 
    function getCi(cishu = 1) {
        axios({
            method: "get",
            url: '/score/batch',
            params: {
                batch: cishu
            }

        }).then(res => {
            // console.log(res);
            if (res.status === 200 && res.data.code === 0) {
                // avgScore
                Baroption.xAxis[0].data = res.data.data.group.map(v => {
                    return v + "组"
                })
                Baroption.series[0].data = res.data.data.avgScore

                Baroption.series[1].data = res.data.data.lt60

                Baroption.series[2].data = res.data.data.gt60
                Baroption.series[3].data = res.data.data.gt60
                bar.setOption(Baroption);
            }
        });

    }

    getCi()
    let batch = document.getElementById('batch')
    document.querySelector('.bar span.btn').addEventListener('click', function () {
        if (batch.style.display == 'none') {
            batch.style.display = 'block'

        } else {
            batch.style.display = 'none'
        }
    });
    batch.querySelectorAll('li').forEach((v, i) => {
        v.onclick = function () {
            getCi(i + 1)
        }
    })
    // =================================柱状图结束====================================
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

            //===========================折线图真实数据开始===============================
            let lineName = [];
            let linesalary = [];
            let lineTruesalary = []
            arr.forEach(v => {
                lineName.push(v.name)
                linesalary.push(v.salary)
                lineTruesalary.push(v.truesalary)
            })
            lineOption.xAxis.data = lineName
            lineOption.series[0].data = linesalary
            lineOption.series[1].data = lineTruesalary

            myLineChart.setOption(lineOption);

            //===========================折线图真实数据结束===============================

        }
    })
}