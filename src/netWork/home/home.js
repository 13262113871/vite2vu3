import {request} from '../axios'

// 获取首页数据
export function getData(){
   return request({
        url:'/login',
        method:'post',
    })
}


// 获取其他页面
// export function getBanner(){

// }