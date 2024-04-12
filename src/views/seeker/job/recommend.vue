<template>
  <div class="job-listings">
    <el-card  v-for="job in jobList" :key="job.jobId" class="job-card" :header="job.title">
      <p><el-icon><OfficeBuilding /></el-icon><span class="label">公司：</span> {{ job.company }}</p>
      <p><el-icon><Money /></el-icon><span class="label">薪水：</span> {{ job.salary }}</p>
      <p><el-icon><Reading /></el-icon><span class="label">学历要求：</span> {{ job.education }}</p>
      <p><el-icon><SuitcaseLine /></el-icon><span class="label">岗位描述：</span>   <span class="description">
          <span v-for="(sentence, index) in splitDescription(job.description)" :key="index">{{ sentence }}<br></span>
        </span></p>
      <p><el-icon><User /></el-icon><span class="label">HR：</span> {{ job.hiringManager }}</p>
      <p><el-icon><Location /></el-icon><span class="label">地址：</span> {{ job.address }}</p>
      <el-link :href="job.link" target="_blank">查看详情</el-link>
    </el-card>
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
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '@/utils/request'
import type { JobListResponse } from '@/api/seeker/type'
import { ElNotification } from 'element-plus';
interface Job {
  jobId: number;
  title:string;
  company: string;
  salary: string;
  education: string;
  description: string;
  hiringManager: string;
  address: string;
  link: string;
}
const currentPage = ref(1);
const totalItems = ref(50);
const jobList = ref<Job[]>([
]);
//获取对应页面数据
const getpagedata = (url:string)=>{
  const result: Promise<JobListResponse>= request.get<any,JobListResponse>(url);
    result.then((response) => {
    if (response.code == 100) {
        // 如果返回的 code 是 200，则更新 lists 值
        //@ts-ignore
        jobList.value = response.data.list;
        totalItems.value=response.data.total;
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
      let url='/seeker/getJob/'+page
    // console.log(url);
      getpagedata(url);
    };


const splitDescription = (description: string): string[] => {
  // 利用正则表达式将描述按照句号、中文冒号以及前面的内容分割成数组
  const regex = /([。：】；])/;
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
onMounted(()=>{
  const url='/seeker/getJob/'+1
  getpagedata(url);
})
</script>

<style scoped>
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
