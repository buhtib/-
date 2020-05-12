<template>
    <view class="content">
        <van-dialog id="van-dialog" />
        <home-header />

        <van-cell-group :border="false"> 
          <van-cell :border="false" title="本店菜品" title-class="cell-title" custom-class="cell"/>
        </van-cell-group>
        <view class="menu" :class="isIphoneX ? 'iphone-bottom-line' : ''">
          <view class="tabs">
            <van-sidebar :active-key="active" custom-class="sidebar">
              <van-sidebar-item  :title="item.type"  v-for="(item, i) in menuList" 
                :key="i" custom-class="sidebar-item" :info="sidebarItemNum(item.items)" 
                @click="sidebarItemClick(item, i)"/>
            </van-sidebar>
          </view>

          <view class="right-content">
            <scroll-view scroll-y scroll-with-animation :scroll-into-view="rightViewId" @scroll="scrollEvent"
            enable-back-to-top>
              <view v-for="parent in menuList" :key="parent.type_id" :id="'inToView' + parent.type_id">
                <van-cell-group :border="false">
                  <van-cell  title-class="cell-title" custom-class="cell" :border="false">
                    <van-tag slot="title" type="primary" 
                            size="large">{{parent.type}}</van-tag>
                  </van-cell>
                </van-cell-group>
                <van-card
                  v-for="good in parent.items" :key="good.id"
                  :num="good.num"  :price="good.price" :desc="good.introduce"
                  :title="good.name" :thumb="baseUrl + good.src" title-class="van-multi-ellipsis--l2 card-title font28"
                  custom-class="card"  lazy-load thumb-class="card-img" price-class="card-price font32"
                  desc-class="card-desc van-multi-ellipsis--l2" thumb-mode="fill">
                  <view slot="footer" style="margin-top:30rpx" class="justify-between align-center">
                    <view>规格：{{good.standard || ''}}</view>
                    <!-- <calculate-num :good="good" /> -->
                    <van-button type="danger" round size="small" color="var(--color-red)" 
                      @click="selectGoodItem(good)">选规格</van-button>
                  </view>
                </van-card>
              </view>
            </scroll-view>
          </view>

          <van-submit-bar :disabled="canSubmit" :price="totalPrice"
            button-text="去结算" @submit="onSubmit" :loading="loading" button-class="submit-bar-btn font28"
            bar-class="custom-submit-bar-height">
              <van-row gutter="20">
                <van-col offset="4" >
                  <van-goods-action-icon
                    :icon="totalNum > 0 ? '/static/img/car_active.png': '/static/img/car.png'" text="购物车"
                    :info="totalNum" icon-class="cart-icon" @click="seeInCart"/>
                </van-col>
              </van-row>
              
              <!-- <van-transition :show="cartShow" name="fade-up"> -->
                <cart slot="top" v-if="cartShow && totalNum > 0"/>
              <!-- </van-transition> -->
          </van-submit-bar>

          <van-toast id="van-toast" />

          <page-loading :loading="isPageLoading"/>

          <van-overlay :show="overlayShow  && totalNum > 0" @click="overlayShowOff"/>

          <selectStandard :standardShow.sync="standardShow"  :goodItem="goodItem"/>
        </view>
      </view>
</template>

