import Vue from 'vue'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/element.scss'
import store from '@/store'
import _ from 'lodash'
console.log( process.env.VUE_APP_BASE_URL)
const myaxios =  axios.create(//常见请求实例配置项
    {
         baseURL: process.env.VUE_APP_BASE_URL,  //基础URL
        //  timeout:1000  //请求延时时间
    })
// 在发送请求之前做些什么("请求拦截器")
myaxios.interceptors.request.use(config => {
     //假设接口需要对接token，可以用store保存token,在拦截器中设置到header中
     //store需要安装、引入
 if(!_.isEmpty(store.state.token)){
     config.headers.common['Authorization'] = `Bearer ${store.state.token}` 
 }
 return config;
 }, error => {
 // 对请求错误做些什么
 
});
myaxios.interceptors.response.use(res=>{
    return res
},error=>{
    return Promise.resolve(error.response);
})

export default myaxios