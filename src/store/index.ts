import {reactive, readonly} from "vue";
import {LocalStorage} from "@/utils/storage";
import {Publisher} from "@/utils/publisher";

interface State {
  menuActive: string,
  language: string,
  globalStyle: string,
  userToken: string
}

const state: State = reactive({
  menuActive: LocalStorage.get('menuActive') || 'H1001',
  language: LocalStorage.get('language') || 'en',
  globalStyle: LocalStorage.get('globalStyle') || 'dark',
  userToken: LocalStorage.get('userToken') || '9b683298a84297a0426d00285a7860b3'
})

type Key<T extends keyof State = keyof State> = T
type StateChangeCB = (key: Key, val: State[Key], state: State)=>void
const stateChange = new Publisher<StateChangeCB>()

export function useStore(){

  function setState(key: Key, val: State[Key]){
    // 修改state的值
    state[key] = val
    // 修改缓存的值
    LocalStorage.set(key, val)
    // 触发change事件
    stateChange.emit(key, val, state)
  }

  return{
    state: readonly(state),
    setState,
    onChange: stateChange.on.bind<(callback:StateChangeCB)=>void>(stateChange)
  }

}