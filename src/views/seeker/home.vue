<template>
  <el-card>
    <div class="box">
      <img :src="imageUrl" alt="" class="avatar">
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好呀{{ userStore.username }}</h3>
        <p class="subtitle">{{ GET_LOGO().title }}</p>
      </div>
    </div>
  </el-card>
  <div class="bottoms">
    <svg-icon name="welcome" width="800px" height="400px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time';
//引入用户相关的仓库,获取当前用户的头像、昵称
import useUserStore from '@/stores/modules/user';
//获取存储用户信息的仓库对象
let userStore = useUserStore();
import { GET_LOGO } from '@/setting';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { GET_TOKEN } from '@/utils/token';
import { baseurl } from '@/setting';
let $router = useRouter();
// onMounted(() => {
//   const token = localStorage.getItem('TOKEN');
//   if (token == null){
//     $router.push('/login');
//   }
// })
const imageUrl =  baseurl+'/seeker/getAvatar/'+GET_TOKEN();
</script>

<style scoped lang="scss">
.box {
  display: flex;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .bottom {
    margin-left: 20px;

    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }

    .subtitle {
      font-style: italic;
      color: skyblue;
    }
  }
}
.bottoms{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>