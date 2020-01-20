export default {
  state: {
    userName: sessionStorage.getItem(`username`)||``,
    nickName: sessionStorage.getItem(`nickname`)||``,
    token: false
  },
  getters: {
    token: state => state.token,
    userName: state => state.userName,
    nickName: state => state.nickName
  },
  mutations:{
    clearLoginToken(){
      state.userName = '';
      state.token = false;
    },
    setUsername(state,userName){
      sessionStorage.setItem('username', userName);
      state.userName = userName;
    },
    setNickname(state, nickName) {
      sessionStorage.setItem('nickname', nickName);
      state.nickName = nickName;
    }
  }
};
