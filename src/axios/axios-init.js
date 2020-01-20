import axios from 'axios';
import store from '@/store/index';
import user from '@/store/user';
import router from '@/router/index';
import { Loading, Message } from 'element-ui';

// axios 配置
axios.defaults.timeout = 15000;
// axios.defaults.baseURL = "http://localhost:1234";

// 配置通用请求动画
let loading = null;

axios.interceptors.request.use(config => {
  console.time('ajax请求耗时');
  if (store.state.user.token) {
    config.headers.Authorization = store.getters.token;
  }

  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(255, 255, 255, .6)'
  });

  return config;
}, err => {
  loading.close();
  return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(response => {
  if (response && response.data) {
    switch (response.data.code) {
      case '401':
        // 401 清除token信息并跳转到登录页面
        store.commit(user.clearLoginToken);
        Message.error({
          message: '身份过期，请重新登录'
        });

        setTimeout(() => {
          router.replace({
            path: '/login',
            name: 'Login',
            query: { redirect: router.currentRoute.fullPath }
          });
        }, 1200);
        break;
      //无权限
      case '403':
        router.replace({
          name: 'noAuth',
          query: { redirect: router.currentRoute.fullPath }
        });
    }
  }
  loading.close();
  console.timeEnd('ajax请求耗时');
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
      case '401':
        // 401 清除token信息并跳转到登录页面
        store.commit(user.clearLoginToken);
        router.replace({
          name: 'Login',
          query: { redirect: router.currentRoute.fullPath }
        });
        break;

      //无权限
      case '403':
        router.replace({
          name: 'noAuth',
          query: { redirect: router.currentRoute.fullPath }
        });
        break;
    }
  }
  loading.close();
  Message.error({
    message: '哎呀~ (ಥ﹏ಥ)网络又开小差了,请稍后刷新重试!'
  });
  return Promise.reject(error.response.data);
});

export default axios
