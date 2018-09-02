<template>
  <div>
    <div id="echartLineContainer" style="width:100%; height:500px;"></div>
  </div>
</template>

<script>
import axios from 'axios'
import { lineBar } from './aysnc-barChart-option'
import { mapGetters } from 'vuex'
export default {
  name: 'line-echart',
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
      var myChart = this.$echarts.init(document.getElementById('echartLineContainer'))
      // 绘制基本图表
      myChart.setOption(lineBar)
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
