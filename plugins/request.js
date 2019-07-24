const axios = require('axios')

// 创建axios实例
const service = axios.create({
  baseURL: '', // api的base_url
  timeout: 50000 // 请求超时时间
})

// // request拦截器
// service.interceptors.request.use(config => {
//   if (store.getters.token) {
//     config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

// respone拦截器
// service.interceptors.response.use(
//   response => {
//     const res = response.data
//     if (res.statusCode !== 200) {
//     }
//     return res;
//   },
//   error => {
//     console.log('err' + error)// for debug
//     console.log(error)
//     return Promise.reject(error)
//   }
// )

module.exports = service
