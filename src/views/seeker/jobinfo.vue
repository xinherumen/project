<template>
  <div class="common-layout">
    <span>{{joblist.title}}</span>
    <span>{{joblist.education}}</span>
    <span>{{joblist.company}}</span>
    <span>{{joblist.hiringManager}}</span>
    <span>{{joblist.salary}}</span>
    <span>{{joblist.address}}</span>
    <span>{{joblist.description}}</span>
    <el-button type="primary" @click="contrast()">点击查看我与此岗位的对比</el-button>
  </div>
  <div v-show="showdraw">
     <!-- Canvas 元素用于绘制雷达图 -->
     <canvas ref="radarChartCanvas" class="radar-chart-canvas" v-show="showdraw"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { xiangxidata } from '@/api/seeker/type'
import request from '@/utils/request'
import { ElNotification } from 'element-plus';
import Chart from 'chart.js/auto';
const radarChartCanvas = ref(); // 创建一个 ref，用于存储 Canvas 元素的引用
const showdraw = ref(false);//默认不显示雷达图
const joblist = ref({
  jobid: 0,
  title: '',
  education: '',
  company: '',
  hiringManager: '',
  salary: '',
  address: '',
  description: ''
});
interface jobitem {
  jobid:number
  title: string
  education:string
  company:string
  hiringManager:string
  salary:string
  address:string
  description:string
}
const getdata=()=>{
  let jobid = sessionStorage.getItem('jobid');
// 如果sessionStorage中没有jobid，则从localStorage获取
if (!jobid) {
    jobid = localStorage.getItem('jobid');
    // 将从localStorage获取的值存储到sessionStorage中
    //@ts-ignore
    sessionStorage.setItem('jobid', jobid);
}
  const url = '/seeker/xiangxi?jobid='+jobid;
  const result: Promise<xiangxidata>= request.get<any,xiangxidata>(url);
    result.then((response) => {
    if (response.code == 200) {
        // 如果返回的 code 是 200，则更新 lists 值
        //@ts-ignore
        joblist.value = response.data;
        // 设置 loading 为 false
    } else {
        // 处理其他状态码的情况
        ElNotification({
      type:'error',
      message:response.msg,
      title: `获取信息失败`
    });
    }
}).catch((error) => {
    // 处理请求失败的情况
    console.error('Request failed:', error);
});
}
const leidatu=()=>{
    // 获取 Canvas 元素的上下文
    const ctx = radarChartCanvas.value.getContext('2d');

// 使用 Chart.js 创建雷达图
new Chart(ctx, {
  type: 'radar', // 指定图表类型为雷达图
  data: {
    labels: ['A', 'B', 'C', 'D', 'E'], // 雷达图的标签
    datasets: [
      // 第一个数据集
      {
        label: 'Dataset 1', // 数据集的标签
        data: [10, 20, 30, 40, 50], // 数据集的数据
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // 数据集的背景颜色
        borderColor: 'rgba(255, 99, 132, 1)', // 数据集的边框颜色
        borderWidth: 1 // 数据集的边框宽度
      },
      // 第二个数据集
      {
        label: 'Dataset 2', // 数据集的标签
        data: [20, 30, 40, 50, 60], // 数据集的数据
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // 数据集的背景颜色
        borderColor: 'rgba(54, 162, 235, 1)', // 数据集的边框颜色
        borderWidth: 1 // 数据集的边框宽度
      }
    ]
  },
  options: {
    scales: {
      r: {
        suggestedMin: 0, // 雷达图的最小值
        suggestedMax: 100 // 雷达图的最大值
      }
    }
  }
});
// 设置 Canvas 元素的宽度和高度
radarChartCanvas.value.width = 1; // 设置宽度
      radarChartCanvas.value.height = 1; // 设置高度
}
const contrast=()=>{
  leidatu();
  showdraw.value=true;
}
onMounted (()=>{
 getdata();
})
</script>
<style scoped lang="scss">
  .radar-chart-canvas {
    width: 400px !important; /* 设置宽度 */
  height: 400px !important; /* 设置高度 */
}
</style>