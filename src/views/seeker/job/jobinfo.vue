<template>
  <div class="common-layout" style="width: 830px;height: 100%;margin: 0 auto;">
    <el-row style="margin-top: 30px">
    <el-col :span="24">
      <el-card style="height: 200px;width: 830px;position: relative"><br/>
      <el-text style="font: italic bold 25px 'Times New Roman'">{{ joblist.title }}</el-text>
      <br/>
      <p><el-icon><OfficeBuilding /></el-icon><span class="label">公司：</span> {{ joblist.company }}</p>
      <p><el-icon><Money /></el-icon> {{ joblist.salary }}</p>
      <p><el-icon><Reading /></el-icon>{{ joblist.education }}</p>
      <p><el-icon><User /></el-icon> {{ joblist.hiringManager }}</p>
      <p><el-icon><Location /></el-icon> {{ joblist.address }}</p>
        <el-button type="primary" @click="contrast()" style="position:absolute;right: 10px;top: 40px">查看我与此岗位的对比</el-button>
        <el-button type="primary" @click="select()" style="position: absolute;right: 70px;bottom: 40px">
        <el-icon style="margin-right:10px" >
          <component :is="collect ? 'StarFilled' : 'Star'"></component>
      </el-icon>
      收藏</el-button>
      </el-card>
    </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card style="height: auto;width: 830px;">
            <p><el-icon><SuitcaseLine /></el-icon><span class="label">岗位描述：</span><br/>   <span class="description">
          <span v-for="(sentence, index) in splitDescription(joblist.description)" :key="index">{{ sentence }}<br></span>
        </span></p>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" >
      <el-col :span="5" v-show="showdraw">   </el-col>
      <el-col :span="14" v-show="showdraw">
        <el-card style="height: auto; width:auto">
          <canvas ref="radarChartCanvas" class="radar-chart-canvas" v-show="showdraw"></canvas>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12" v-show="showdraw">
        <el-card style="height: 150px;width: 830px">
          <el-text style="font: italic bold 25px 'Times New Roman'">我与该岗位的匹配度评分：</el-text><br/>
          <el-text style="font: normal bold 16px 'Fira Sans'"><br/>我的建议是回炉重造</el-text>
          <el-text style="font: italic bold 25px 'Times New Roman'">建议：</el-text>
          <el-text style="font: normal bold 16px 'Fira Sans'"><br/>我的建议是回炉重造</el-text>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { xiangxidata,select} from '@/api/seeker/type'
import request from '@/utils/request'
import { ElNotification } from 'element-plus';
import Chart from 'chart.js/auto';
const radarChartCanvas = ref(); // 创建一个 ref，用于存储 Canvas 元素的引用
const showdraw = ref(false);//默认不显示雷达图
let jobid = sessionStorage.getItem('jobId');
// 如果sessionStorage中没有jobid，则从localStorage获取
if (!jobid) {
    jobid = localStorage.getItem('jobId');
    // 将从localStorage获取的值存储到sessionStorage中
    //@ts-ignore
    sessionStorage.setItem('jobId', jobid);
}
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
//@ts-ignore
const joblist = ref<jobitem>({
  jobid:0,
  title: '',
  education:'',
  company:'',
  hiringManager:'',
  salary:'',
  address:'',
  description:''
});
const collect = ref(false)
const getcollect=()=>{
  const url = '/seeker/checkCollection/'+jobid;
  const result: Promise<select>= request.get<any,select>(url);
    result.then((response) => {
    if (response.code == 100) {
        // 如果返回的 code 是 200，则更新 lists 值
        //@ts-ignore
        collect.value = response.data;
        // 设置 loading 为 false
    } else {
        // 处理其他状态码的情况
        ElNotification({
      type:'success',
      message:response.msg,
      title: ``
    });
    }
}).catch((error) => {
    // 处理请求失败的情况
    console.error('Request failed:', error);
});
}
const getdata=()=>{
  const url = '/seeker/getJobInfo/'+jobid;
  const result: Promise<xiangxidata>= request.get<any,xiangxidata>(url);
    result.then((response) => {
    if (response.code == 100) {
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
    labels: ['交流', '实践', '技能', '编程语言', '编程框架'], // 雷达图的标签
    datasets: [
      // 第一个数据集
      {
        label: '我的指标', // 数据集的标签
        data: [10, 20, 30, 40, 50], // 数据集的数据
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // 数据集的背景颜色
        borderColor: 'rgba(255, 99, 132, 1)', // 数据集的边框颜色
        borderWidth: 1 // 数据集的边框宽度
      },
      // 第二个数据集
      {
        label: '职业要求', // 数据集的标签
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
        suggestedMax: 10 // 雷达图的最大值
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
const select=()=>{
  if(collect.value == false){
  const url = '/seeker/collection';
  const data={
    jobid:jobid
  }
  const result: Promise<select>= request.post<any,select>(url,data);
    result.then((response) => {
    if (response.code == 100) {
      collect.value=true;
        ElNotification({
      type:'success',
      message:response.msg,
      title: `收藏成功`
    });
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
}else{
  const url = '/seeker/deleteCollection/'+jobid;
  const data={
  }
  const result: Promise<select>= request.post<any,select>(url,data);
    result.then((response) => {
    if (response.code == 100) {
      collect.value=false;
        ElNotification({
      type:'success',
      message:response.msg,
      title: `收藏成功`
    });
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
}}
onMounted (()=>{
 getdata();
getcollect();
})

const splitDescription = (description: string): string[] => {
  // 利用正则表达式将描述按照句号、中文冒号以及前面的内容分割成数组
  const regex = /([。：】；;:])/;
  //@ts-ignore
  let result = [];
  let temp = '';

  description.split(regex).forEach((part) => {
    if (part.match(regex)) {
      // 如果当前部分是句号或中文冒号，则将其与之前的部分连接起来
      temp += part;
      result.push(temp);
      temp = '';
    } else {
      // 如果当前部分不是句号或中文冒号，则将其存储到临时变量中
      temp = part;
    }
  });
   //@ts-ignore
  return result;
};
</script>
<style scoped lang="scss">
  .radar-chart-canvas {
    width: 400px !important; /* 设置宽度 */
  height: 400px !important; /* 设置高度 */
}
  .el-row {
    margin-top: 10px;
  }
  .el-text {
    color: black;
  }
</style>