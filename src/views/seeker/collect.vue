<template>
    <div>
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
        <div
        style="display: flex;
              align-items: center;
              flex-direction: column;
              height:800px;
              width:100%;"
        >
        <el-card
          v-for="item in lists"
          :key="item.jobid"
          :body-style="{ padding: '0px', marginBottom: '1px' }"
          style="width:100%;"
          @click= "goto(item)"
        >
        <el-row>
          <el-col :span="12">
          </el-col>
          <el-col :span="12">
            <div style="padding: 14px">
            <span><el-icon><SuitcaseLine /></el-icon>{{ item.title }}</span>
            <span><el-icon><Reading /></el-icon>{{ item.education }}</span>
            <span><icon></icon>{{ item.company }}</span>
            <span><icon></icon>{{ item.hiringManager }}</span>
            <span><icon></icon>{{ item.salary }}</span>
            <span><icon></icon>{{ item.address }}</span>
            <div class="bottom card-header">
            </div>
          </div>
          </el-col>
        </el-row>
        </el-card>
      </div>
      </template>
    </el-skeleton>
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
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import {local,salary1,education1} from '@/utils/select'
import request from '@/utils/request'
import type { companydata } from '@/api/seeker/type'
import { ElNotification } from 'element-plus';
const loading = ref(true)
const lists = ref<ListItem[]>([])
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
  const result: Promise<companydata>= request.get<any,companydata>(url);
    result.then((response) => {
    if (response.code == 200) {
        // 如果返回的 code 是 200，则更新 lists 值
        //@ts-ignore
        lists.value = response.data;
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
      let url='/seeker/getCollection'+'?page='+page;
    // console.log(url);
      getpagedata(url);
      loading.value = true;
    };

//获取路由器对象
let $router = useRouter()

interface ListItem {
  jobid:number
  title: string
  education:string
  company:string
  hiringManager:string
  salary:string
  address:string
}
//点击对应卡片后的跳转
const goto = (item : ListItem)=>{
  const jobid =  item.jobid;
  localStorage.setItem('jobid', jobid.toString());
  // $router.push('xiangxi');
  window.open('/xiangxi', '_blank');
}
onMounted(() => {
  loading.value = false
  const page=1;
  const url='/seeker/getCollection'+'?page='+page;
  getpagedata(url);
})
  </script>
  <style scoped lang="scss">
    
  </style>