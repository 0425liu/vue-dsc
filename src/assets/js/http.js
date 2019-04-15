import { config } from "./config";
import Axios from "axios";
import qs from "qs";
import { Loading } from "element-ui";
import _ from "lodash";
const api = config.pro;
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(
  url,
  data = {},
  config = {
    showLoading: true
  }
) {
  return new Promise((resolve, reject) => {
    let baseUrl = api + url;
    Axios.post(baseUrl, data, config).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      }
    );
  });
}
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(
  url,
  params = {},
  config = {
    showLoading: true
  }
) {
  return new Promise((resolve, reject) => {
    let baseUrl = api + url;
    Axios.get(baseUrl, {
      params: params,
      ...config
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}
/** start loading*/
let requestCount = 0;
let loading;

function showLoading() {
  if (requestCount === 0) {
    startLoading();
  }
  requestCount++;
}

function hideLoading() {
  if (requestCount <= 0) return;
  requestCount--;
  if (requestCount === 0) {
    _.debounce(endLoading, 300)();
  }
}

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.7)"
  });
}

function endLoading() {
  if (requestCount === 0) {
    loading.close();
  }
}
/** end loading*/
/*
请求拦截
*/
Axios.interceptors.request.use(
  config => {
    if (config.showLoading) {
      showLoading();
    }
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
      // 序列化
      // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
    }
    return config;
  }
  /*  error => {
     //error 的回调信息, 看贵公司的定义
     Message({
       //  饿了么的消息弹窗组件,类似toast
       showClose: true,
       message: error && error.data.error.message,
       type: "error"
     });
     return Promise.reject(error.data.error.message);
   } */
);
/** end loading*/
Axios.interceptors.response.use(
  res => {
    if (res.config.showLoading) {
      hideLoading();
    }
    return res;
  }
  /* error => {
    let errorInfo = error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);
  } */
);
