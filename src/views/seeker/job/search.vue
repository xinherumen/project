<template>
    <div>
       <div class="seachdiv">
        <el-row>
            <el-col :span="3">
              <el-select v-model="city" 
              placeholder="地区" 
              class="selectdiqu"  
              style="width: 100%;"
              popper-class="eloption"
            :popper-append-to-body="true">
    <el-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
    </el-option>
  </el-select>
            </el-col>
            <el-col :span="17">
                <el-input  class="custom-input"
                placeholder="职位/公司" 
                :prefix-icon="Search" 
                v-model="input"/>
            </el-col>
            <el-col :span="4">
                <el-button class="seachbutton" type="primary" @click="find()" >搜索</el-button>
            </el-col>
        </el-row>
        <el-select v-model="salary" 
              placeholder="薪资" 
              class="selectdiqu"  
              style="width: 12.5%;"
              popper-class="eloption"
            :popper-append-to-body="true">
    <el-option
      v-for="item in salarys"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
    </el-option>
  </el-select>
  <el-select v-model="education" 
              placeholder="学历" 
              class="selectdiqu"  
              style="width: 12.5%;"
              popper-class="eloption"
            :popper-append-to-body="true">
    <el-option
      v-for="item in educations"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
    </el-option>
  </el-select>
       </div>
  <div style="width:100%; top:50px">
      <!-- <el-space direction="vertical" alignment="flex-start" style="width:100%;"> -->
    <el-skeleton style="width: 100%" :loading="loading" animated :count="3">
      <template #template>
        <el-skeleton-item variant="image" style="width: 400px; height: 267px" />
        <div style="padding: 14px">
          <el-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              flex-direction: column;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item variant="text" style="margin-right: 16px" />
            <el-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <div class="job-listings">
  <el-card v-for="item in lists" :key="item.jobId" class="job-card" :header="item.title" @click="goto(item)">
    <p><el-icon><OfficeBuilding /></el-icon><span class="label">公司：</span> {{ item.company }}</p>
    <p><el-icon><Money /></el-icon><span class="label">薪水：</span> {{ item.salary }}</p>
    <p><el-icon><Reading /></el-icon><span class="label">学历要求：</span> {{ item.education }}</p>
    <p><el-icon><User /></el-icon><span class="label">HR：</span> {{ item.hiringManager }}</p>
    <p><el-icon><Location /></el-icon><span class="label">地址：</span> {{ item.address }}</p>
    <el-link :href="item.link" target="_blank">查看详情</el-link>
  </el-card>
</div>
      </template>
    </el-skeleton>
  <!-- </el-space> -->
    </div>
    <div>
      <el-pagination
      v-model="currentPage"
      background
      layout="prev, pager, next"
      :total="totalItems"
      class="mt-4"
      @current-change="handleCurrentChange"
    />
    </div>
     </div>
   </template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import {local,salary1,education1} from '@/utils/select'
import request from '@/utils/request'
import type { JobListResponse } from '@/api/seeker/type'
import { ElNotification } from 'element-plus';
const loading = ref(true)
const lists = ref<ListItem[]>([
])
const city = ref(null)
const cities =local;
const salary = ref(null)
const salarys = salary1;
const education = ref(null)
const educations = education1;
const input = ref(null)
const currentDate = new Date().toDateString()
const currentPage = ref(1);
const totalItems = ref(50);
//获取对应页面数据
const getpagedata = (url:string)=>{
  const result: Promise<JobListResponse>= request.get<any,JobListResponse>(url);
    result.then((response) => {
    if (response.code == 100) {
        // 如果返回的 code 是 200，则更新 lists 值
        //@ts-ignore
        lists.value = response.data.list;
        totalItems.value=response.data.total;
        // 设置 loading 为 false
        loading.value = false;
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
//处理切换页面事件
const handleCurrentChange = (page: number) => {
      // 处理页码变化事件
      console.log("页码变为:", page)
      loading.value = true;
      let url='';
      if(input.value==null&&education.value==null&&salary.value==null&&city.value==null){
       url='/seeker/getTopJob/'+page;
    }else{
       url = '/seeker/selectPosition'+'?page='+page+'&salary='+ salary.value +'&adress=' +city.value+'&education='+education.value;
    };
    // console.log(url);
      getpagedata(url);
      loading.value = true;
    };

//获取路由器对象
let $router = useRouter()

interface ListItem {
  jobId:number
  title: string
  education:string
  company:string
  hiringManager:string
  salary:string
  address:string
  link:string
}
console.log()
//点击对应卡片后的跳转
const goto = (item : ListItem)=>{
  console.log(item.jobId);
  const jobId =  item.jobId;
  localStorage.setItem('jobId', jobId.toString());
  // $router.push('xiangxi');
  window.open('/xiangxi', '_blank');
}
//搜索按钮调用
const find = ()=>{
  if(input.value==null&&education.value==null&&salary.value==null&&city.value==null){
    ElNotification({
      type:'',
      message:'搜索条件输入不能为空',
      title: `搜索为空`
  })
  // const jobid = localStorage.getItem('jobid');
  // console.log(jobid);
  return;
}
//page,salary,adress,education 
  const url = '/seeker/selectPosition'+'?page=1'+'&salary='+ salary.value +'&adress=' +city.value+'&education='+education.value;
  getpagedata(url);
}
onMounted(() => {
  loading.value = false
  const page=1;
  const url='/seeker/getTopJob/'+page;
  getpagedata(url);
  console.log('你好');
  let token = localStorage.getItem('TOKEN');
  console.log(token);

})
</script>
<style scoped lang="scss">

.seachdiv{
    height: 70px;
    border-radius: 10px; /* 将所有角落设置为相同的圆角 */
    width: 80%;
    // position: fixed; /* 设置固定定位 */
    // top: 50px; /* 例如，设置距离页面顶部的距离 */
    // z-index: 999; /* 可选，设置盒子的层级 */
    // background-color: rgb(255, 255, 255);
}
.seachbutton{
    width: 100%;
     /* 设置边框宽度为0像素 */
    border-width: 0px;
    // background-color: #85d6da;
    text-align: right;
}
.custom-input {
  // padding-left: 10px;
  width: 100%;
  /* 设置边框宽度为1像素 */
  border-width: 0px;
  /* 设置边框样式为实线 */
  border-style: solid;
  /* 设置边框颜色为灰色 */
  border-color: #85d6da;
  border-radius: 20px;
}
.image{
  width:100px;
  height:100px;
}
.job-listings {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.job-card {
  width: calc(50% - 10px); /* Adjust card width as needed */
  margin-bottom: 20px;
}
.label {
  display: inline-block;
  width: 80px; /* Adjust width as needed */
  font-weight: bold;
}
.description {
  margin-left: 80px; /* Same width as the label */
  display: block;
  margin: 0;
  line-height: 1.5; /* 根据需要调整行高 */
}
  </style>