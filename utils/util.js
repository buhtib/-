//手机震动
const vibrate = ()=> {
      uni.vibrateShort()
      setTimeout(uni.vibrateShort, 200)
}

//图片预览
const preImg = (current, urls) => {
  uni.previewImage({
    current,
    indicator:'number',
    urls:urls || [current]
  })
}

export default {
  vibrate,
  preImg
}

