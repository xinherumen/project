<template>
  <div class="form-container">
    <el-form
      :model="form"
      :rules="rules"
      ref="forms"
      label-width="120px"
      class="demo-form"
    >
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" :value="form.name"></el-input>
      </el-form-item>
      <el-form-item label="期望职位" prop="intendedPosition">
        <el-input v-model="form.intendedPosition"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="期望薪资" prop="intendedSalary">
        <el-input v-model="form.intendedSalary"></el-input>
      </el-form-item>
      <el-form-item label="教育程度" prop="education">
        <el-input v-model="form.education"></el-input>
      </el-form-item>
      <el-form-item label="项目经验" prop="projectExperience">
        <el-input v-model="form.projectExperience"></el-input>
      </el-form-item>
      <el-form-item label="实习经验" prop="internshipExperience">
        <el-input v-model="form.internshipExperience"></el-input>
      </el-form-item>
      <el-form-item label="爱好" prop="hobby">
        <el-input v-model="form.hobby"></el-input>
      </el-form-item>
      <el-form-item label="自我评价" prop="selfEvaluation">
        <el-input v-model="form.selfEvaluation"></el-input>
      </el-form-item>
      <el-form-item label="技能" prop="skill">
        <el-input v-model="form.skill"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()" :loading="loading">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted,ref,reactive } from 'vue';
import request from '@/utils/request'
import type { select,resumetype  } from '@/api/seeker/type'
import { ElNotification } from 'element-plus';
let loading =ref(false);
// 表单数据和验证规则
let form = ref({
  name: '',
  intendedPosition: '',
  address: '',
  intendedSalary: '',
  education: '',
  projectExperience: '',
  internshipExperience: '',
  hobby: '',
  selfEvaluation: '',
  skill: ''
});
let formempty ={
  name: '',
  intendedPosition: '',
  address: '',
  intendedSalary: '',
  education: '',
  projectExperience: '',
  internshipExperience: '',
  hobby: '',
  selfEvaluation: '',
  skill: ''
}
const forms =ref();
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  intendedPosition: [{ required: true, message: '请输入期望职位', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  intendedSalary: [{ required: true, message: '请输入期望薪资', trigger: 'blur' }],
  education: [{ required: true, message: '请输入教育程度', trigger: 'blur' }],
  projectExperience: [{ required: true, message: '请输入项目经验', trigger: 'blur' }],
  internshipExperience: [{ required: true, message: '请输入实习经验', trigger: 'blur' }],
  hobby: [{ required: true, message: '请输入爱好', trigger: 'blur' }],
  selfEvaluation: [{ required: true, message: '请输入自我评价', trigger: 'blur' }],
  skill: [{ required: true, message: '请输入技能', trigger: 'blur' }]
};
// 提交和重置表单的方法
const submitForm = async () => {
  await forms.value.validate();
  loading.value=true;
  const url = '/seeker/fillResume'
  const data = form;
  const result: Promise<select>= request.post<any,select>(url,data);
    result.then((response) => {
    if (response.code == 200) {
        // 如果返回的 code 是 200，则更新 lists 值
        ElNotification({
      type:'success',
      message:response.msg,
      title: `上传成功`
    });
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

const resetForm = () => {
  console.log(formempty);
   form.value = formempty;
   console.log(formempty);
}
onMounted(() => {
  const url='/seeker/getResume';
  const result: Promise<resumetype>= request.get<any,resumetype>(url);
    result.then((response) => {
    if (response.code == 200) {
        // 如果返回的 code 是 200，则更新 form 值
        //@ts-ignore
      //  formempty =response.data[0] ;
        form.value=response.data[0];
        // console.log(form);
    } else {
        // 处理其他状态码的情况
        ElNotification({
      type:'error',
      message:response.msg,
      title: `你还没有填写过简历`
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
</style>
