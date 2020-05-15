<template>
	<view >
        <view class="justify-end u-margin-20" v-if="fullReductionList.length > 0">
            <van-button type="info" size="small">编辑</van-button>
        </view>
		<view class="set-content">
			<view v-if="fullReductionList.length > 0">
				<view
					v-for="(item, i) in fullReductionList"
					:key="i"
					class="align-center justify-around bg-f u-margin-bottom-80 u-padding-top-30 u-padding-bottom-30 relative"
				>
					<text class="u-font-40">满</text>
					<van-stepper
						:value="item.arrivePrice"
						:min="0"
						button-size="80rpx"
						input-width="120rpx"
                        @change="stepperChange(i,'arrivePrice', $event)"
					/>
					<text class="u-font-40">减</text>
					<van-stepper
						:value="item.discount"
						:min="0"
						button-size="80rpx"
						input-width="120rpx"
                        @change="stepperChange(i,'discount', $event)"
					/>
					<van-tag plain type="danger"  class="tag-priview">{{
						item.text
					}}</van-tag>
				</view>
                <view class="justify-end align-center 444 u-padding-right-30">
                    <van-button   type="danger"  
                        custom-style="border-radius: 50%; margin-right:30px"  @click="del">
                        <u-icon name="minus" color="#fff" size="32"></u-icon>
                    </van-button>
                    <van-button   type="danger"  custom-style="border-radius: 50%"  @click="add">
                        <u-icon name="plus" color="#fff" size="32"></u-icon>
                    </van-button>
                </view>
			</view>
			<u-empty text="暂无满减哦,请手动添加" mode="list" v-else>
				<van-button slot="bottom" type="info" @click="add">添加满减</van-button>
			</u-empty>
		</view>
		<van-button
			type="primary"
			block
			:loading="submitBtnLoading"
			loading-type="spinner"
			class="submit-btn"
			@click="submit"
			>保存</van-button
		>

		<van-toast id="van-toast" />

		<van-dialog id="van-dialog" />

		<van-notify id="van-notify" />
	</view>
</template>

<script>

export default {
	data() {
		return {
			fullReductionList: [],
			submitBtnLoading: false,
		};
    },
	methods: {
		stepperChange(index, name, e) {
            this.fullReductionList[index][name] = e.detail
            this.watchFullReductionList()
            this.$forceUpdate()
        },
        watchFullReductionList() {
            this.fullReductionList = this.fullReductionList.map(item=>{
                return {
                    ...item,
                    text:`满${item.arrivePrice}减${item.discount}`
                }
            })
        },
        sortFullReductionList() {
            this.fullReductionList = this.fullReductionList.sort((prev, next)=> prev.arrivePrice - next.arrivePrice)
        },
        del() {
            this.$Dialog.alert({
                message:'是否确认删除这行呢'
            }).then(()=>{
                this.fullReductionList.pop()
                this.$Toast('删除成功')
            })
        },
        add() {
            this.sortFullReductionList()
            const length = this.fullReductionList.length 
            const prevArrivePrice = length > 0 ? this.fullReductionList[length - 1].arrivePrice : 0
            const prevDiscount = length > 0 ? this.fullReductionList[length - 1].discount : 0
            const commonRowData = { arrivePrice: prevArrivePrice, discount: prevDiscount, text: "0减0" }
            this.fullReductionList.push(commonRowData)
            this.$Toast('添加成功')
        },
		submit() {
            console.log(this.fullReductionList);
            
			// this.$Notify({ type: 'success', message: '保存成功',onClose(){
			//     uni.navigateBack()
			// } });
			// this.submitBtnLoading = true
			// setTimeout(() => {
			//     thifullReductions.submitBtnLoading = false
			// }, 8000);
			// useraddress(this.form).then(res=>{
			//     this.$Toast(res.msg)
			//     setTimeout(uni.navigateBack, 800);
			// }).catch(res=>{
			//     this.$Toast(res.msg)
			// }).finally(() => {
			//     this.submitBtnLoading = false
			// })
		},
	},
};
</script>

<style lang="scss" scoped>
.set-content {
	height: calc(100vh - var(--safe-area) - 50px - 30rpx);
	overflow: auto;

	.tag-priview {
		position: absolute;
		left: 20px;
		bottom: 0;
		transform: translateY(130%);
	}
}

.submit-btn {
	position: fixed;
	left: 0;
	bottom: var(--safe-area);
	width: 100%;
}
</style>
