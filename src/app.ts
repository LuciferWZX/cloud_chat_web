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
  console.log(`%c应用已启动`,'color:green;font-size:14px');
  oldRender()
}
