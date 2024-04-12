<template>
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
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import {  ref } from 'vue';
import request from '@/utils/request';
import type { select} from '@/api/seeker/type';
import { ElNotification } from 'element-plus';

let loading = ref(false);
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

let formempty = {
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

// 提交和重置表单的方法
const submitForm = async () => {
  await forms.value.validate();
  loading.value = true;
  const url = '/recruiters/setRequirement';
  const data = form.value;
  console.log(data);
  const result: Promise<select> = request.post<any, select>(url, data);
  result
    .then((response) => {
      if (response.code == 100) {
        // 如果返回的 code 是 200，则更新 lists 值
        ElNotification({
          type: 'success',
          message: response.msg,
          title: `新建成功`
        });
        // 设置 loading 为 false
        loading.value = false;
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
  form.value = formempty;
};
</script>

<style>
.form-container {
  max-width: 500px;
  margin: auto;
}
</style>
