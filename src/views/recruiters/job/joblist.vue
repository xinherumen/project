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
        <div class="job-listings">
  <el-card v-for="item in lists" :key="item.jobId" class="job-card" :header="item.title">
    <p><el-icon><OfficeBuilding /></el-icon><span class="label">公司：</span> {{ item.company }}</p>
    <p><el-icon><Money /></el-icon><span class="label">薪水：</span> {{ item.salary }}</p>
    <p><el-icon><Reading /></el-icon><span class="label">学历要求：</span> {{ item.education }}</p>
    <p><el-icon><User /></el-icon><span class="label">HR：</span> {{ item.hiringManager }}</p>
    <p><el-icon><Location /></el-icon><span class="label">地址：</span> {{ item.address }}</p>
    <el-link :href="item.link" target="_blank">查看详情</el-link>
    <el-button type="primy" @click="goto(item)"></el-button>
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
    <el-dialog
      title="修改信息"
      v-model="dialogVisible"
      width="30%"
    >
      <!-- 弹窗中的表单 -->
      <div class="form-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="forms"
      label-width="120px"
      class="demo-form"
    >
      <el-form-item label="公司" prop="company">
        <el-input v-model="form.company"></el-input>
      </el-form-item>
      <el-form-item label="职位" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="薪水" prop="salary">
        <el-input v-model="form.salary"></el-input>
      </el-form-item>
      <el-form-item label="教育程度" prop="education">
        <el-input v-model="form.education"></el-input>
      </el-form-item>
      <el-form-item label="工作要求" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="招聘经理" prop="hiringManager">
        <el-input v-model="form.hiringManager"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" :loading="loading">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button @click="out()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
    </el-dialog>
  </template>
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import {local,salary1,education1} from '@/utils/select'
import request from '@/utils/request'
import type { companydata } from '@/api/seeker/type'
import { ElNotification } from 'element-plus';
import type { select} from '@/api/seeker/type';
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
// 定义弹窗的状态
const dialogVisible = ref(false);
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
        // totalItems.value = response.data.pageNum;
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
      let url='/recruiters/getRequirement'+'?page='+page;
    // console.log(url);
      getpagedata(url);
      loading.value = true;
    };

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
// 表单数据和验证规则
let form = ref({
  company: '',
  title: '',
  salary: '',
  education: '',
  description: '',
  hiringManager: '',
  address: '',
  link: ''
});

let formfront = {
  company: '',
  title: '',
  salary: '',
  education: '',
  description: '',
  hiringManager: '',
  address: '',
  link: ''
};

const forms = ref();
const rules = {
  company: [{ required: true, message: '请输入公司', trigger: 'blur' }],
  title: [{ required: true, message: '请输入职位', trigger: 'blur' }],
  salary: [{ required: true, message: '请输入薪水', trigger: 'blur' }],
  education: [{ required: true, message: '请输入教育程度', trigger: 'blur' }],
  description: [{ required: true, message: '请输入工作要求', trigger: 'blur' }],
  hiringManager: [{ required: true, message: '请输入招聘经理', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  link: [{ required: true, message: '请输入链接', trigger: 'blur' }]
};
const out =()=>{
    dialogVisible.value = false;
}
//点击对应卡片后的跳转
const goto = (item : ListItem)=>{
  const jobid =  item.jobId;
  localStorage.setItem('jobid', jobid.toString());
  dialogVisible.value = true;
  //@ts-ignore
  form.value = item;
  //@ts-ignore
  formfront.value = item;
  // $router.push('xiangxi');
}
onMounted(() => {
  loading.value = false
  const page=1;
  const url='/seeker/getBrowsingHistory'+'?page='+page;
  getpagedata(url);
})
// 提交和重置表单的方法
const submitForm = async () => {
  await forms.value.validate();
  loading.value = true;
  const url = '/recruiters/modifyRequirement';
  const data = form.value;
  console.log(data);
  const result: Promise<select> = request.post<any, select>(url, data);
  result.then((response) => {
      if (response.code == 100) {
        // 如果返回的 code 是 200，则更新 lists 值
        ElNotification({
          type: 'success',
          message: response.msg,
          title: `修改成功`
        });
        // 设置 loading 为 false
        loading.value = false;
        dialogVisible.value = false;
      } else {
        // 处理其他状态码的情况
        ElNotification({
          type: 'error',
          message: response.msg,
          title: `获取信息失败`
        });
      }
    })
    .catch((error) => {
      // 处理请求失败的情况
      console.error('Request failed:', error);
    });
};

const resetForm = () => {
  form.value = formfront;
};
  </script>
  <style scoped lang="scss">
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