import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL:'http://localhost:8888/api/private/v1/',
        method:'GET',
        timeout:5000
    })


    // 请求拦截
    instance.interceptors.request.use(config=>{

        // 需要token验证才能通过的   请求时获取token
        config.headers.Authorization = window.sessionStorage.getItem('token')
        return config
    },(error)=>{

        // 处理请求失败
        console.log(error);
       return Promise.reject(error)
    })



    
    // 相应拦截
    instance.interceptors.response.use(res=>{


        return res.data?res.data:res;
    },error=>{

        // 需要Login授权登录的接口

        // 显示错误信息
        return Promise.reject(error)

    })


    return instance(config)
}