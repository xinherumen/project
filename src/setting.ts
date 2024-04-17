//用于项目logo|标题配置
let logoseeting = {
  title: '学生就业网站', //项目的标题
  logo: '/public/logo1.png', //项目logo设置
  logoHidden: true, //logo组件是否隐藏设置
}
export const GET_LOGO = ()=>{
  const usertype = localStorage.getItem('usertype');
  if(usertype == 'seeker'){
   logoseeting.logo='/public/logo1.png';
   logoseeting.title='学生就业网站';
   return logoseeting;
  }else{
    logoseeting.logo='/public/logo1.png';
   logoseeting.title='企业招聘平台';
   return logoseeting;
  }
}
export const baseurl = 'http://601d9226.r28.cpolar.top';