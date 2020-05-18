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


// 计算两地之间的距离（lat1, lng1为商家经纬度  lat2， lng2为实时定位的经纬度）
const  calculationDistance = (lat1, lng1, lat2, lng2)=> {
  var radLat1 = lat1 * Math.PI / 180.0;
  var radLat2 = lat2 * Math.PI / 180.0;
  var a = radLat1 - radLat2;
  var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137;
  s = Math.round(s * 10000) / 10000;
  return s * 1000
}

export default {
  vibrate,
  calculationDistance,
  preImg
}