<script>
  import { getStorelist } from '@/service/index'
  import calculateNum from './calculateNum'
  import selectStandard from './selectStandard'
  import cart from './cart'
  import HomeHeader from '@/components/home-header/Index';

  export default {
      name:"menu",
      data() {
          return {
            isPageLoading:true,
            active: 0,
            menuList:[],
            goodItem:{},
            // 右侧滚动view
            rightViewId:"",
            loading:false,
            //控制购物车显示
            cartShow: false,
            //遮罩层
            overlayShow:false,
            //规格
            standardShow:false,
            load:true
          }
      },
      components:{
        calculateNum,
        selectStandard,
        cart,
        HomeHeader
      },
      onLoad() {
        // getApp().$vm.startLocation()
      },
      onShow() {
        // getApp().$vm.startLocation()
      },
      mounted() {
        getStorelist({type: 'querylist'}).then(res=>{
          this.isPageLoading = false
          this.menuList = res.data
          //获取本地缓存数据
          this.INIT_BUYCART()
          this.changeMenuList()
        })
      },
      computed: {
        baseUrl() {
          return this.$baseUrl
        },
        totalPrice() {
          let totalPrice = 0;
          let values = Object.values(this.cartList)
          totalPrice = values.reduce((total, currentValue)=> +total + +currentValue.price * +currentValue.num, 0)
          return totalPrice.toFixed(2) * 100
        },
        totalNum() {
          let num = 0;
          let values = Object.values(this.cartList)
          num = values.reduce((total, currentValue)=> +total + +currentValue.num, 0)
          return num
        },
        canSubmit() {
          const { is_super,  totalPrice} = this
          if( is_super ) {
            return true
          }else {
            if(totalPrice == 0) {
              return true
            }else {
              return false
            }
          }
        }
      },
      watch: {
        cartList() {
          this.changeMenuList()
        }
      },
      methods:{
        //购物车里的cartList数据变化时  改变menuList的数量 及计算总价和总数
        changeMenuList() {
          let { cartList } = this
          let key = Object.keys(cartList)
          //清空时
          if(key.length == 0) this.overlayShowOff()
          
          this.menuList.forEach(menu=>{
            menu.items.forEach(good=> {
                if(cartList[good.id]) {
                  key.forEach(goodId=> {
                    if(goodId == good.id) {
                      good.num = cartList[goodId].num  
                      good.standard = cartList[goodId].standard ? cartList[goodId].standard : '无'
                    }
                  })
                }else {
                  good.num = 0
                }
              })
          })
          this.$forceUpdate()
        },
        //侧边栏的数字
        sidebarItemNum(items) {
          let num = 0;
          items.forEach(good=>{
            if(good.num) {
              num += good.num
            }
          })
          if(num) {
            return num
          }
        },
        //点击定位锚点
        sidebarItemClick(item, i) {
          this.rightViewId = 'inToView' + this.menuList[i].type_id
        },
        //滚动切换 slider active值
        scrollEvent(e) {
          const { pixelRatio, windowWidth } = uni.getSystemInfoSync()
                let { scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY } = e.detail 
                const { menuList } = this
          let tabHeight = 0;
                if (this.load) {
                    //获取每个块分类的top值
                    for (let i = 0; i < menuList.length; i++) {
              let view = uni.createSelectorQuery().select("#inToView" + menuList[i].type_id);
              view.fields({
                size: true
              }, data => {
                menuList[i].top = tabHeight;
                tabHeight = tabHeight + data.height;
                menuList[i].bottom = tabHeight;
              }).exec();
                    }
                    this.load = false
                }
          
          scrollTop =scrollTop + 10;
          for (let i = 0; i <menuList.length; i++) {
            if (scrollTop >menuList[i].top && scrollTop <menuList[i].bottom) {
              this.active = i
              return false
            }
          }
        },
        seeInCart() {
          if(!this.totalNum) return;
          if( this.cartShow && this.overlayShow) {
            this.overlayShowOff()
            return;
          }
          this.cartShow = true
          this.overlayShow = true
          this.$forceUpdate()
        },
        overlayShowOff() {
          this.cartShow = false
          this.overlayShow = false
        },
        selectGoodItem(good) {
          this.standardShow = true
          this.goodItem = good
        },
        onSubmit() {
          const { totalPrice } =this
          this.loading = true
          this.$Toast.success('提交订单成功');
          uni.navigateTo({
              url:`/pages/home/confirm-order/Index?totalPrice=${totalPrice}`,
              complete:()=>{
                this.loading = false
                this.overlayShowOff()
              }
          })
        }
      }
  }
</script>

<style lang="scss" >
  page {
    background-color: #fff;
  }
  .van-card__content {
    flex-direction: column !important;
    justify-content: space-between !important;
  }
  .content {
		background-color: #f5f5f5;
  }
  .menu {
    box-sizing: border-box;
    display: flex;
    height: calc(100vh - 128rpx - 270rpx);
    overflow: hidden;
  }
  .tabs {
    width: 160rpx;
    height: 100%;
    overflow-y: auto;
  }
  .right-content {
    flex: 1;
    height: 100%;
    overflow-y: auto;
  }
  .right-content scroll-view{
    height:100%;
  }
  .card-img {
    width: 164rpx !important;
    height: 164rpx !important;
  }
</style>
