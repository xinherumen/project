<template>
    <div>
      <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        drag
        :before-upload="beforeUpload"
        :limit="1"
        :auto-upload="false"
        :on-change="handleChange"
        :on-exceed="handleExceed"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          拖拽上传或<em>点击上传</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            doc/docx 文件
          </div>
        </template>
      </el-upload>
      <el-button  type="primary" @click="upload">提交</el-button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { UploadFilled } from '@element-plus/icons-vue'
  import request from '@/utils/request'
  import { ElNotification } from 'element-plus';
  import type { select } from '@/api/seeker/type'
  import {ref} from 'vue'
  const url = '/seeker/uploadResume';
  
  const fileList = ref([]);
  const previewHtml = ref('');
  const displayFileNames = ref([]);

const handleChange = async (files: any) => {
  displayFileNames.value = files.name; // 提取文件名
};


  const beforeUpload = (file: any) => {
    // 检查文件类型和大小
    const fileType = file.name.split('.').pop()?.toLowerCase();
    if (fileType !== 'doc' && fileType !== 'docx') {
      ElNotification({
        type:'error',
        message:'',
        title: `文件类型只能是.doc或者.docx`
      });
      return false;
    }
    return true;
  };
  const upload = async () => {
    const file = fileList.value[0];
    console.log(fileList)
    console.log(fileList);
    if (file) {
      uploadFile(file);
    } else {
      ElNotification({
        type:'error',
        message:'',
        title: `请选择文件`
      });
    }
  };
  const uploadFile = async (file: any) => {
    const formData = new FormData();
    formData.append('file', file.raw);
    const result: Promise<select>= request.post<any,select>(url, formData);
    result.then((response) => {
      if (response.code == 200) {
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
  const handleExceed = (files: any) => {
  // 当文件数量超过限制时，替换上一个文件
  // fileList.value.pop(); // 移除最后一个文件
};
  </script>
  
  <style scoped>
  .preview-container {
    margin-top: 20px;
  }
  </style>
  