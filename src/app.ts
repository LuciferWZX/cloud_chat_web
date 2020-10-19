// import {fetchUser} from "@/services/user";
// import {ResponseDataType} from "@/utils/constans";
// import {history} from 'umi';
// import {clearStorage} from "@/utils/util";
export async function render(oldRender: () => void) {
  // const res = await request('/user/fetchCurrent',{
  //   method:'GET'
  // })
  //
  // console.log(222,getDvaApp());
  // if(res.code===200){
  //   const {_store}=getDvaApp();
  //   const {dispatch}=_store;
  //   dispatch({
  //     type:"user/save",
  //     payload:{
  //       user:res.data
  //     }
  //   })
  //
  // }else{
  //}
  console.log(`%c应用已启动`, 'color:green;font-size:14px');
  oldRender();
}
// export async function getInitialState() {
//   //const data = await fetchXXX();
//   const result:ResponseDataType =await fetchUser();
//   console.log(111,result);
//   if(result.code === 200){
//     return result.data
//   }
//   if(result.code === 100){
//     //清除token
//     clearStorage('Authorization');
//     //跳转到登录页面
//     history.replace('/userAction/login');
//     return result.data
//   }
//   return null
// }
