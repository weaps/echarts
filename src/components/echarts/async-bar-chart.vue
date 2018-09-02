<template>
  <div>
    <div id="echartContainer" style="width:100%; height:500px;"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { option } from './aysnc-barChart-option'
import { mapGetters } from 'vuex'
export default {
  name: 'bar-echart',
  data () {
    return {
      seriesdata: []
    }
  },
  props: ['getentitydata'],
  computed: {
    ...mapGetters([
      'data1'
    ]),
    subject () {
      return this.$store.state.data1
    }
  },
  methods: {
    drawBarChart () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById('echartContainer'))
      // 绘制基本图表
      myChart.setOption(option)
      axios.get('../../../static/mock/package.json').then(res => {
        this.seriesdata = res.data.data.entity
        console.log(this.seriesdata)
        let totalNum = []
        let subjectName = []
        this.seriesdata.forEach(function (item, index) {
          totalNum.push(item.totalNum)
          subjectName.push(item.subjectName)
          myChart.setOption({
            series: [{
              data: totalNum
            }],
            xAxis: [{
              data: subjectName
            }]
          })
        })
      })
      myChart.hideLoading()
      // myChart.setOption({
      //   series: [{
      //     data: this.getentitydata
      //   }]
      // })
      // 获取数据
      // this.$http.get('src/data/asyncBarChart.json').then(res => {
      //   myChart.hideLoading()
      //   myChart.setOption({
      //     series: [{
      //       // 将异步请求获取到的数据进行装载
      //       data: res.data.product
      //     }]
      //   })
      // })
    }
  },
  mounted () {
    // 调用drawBarChart()
    this.drawBarChart()
  }
}
</script>

<style>
  #echartContainer {
    background: #fff;
  }
</style>
