<template>
    <div>
      <img src = ''>
    </div>
    <div class="form-container">
      <div class="form-item">
        <label>账户名：</label>
        <span>{{ form.account_name }}</span>
      </div>
      <div class="form-item">
        <label>姓名：</label>
        <span>{{ form.name }}</span>
      </div>
      <div class="form-item">
        <label>性别：</label>
        <span>{{ form.gender }}</span>
      </div>
      <div class="form-item">
        <label>电话号码：</label>
        <span>{{ form.phonenumber }}</span>
      </div>
      <div class="form-item">
        <label>邮箱：</label>
        <span>{{ form.mailbox }}</span>
      </div>
      <div class="form-item">
        <label>出生日期：</label>
        <span>{{ form.birth_date }}</span>
      </div>
      <div class="form-item">
        <label>地址：</label>
        <span>{{ form.address }}</span>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref,onMounted} from 'vue';
  import request from '@/utils/request';
  import type { UserData} from '@/api/seeker/type';
  import { ElNotification } from 'element-plus';
  // Define form data
  const form = ref({
    name: '',
    gender: '',
    phonenumber: '',
    mailbox: '',
    birth_date: '',
    address: '',
    account_name: '',
  });
  const url = '/seeker/getInfo';
  onMounted(()=>{
    const result: Promise<UserData>= request.get<any,UserData>(url);
      result.then((response) => {
      if (response.code == 100) {
          // 如果返回的 code 是 200，则更新 lists 值
         form.value = response.data;
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
  
  })
  </script>
  
  <style>
  .form-container {
    max-width: 500px;
    margin: auto;
  }
  
  .form-item {
    margin-bottom: 15px;
  }
  
  .form-item label {
    display: inline-block;
    width: 100px;
    font-weight: bold;
  }
  
  .form-item span {
    display: inline-block;
    min-width: 150px;
    /* border: 1px solid #ccc; */
    padding: 5px;
  }
  </style>
  