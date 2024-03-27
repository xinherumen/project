<template>
    <div>
       <div class="seachdiv">
        <el-row>
            <el-col :span="3">
              <el-select v-model="value" 
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
                :prefix-icon="Search" />
            </el-col>
            <el-col :span="4">
                <el-button class="seachbutton" type="primary" >搜索</el-button>
            </el-col>
        </el-row>
        <el-select v-model="value" 
              placeholder="地区" 
              class="selectdiqu"  
              style="width: 12.5%;"
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
  <el-select v-model="value" 
              placeholder="地区" 
              class="selectdiqu"  
              style="width: 12.5%;"
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
  <el-select v-model="value" 
              placeholder="地区" 
              class="selectdiqu"  
              style="width: 12.5%;"
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
       </div>
  <div style="width:100%; top:50px">
      <!-- <el-space direction="vertical" alignment="flex-start" style="width:100%;"> -->
    <el-button @click="setLoading">Click me to reload</el-button>
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
        >
        <el-row>
          <el-col :span="12">
            <img :src="item.imgUrl" class="image" />
          </el-col>
          <el-col :span="12">
            <div style="padding: 14px">
            <span>{{ item.title }}</span>
            <span>{{ item.education }}</span>
            <span>{{ item.company }}</span>
            <span>{{ item.hiringManager }}</span>
            <span>{{ item.salary }}</span>
            <span>{{ item.address }}</span>
            <div class="bottom card-header">
              <div class="time">{{ currentDate }}</div>
              <el-button text class="button">详细信息</el-button>
            </div>
          </div>
          </el-col>
        </el-row>
        </el-card>
      </div>
      </template>
    </el-skeleton>
  <!-- </el-space> -->
    </div>
    <div>
      <el-pagination
      :page-sizes="[10, 20, 30, 40]" 
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
    </div>
     </div>
   </template>
<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue'

interface ListItem {
  jobid:number
  imgUrl: string
  title: string
  education:string
  company:string
  hiringManager:string
  salary:string
  address:string
}

const loading = ref(true)
const lists = ref<ListItem[]>([])
const currentDate = new Date().toDateString()

const setLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}

onMounted(() => {
  loading.value = false
  lists.value = [
    {
      jobid:1222,
      imgUrl:
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      title: '产品经理',
      education:'本科',
      company:'腾讯',
      hiringManager:'张经理',
    salary:'10000',
    address:'杭州'
    },
    {
      jobid:1222,
      imgUrl:
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      title: '产品经理',
      education:'本科',
      company:'腾讯',
      hiringManager:'张经理',
    salary:'10000',
    address:'杭州'
    },
  ]
})
const value = ref('')
const cities = [
  {
    value: 'Beijing',
    label: 'Beijing',
  },
  {
    value: 'Shanghai',
    label: 'Shanghai',
  },
  {
    value: 'Nanjing',
    label: 'Nanjing',
  },
  {
    value: 'Chengdu',
    label: 'Chengdu',
  },
  {
    value: 'Shenzhen',
    label: 'Shenzhen',
  },
  {
    value: 'Guangzhou',
    label: 'Guangzhou',
  },
]
</script>
<style scoped lang="scss">

.seachdiv{
    height: 70px;
    border-radius: 10px; /* 将所有角落设置为相同的圆角 */
    width: 80%;
    position: fixed; /* 设置固定定位 */
    top: 50px; /* 例如，设置距离页面顶部的距离 */
    z-index: 999; /* 可选，设置盒子的层级 */
    background-color: rgb(255, 255, 255);
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
  </style>