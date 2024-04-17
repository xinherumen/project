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
      <el-form-item label="简历名" prop="resumeName">
        <el-input v-model="form.resumeName" :value="form.resumeName"></el-input>
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
    </el-form>
        <el-form
      :model="form1"
      :rules="rules1"
      ref="forms1"
      label-width="120px"
      class="demo-form"
    >
      <el-form-item label="最高学历就读时间" prop="dateRange">
        <el-date-picker
          v-model="form1.front"
          type="month"
          placeholder="Pick a month"
        />到
        <el-date-picker
          v-model="form1.last"
          type="month"
          placeholder="Pick a month"
        />
      </el-form-item>
      <el-form-item label="最高学历毕业院校" prop="school">
        <el-input v-model="form1.school" :value="form1.school"></el-input>
      </el-form-item>
      <el-form-item label="学历" prop="educations">
        <el-input v-model="form1.educations"></el-input>
      </el-form-item>
      <el-form-item label="专业" prop="major">
        <el-input v-model="form1.major"></el-input>
      </el-form-item>
      <el-form-item label="专攻方向" prop="方向">
        <el-input v-model="form1.fangxiang"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitForm()" :loading="loading">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
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
  name: 'zy',
  resumeName:'JAVA意向简历',
  intendedPosition: '软件工程师',
  address: '浙江省杭州市下沙区杭电',
  intendedSalary: '1-3k',
  education: '本科',
  projectExperience: '实现响应式设计,参与平台前端开发',
  internshipExperience: '参与平台前端开发',
  hobby: '责任心强，具备良好的团队协作能力,对新技术有强烈的学习兴趣',
  selfEvaluation: '责任心强，具备良好的团队协作能力,对新技术有强烈的学习兴趣',
  skill: '熟悉Python、Java,了解C++'
});
let form1 = ref({
  // dateRange: [],
  front:'2008-09',
  last:'2012-07',
  school:'杭州电子科技大学大学',
  educations:'本科',
  major:'计算机科学与技术',
  fangxiang:'软件开发'
});
let formempty ={
  name: '',
  resumeName:'',
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
let formempty1 =
{
  dateRange: [],
  school:'',
  educations:'',
  major:'',
  fangxiang:''
}
const forms =ref();
const forms1 =ref();
const rules = {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  intendedPosition: [{ required: true, message: '请输入期望职位', trigger: 'blur' }],
  resumeName: [{ required: true, message: '请输入简历名', trigger: 'blur' }],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  intendedSalary: [{ required: true, message: '请输入期望薪资', trigger: 'blur' }],
  education: [{ required: true, message: '请输入教育程度', trigger: 'blur' }],
  projectExperience: [{ required: true, message: '请输入项目经验', trigger: 'blur' }],
  internshipExperience: [{ required: true, message: '请输入实习经验', trigger: 'blur' }],
  hobby: [{ required: true, message: '请输入爱好', trigger: 'blur' }],
  selfEvaluation: [{ required: true, message: '请输入自我评价', trigger: 'blur' }],
  skill: [{ required: true, message: '请输入技能', trigger: 'blur' }]
};
const rules1 = {
  front: [{ required: true, message: '请输入开始日期', trigger: 'blur' }],
  last: [{ required: true, message: '请输入结束日期', trigger: 'blur' }],
  school: [{ required: true, message: '请输入学校', trigger: 'blur' }],
  educations: [{ required: true, message: '请输入学历', trigger: 'blur' }],
  major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
  fangxiang: [{ required: true, message: '请输入方向', trigger: 'blur' }],
};
let data = {}
let data1 = {}
// 提交和重置表单的方法
const submitForm = async () => {
  await forms1.value.validate();
  // form.value.education = form1.value.front+form1.value.school+form1.value.educations+form1.value.major+form1.value.fangxiang;
  await forms.value.validate();
  loading.value=true;
  // const url = '/seeker/fillResume'
  // const data = form.value;
  // console.log(data);
  // const result: Promise<select>= request.post<any,select>(url,data);
  //   result.then((response) => {
  //   if (response.code == 100) {
  //       // 如果返回的 code 是 200，则更新 lists 值
    //     ElNotification({
    //   type:'success',
    //   message:response.msg,
    //   title: `上传成功`
    // });
        // 设置 loading 为 false
//         loading.value = false;
//     } else {
//         // 处理其他状态码的情况
//         ElNotification({
//       type:'error',
//       message:response.msg,
//       title: `获取信息失败`
//     });
//     }
// }).catch((error) => {
//     // 处理请求失败的情况
//     console.error('Request failed:', error);
// });
data = form.value;
data1 = form1.value;
    ElNotification({
      type:'success',
      message:'成功',
      title: `上传成功`
    });
    }

const resetForm = () => {
  // form.value.education = form1.value.school+form1.value.educations+form1.value.major+form1.value.fangxiang;
  // console.log(form.value.education)
  console.log(formempty);
   form.value = formempty;
   console.log(formempty);
}
onMounted(() => {
//   const url='/seeker/getResume';
//   const result: Promise<resumetype>= request.get<any,resumetype>(url);
//     result.then((response) => {
//     if (response.code == 200) {
//         // 如果返回的 code 是 200，则更新 form 值
//         //@ts-ignore
//       //  formempty =response.data[0] ;
//         form.value=response.data[0];
//         // console.log(form);
//     } else {
//         // 处理其他状态码的情况
//         ElNotification({
//       type:'error',
//       message:response.msg,
//       title: `你还没有填写过简历`
//     });
//     }
// }).catch((error) => {
//     // 处理请求失败的情况
//     console.error('Request failed:', error);
// });
})
</script>

<style>
.form-container {
  max-width: 500px;
  margin: auto;
}
</style>
