import axios from "axios"
import { Message } from 'element-ui';

let sources = {}


// axios.defaults.baseURL="http://10.214.16.165:8081";

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//请求
axios.interceptors.request.use(
    function(response){
        // 此处可以在请求头中添加token
        return response
    },
    function(err){
        return Promise.reject(err);
    },
)


//处理服务器反应
axios.interceptors.response.use(
    function(response){
        console.group("全局响应拦截");
        console.log(response);
        console.groupEnd();
        //处理各种状态码    
        return response
    },
    function(err){
        //处理各种请求出错

        if(err.message &&  err.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
            Message({
              message: "请求超时，请联系管理员或技术人员。",
              center: true,
              duration:10000,
              offset:50,
              type:"error"
          });  
        }
        handleError(err,400,"400:网络请求语法无效，请联系管理员或技术人员。");
        handleError(err,401,"401:身份未认证，请确认登录状态。");
        handleError(err,403,"403:服务器已经理解请求，但是拒绝执行，请联系管理员或技术人员。");
        handleError(err,404,"404:请求失败，未发现资源，请联系管理员或技术人员。");
        handleError(err,405,"405:请求方法错误，请联系管理员或技术人员。");
        handleError(err,408,"408:请求超时，请联系管理员或技术人员。");


        handleError(err,500,"500:服务器错误，请联系管理员或技术人员。");
        handleError(err,501,"501:请求方法不被服务器支持，请联系管理员或技术人员。");
        handleError(err,502,"502:上游服务器中接收到的响应无效，请联系管理员或技术人员。");
        handleError(err,503,"503:服务器尚未准备好处理请求，请联系管理员或技术人员。");
        handleError(err,504,"504:网关超时，请联系管理员或技术人员。");
        handleError(err,505,"505:服务器不支持现有的HTTP协议版本，请联系管理员或技术人员。");



        return Promise.reject(err);
    },
)


const request = function (url, params, config, method) {
    return new Promise((resolve, reject) => {
      axios[method](url, params, Object.assign({}, config)).then(response => {
        resolve(response.data)
      }, err => {
        if (err.Cancel) {
          console.log(err)
        } else {
          reject(err)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  

  const handleError= (err,code,message)=>{


        if(err.response && err.response.status==code)
        {   
            Message({
                message: message,
                center: true,
                duration:10000,
                offset:50,
                type:"error"
            });            
        }
  }

  const post = (url, params, config = {}) => {
    return request(url, params, config, 'post').then(res=>{
      return res
    });
  }
  
  const get = (url, params, config = {}) => {
     return request(url, params, config, 'get').then(res=>{
      return res
    });
  }
  
  export {sources, post, get}