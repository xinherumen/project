<template>
    <div class="form-container">
      <el-form
        :model="form"
        :rules="rules"
        ref="forms"
        label-width="120px"
        class="demo-form"
      >
        <el-form-item label="账户名" prop="account_name">
          <el-input v-model="form.account_name"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话号码" prop="phonenumber">
          <el-input v-model="form.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model="form.mailbox"></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth_date">
          <el-date-picker v-model="form.birth_date" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()" :loading="loading">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import request from '@/utils/request';
  import { ElNotification } from 'element-plus';
  import type { select,UserData} from '@/api/seeker/type';
  let loading =ref(false);
  const forms =ref();
  // Define form data and validation rules
  const form = ref({
    name: '',
    gender: '',
    phonenumber: '',
    mailbox: '',
    birth_date: '',
    address: '',
    account_name: '',
  });
  const rules = {
    name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
    gender: [{ required: true, message: '请输入性别', trigger: 'blur' }],
    phonenumber: [{ required: true, message: '请输入电话号码', trigger: 'blur' }],
    mailbox: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    birth_date: [{ required: true, message: '请输入出生日期', trigger: 'blur' }],
    address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
    account_name: [{ required: true, message: '请输入账户名', trigger: 'blur' }],
  };
  
  // Submit and reset form methods
  const submitForm = async () => {
    await forms.value.validate();
    loading.value = true;
    const url = '/seeker/cInformation';
    const data = form.value;
      const result: Promise<select>= request.post<any,select>(url, data);
        result.then((response) => {
          if (response.code == 100) {
          ElNotification({
            type:'success',
            message:response.msg,
            title: `上传成功`
          });
        } else {
          ElNotification({
            type:'error',
            message:response.msg,
            title: `上传失败`
          });
        }
      }).catch((error) => {
        console.error('Request failed:', error);
      });
  };
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
  const resetForm = () => {
    form.value = {
      name: '',
      gender: '',
      phonenumber: '',
      mailbox: '',
      birth_date: '',
      address: '',
      account_name: '',
    };
  };
  </script>
  <style>
  .form-container {
    max-width: 500px;
    margin: auto;
  }
  
  .demo-form .el-form-item {
    margin-bottom: 20px;
  }
  </style>
  