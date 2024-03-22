<template>
 <div>
    <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
    <svg-icon  name="phone" color="pink" width="100px" height="100px"></svg-icon>
    <el-pagination
      :page-sizes="[100, 200, 300, 400]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />
    <h1>你好世界</h1>

  </div>
</template>
<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue';
  import { onMounted } from 'vue';
  import { reqLogin } from '@/api/seeker';
  onMounted(()=>{
    reqLogin({account:'2732097857',password:'zy20031203',code:'1111'})
  })
</script>
<style scoped lang="scss">

</style>
