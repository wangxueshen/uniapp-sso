<template>
	<view style="background-color: #EFEFEF;height: 100%;">

		<mescroll-body @init="mescrollInit" @down="downCallback" @up="upCallback" :down="downOption" :up="upOption">
			<view v-for="(item) in list">
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
							<image class="home-img margin-right-20" :src="item.acTaskListForm.mainPicture"
								lazy-load="true" mode="aspectFill"></image>
						</view>
						<view>
							<view class="model-name mui-ellipsis-2">{{item.acTaskListForm.modelName}}</view>
							<view :class="taskIsPayTextColorArr[item.pay]">{{taskIsPayArr[item.pay]}}</view>
							<view class="uni-text-small">保险公司：{{item.acTaskListForm.filialeId}}</view>
							<view class="uni-text-small">
								停放地：{{item.acTaskListForm.province}}{{item.acTaskListForm.city}}
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
			<mescroll-empty v-if="list.length==0" :option="upOption.empty" @emptyclick="downCallback">
			</mescroll-empty>

		</mescroll-body>
	</view>

</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollEmpty from '@/uni_modules/mescroll-uni/components/mescroll-empty/mescroll-empty.vue';

	export default {
		mixins: [MescrollMixin], // 使用mixin

		components: {
			MescrollEmpty
		},

		data() {
			return {

				list: [],
				isShowEmail: '0102',
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
				},
				totalCount: 0,
				downOption: {
					auto: true // 不自动加载 (mixin已处理第一个tab触发downCallback)
				},
				upOption: {
					auto: false, // 不自动加载
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量
					},
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: true,
						tip: '暂无相关数据',
						btnText: "重新加载",
						top: "100rpx",
						zIndex: 99
					},
					textNoMore: '-- END --'
				},

			}
		},
		methods: {
			getData() {
				let data = {
					ticket: uni.getStorageSync('ticket'),
					pageIndex: this.upOption.page.num,
				}
				this.$uniRequest("acc/taskList!queryPendingTasks.do", 'GET', data).then(ret => {
					debugger
					let curPageData = ret.data.object;
					this.isShowEmail = ret.data.object1;
					
					if(data.pageIndex==0&&curPageData.length==0){
						this.mescroll.showEmpty();
					}else{
						this.mescroll.removeEmpty();
					}
					
					if(data.pageIndex==0){
						this.list = []; //如果是第一页需手动置空列表
					}
					
					this.list = this.list.concat(curPageData); //追加新数据
					if (curPageData.length < 10) {
						this.mescroll.endSuccess(curPageData.length, false);
						this.mescroll.endUpScroll(true)
					} else {
						this.mescroll.endSuccess(curPageData.length, true);
					}
				}).catch(err => {
					this.mescroll.endErr();
				})
			},
			downCallback() {
				console.log("downcall");
				this.upOption.page.num = 0;
				this.getData()
				// this.mescroll.resetUpScroll();
			},
			upCallback(page) {
				this.upOption.page.num += 1;
				this.getData()
				// this.getData()
			}
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
