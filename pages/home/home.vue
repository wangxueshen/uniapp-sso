<template>
	<view style="background-color: #EFEFEF;">
		
		<mescroll-body ></mescroll-body>
		
		<view v-for="(item) in list" @click="detail(item.id)">
			<view class="home-item">
				<view class="uni-flex">
					<view :class="taskTypeTextColorArr[item.acTaskListForm.taskType]">
						{{taskTypeArr[item.acTaskListForm.taskType]}}
					</view>
					<view class="home-item-orderId">单号{{item.acTaskListForm.acOrderId}}</view>
					<view class="home-item-licensePlate">{{item.acTaskListForm.licensePlate}}</view>
				</view>
				<view class="uni-flex uni-row margin-top-20">
					<view class="home-img margin-right-20">
						<image class="home-img margin-right-20" :src="item.acTaskListForm.mainPicture" lazy-load="true"
							mode="aspectFill"></image>
					</view>
					<view>
						<view class="model-name mui-ellipsis-2">{{item.acTaskListForm.modelName}}</view>
						<view :class="taskIsPayTextColorArr[item.pay]">{{taskIsPayArr[item.pay]}}</view>
						<view class="uni-text-small">保险公司：{{item.acTaskListForm.filialeId}}</view>
						<view class="uni-text-small">停放地：{{item.acTaskListForm.province}}{{item.acTaskListForm.city}}
						</view>
						<view class="uni-text-small">转车时间：{{item.acTaskListForm.createTime}}</view>
					</view>
				</view>

				<view class="line-row"></view>

				<view class="uni-flex uni-row margin-top-20">
					<view class="home-call">
						<image class="link-phone" src="../../static/iv_link_phone.png"></image>
						<view>{{item.acTaskListForm.realName}}</view>
					</view>
					<view class="home-call margin-left-20" v-show="taskEmailIsShowArr[isShowEmail]">
						<view>邮件</view>
					</view>
				</view>

			</view>
		</view>


	</view>

</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	
	console.log("home");
	export default {
		data() {
			return {
				list: [],
				pageIndex: 0,
				isShowEmail: '0102',
				flag: false,
				taskTypeArr: {
					"AJ01": "提车任务",
					"AJ02": "审批任务",
					"AJ03": "保全任务",
					"AJ04": "补全资料任务",
				},
				taskTypeTextColorArr: {
					"AJ01": "text-color-blue",
					"AJ02": "text-color-green",
					"AJ03": "text-color-yellow",
					"AJ04": "text-color-pink",
				},
				taskIsPayArr: {
					"true": "已缴费",
					"false": "未缴费"
				},
				taskIsPayTextColorArr: {
					"true": "text-color-blue",
					"false": "text-color-yellow"
				},
				taskEmailIsShowArr: {
					"0101": true,
					"0102": false
				}

			}
		},
		onLoad() {
			uni.startPullDownRefresh();
		},
		methods: {
			getData() {
				let data = {
					ticket: uni.getStorageSync('ticket'),
					pageIndex: this.pageIndex,
				}
				this.$uniRequest("acc/taskList!queryPendingTasks.do", 'GET', data).then(ret => {
					uni.stopPullDownRefresh();
					uni.hideNavigationBarLoading();
					this.list = ret.data.object;
					this.isShowEmail = ret.data.object1;
				}).catch(err => {
					uni.stopPullDownRefresh();
					uni.hideNavigationBarLoading();
				})
			}
		},
		onPullDownRefresh() {
			this.pageIndex = 0;
			this.getData()
		},
		onReachBottom() {
			let _self = this
			uni.showNavigationBarLoading()
			_self.pageIndex++;
			this.getData()
		}
	}
</script>

<style>
	.home-img {
		width: 200rpx;
		height: 260rpx;
	}

	.home-item {
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		background-color: #FFFFFF;
		margin-bottom: 12rpx;
	}

	.text-color-blue {
		color: #3180FF;
	}

	.text-color-green {
		color: #41D6A0;
	}

	.text-color-yellow {
		color: #FBD166;
	}

	.text-color-pink {
		color: #FF3177;
	}

	.home-item-orderId {
		margin-left: 10rpx;
		color: #888888;
	}

	.home-item-licensePlate {
		display: flex;
		flex-grow: 1;
		justify-content: flex-end;
	}

	.home-call {
		display: flex;
		flex-direction: row;
		color: #3180FF;
		font-size: 24rpx;
		border: 1px #3180FF solid;
		/*上边*/
		border-radius: 40rpx;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-top: 5rpx;
		padding-bottom: 5rpx;
	}

	.link-phone {
		width: 25rpx;
		height: 25rpx;
		align-self: center;
		margin-right: 20rpx;
	}
</style>
