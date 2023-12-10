import { create } from 'zustand';


export interface BasketState {
  userInfo:any;
  setUserInfo: (token:any) => void;

}


const useCommonStore = create<BasketState>()((set) => ({
    userInfo:null,
    setUserInfo:(userInfo:any)=> {
    set({userInfo})
  }
}));

export default useCommonStore;
