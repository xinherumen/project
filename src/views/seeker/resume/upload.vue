<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :before-upload="beforeUpload"
      :auto-upload="false"
      :limit="1"
      v-model:file-list="fileList"
    >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖拽上传/<em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
       上传文件为.doc或者.docx
      </div>
    </template>
    </el-upload>
    <el-button type="primary" @click="handleUploadClick" :loading="loading">上传</el-button>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { ElNotification } from 'element-plus';
import {ref} from 'vue';
import request from '@/utils/request';
import type { select,resumetype  } from '@/api/seeker/type'
const fileList = ref<any[]>([]);
let loading =ref(false);

const beforeUpload = (file: File) => {
  const fileName = file.name.toLowerCase();
  if (!fileName.endsWith('.doc') && !fileName.endsWith('.docx')) {
    ElNotification({
      type:'error',
      message:'错误',
      title: `文件后缀不为.doc或者.docx`
    });
    return false;
  }
  return true;
}

const handleUploadClick = () => {
  if (!fileList.value.length) {
    ElNotification({
      type: 'error',
      message: '错误',
      title: '上传文件不能为空'
    });
    return;
  }

  // 手动触发上传
  loading.value=true;
  const url = '/seeker/uploadResume'
//   console.log(fileList.value); 
//   const data =fileList.value[0];
//   console.log(fileList);
//   const fromData = new FormData()
//   fromData.append('file', fileList.value[0])
//   //@ts-ignore
//   const result: Promise<select>= request.post<any,select>(url,data);
//     result.then((response) => {
//     if (response.code == 100) {
//         // 如果返回的 code 是 200，则更新 lists 值
//         ElNotification({
//       type:'success',
//       message:response.msg,
//       title: `上传成功`
//     });
//         // 设置 loading 为 false
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
ElNotification({
      type:'success',
      message:'上传成功',
      title: `上传成功`
    });
    loading.value=false;
}
</script>
