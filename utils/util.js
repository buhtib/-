//手机震动
const vibrate = ()=> {
      uni.vibrateShort()
      setTimeout(uni.vibrateShort, 200)
  }

export default {
  vibrate
}

