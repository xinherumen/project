import { constantRouter,recruitersRouter } from '@/router/router';
export const GET_ROUTERS = ()=>{
   const usertype = localStorage.getItem('usertype');
   if(usertype == 'seeker'){
    return constantRouter;
   }else{
    return recruitersRouter;
   }
}
