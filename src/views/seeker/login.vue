 <template>
    <div class="login">
 
        <Particles
        id="tsparticles" 
        class="login__particles"
        :options="options"
        />
        <div class="loginPart">
            <h2>用户登录</h2>
            <el-form 
            ref="loginForms"
            :model="loginForm"
            :rules="rules"
            status-icon
            label-width="100px"
            class="demo-ruleForm"
            style="transform:translate(-30px);"
            >
            <el-form-item prop="account">
              <el-input  :prefix-icon="User"   placeholder="请输入账号" v-model="loginForm.account" ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input  :prefix-icon="Lock" type="password" label="密码：" placeholder="请输入密码" v-model="loginForm.password" show-password ></el-input>
            </el-form-item>
            <el-form-item  prop="code">
                    <el-input style="width: 150px;"  placeholder="请输入验证码" maxlength="4" clearable v-model="loginForm.code" />
                    <img class="verifyCodeImg" :src="imgUrl" @click="resetImg">
                </el-form-item>
            <el-button :loading="loading" class="btn" type="primary"  @click="login">登录</el-button>
                <div style="text-align: right;transform:translate(0,30px);">
                    <el-link type="warning" @click="">没有账号？去注册</el-link>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import {User,Lock} from '@element-plus/icons-vue'
import { reactive, ref,onMounted } from 'vue'
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time';
//引入用户相关的小仓库
import useUserStore from '@/stores/modules/user';
let useStore =useUserStore();
let $router = useRouter();
//定义变量控制按钮加载
let loading =ref(false);
//收集表单数据
let loginForm =reactive({account:'',password:'',code:''})
let loginForms =ref()
const login= async ()=>{
  await loginForms.value.validate();
  loading.value=true;
  try{
    await  useStore.userLogin(loginForm);
    $router.push('/');
    ElNotification({
      type:'success',
      message:'欢迎回来',
      title: `HI,${getTime()}好`
    });
    loading.value=false;
  }catch(error){
    loading.value=false;
    ElNotification({
      type:'error',
      message:(error as Error).message
    })
  }
}
//定义表单验证需要的配置对象
const rules = {
  account:[
    { required: true, message: '账号不能为空', trigger: 'blur'},
    { min: 5, max: 12, message: '账号长度应该为5到15', trigger: 'blur' },
  ],
  password:[
  { required: true, message: '密码不能为空', trigger: 'blur'},
  ],
  code:[
  { required: true, message: '验证码不能为空', trigger: 'blur'},
  ]
}
let imgUrl=ref("http://192.168.124.36:8089/seeker/code");
const resetImg=()=>{
    imgUrl.value = "http://192.168.124.36:8089/seeker/code?time="+new Date();
    // loginForm.codeId = useStore.getcodeid();
}
const options = {
  fpsLimit: 60,
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onClick: { // 开启鼠标点击的效果
        enable: true,
        mode: 'push'
      },
      onHover: { // 开启鼠标悬浮的效果(线条跟着鼠标移动)
        enable: true,
        mode: 'grab'
      },
      resize: true
    },
    modes: { // 配置动画效果
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      grab: {
        distance: 200,
        duration: 0.4
      },
      attract: { // 鼠标悬浮时，集中于一点，鼠标移开时释放产生涟漪效果
        distance: 200,
        duration: 0.4,
        factor: 5
      }
    }
  },
  particles: {
    color: {
      value: '#BA55D3'
    },
    links: {
      color: '#FFBBFF', 
      distance: 150,
      enable: true,
      opacity: 0.4, 
      width: 1.2 
    },
    collisions: {
      enable: true
    },
    move: {
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
      bounce: false,
      direction: 'none',
      enable: true,
      out_mode: 'out',
      random: false,
      speed: 0.5, 
      straight: false
    },
    number: {
      density: {
        enable: true,
        value_area: 800
      },
      value: 80
    },
    opacity: {
      value: 0.7
    },
    shape: {
      type: 'star'
    },
    size: {
      random: true,
      value: 3
    }
  },
  detectRetina: true
}
</script>
<style scoped lang="scss">
.login {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .login__particles {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('../../assets/images/background.jpg');
    opacity:0.9;
    position:fixed;
     pointer-events: none;
  }
  .loginPart{
    position:absolute;
    /*定位方式绝对定位absolute*/
    top:50%;
    left:80%;
    /*顶和高同时设置50%实现的是同时水平垂直居中效果*/
    transform:translate(-50%,-50%);
    /*实现块元素百分比下居中*/
    width:450px;
    padding:50px;
    background: rgba(255,204,255,.3);
    /*背景颜色为黑色，透明度为0.8*/
    box-sizing:border-box;
    /*box-sizing设置盒子模型的解析模式为怪异盒模型，
    将border和padding划归到width范围内*/
    box-shadow: 0px 15px 25px rgba(0,0,0,.5);
    /*边框阴影  水平阴影0 垂直阴影15px 模糊25px 颜色黑色透明度0.5*/
    border-radius:15px;
    /*边框圆角，四个角均为15px*/
  }
  h2{
    margin:0 0 30px;
    padding:0;
    color: #fff;
    text-align:center;
    /*文字居中*/
  }
  .btn{
    transform:translate(170px);
    width:80px;
    height:40px;
    font-size:15px;
  }
</style>
