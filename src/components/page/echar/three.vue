<template>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div id="main" style="width: 100%; height: 500px"></div>
</template>

<script>
import * as echarts from "echarts";
import { request } from "netWork/axios";
import _ from "lodash";
export default {
  data() {
    return {
      // 指定图表的配置项和数据
      option: {
    title: {
        text: '南丁格尔玫瑰图',
        subtext: '纯属虚构',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '半径模式',
            type: 'pie',
            radius: [20, 140],
            center: ['25%', '50%'],
            roseType: 'radius',
            itemStyle: {
                borderRadius: 5
            },
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true
                }
            },
            data: [
                {value: 40, name: 'rose 1'},
                {value: 33, name: 'rose 2'},
                {value: 28, name: 'rose 3'},
                {value: 22, name: 'rose 4'},
                {value: 20, name: 'rose 5'},
                {value: 15, name: 'rose 6'},
                {value: 12, name: 'rose 7'},
                {value: 10, name: 'rose 8'}
            ]
        },
        {
            name: '面积模式',
            type: 'pie',
            radius: [20, 140],
            center: ['75%', '50%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 5
            },
            data: [
                {value: 30, name: 'rose 1'},
                {value: 28, name: 'rose 2'},
                {value: 26, name: 'rose 3'},
                {value: 24, name: 'rose 4'},
                {value: 22, name: 'rose 5'},
                {value: 20, name: 'rose 6'},
                {value: 18, name: 'rose 7'},
                {value: 16, name: 'rose 8'}
            ]
        }
    ]
}
    };
  },
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 返回数据
    const { data: res } = await request({ url: "reports/type/1" });
    // 合并数据
    const alldata = _.merge(res.data, this.option);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(alldata);
  },
};
</script>