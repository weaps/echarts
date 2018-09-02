<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col-lg-6">
        <async-bar :getentitydata="getentitydata"></async-bar>
      </div>
      <div class="col-lg-6">
        <line-echart></line-echart>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import asyncBar from './components/echarts/async-bar-chart'
import { mapMutations } from 'vuex'
import lineEchart from './components/echarts/async-line-chart'
export default {
  name: 'App',
  data () {
    return {
      subjectName: [],
      totalNum: [],
      subjectCode: [],
      entityData: []
    }
  },
  components: {
    asyncBar,
    lineEchart
  },
  mounted () {
    // 绘制图表
    this.getHomeInfo()
  },
  computed: {
    getentitydata () {
      let listsubjectName = []
      // let listtotalNum = []
      // let listsubjectCode = []
      this.entityData.forEach((data) => {
        listsubjectName.push(data.subjectName)
        // listtotalNum.push(data.totalNum)
        // listsubjectCode.push(data.subjectCode)
      })
      return [listsubjectName]
    }
  },
  methods: {
    getHomeInfo () {
      axios.get('../static/mock/package.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      res = res.data
      if (res.code === 0 && res.data) {
        const data = res.data
        this.entityData = data.entity
        this.setData(this.entityData)
      }
      console.log(this.getentitydata)
    },

    ...mapMutations({
      setData: 'SET_DATA'
    })
  }
}
</script>
