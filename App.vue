<script>
	export default {
		globalData: {
			BaseUrl: 'http://192.168.1.240:8083/txapp/'
		},
		onLaunch: function() {
			console.log('App Launch')
			

			if (process.env.NODE_ENV === 'development') {

			} else {
				globalData.BaseUrl = "http://txapp.tengxincar.com/"
			}
			console.log("onLaunch");
			var ticket = uni.getStorageSync('ticket')
			if (ticket) {
				uni.switchTab({
					url: 'pages/home/home'
				})
			} else {
				uni.redirectTo({
					url: "pages/other/login"
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("./common/uni.css");


	page {
		background-color: #efeff4;
		width: 100%;
		height: 100%;
		font-size: 28rpx;
		line-height: 1.8;
	}

    button::after{
		border: none;
	}

	.blueButton {
		color: white;
		background-color: #3180FF;
		border-radius: 60rpx;
	}

	.radius-60 {
		border-radius: 60rpx;
	}

	.margin-top-20 {
		margin-top: 20rpx;
	}

	.margin-left-20 {
		margin-left: 20rpx;
	}

	.margin-right-20 {
		margin-right: 20rpx;
	}

	.model-name {
		font-size: 32rpx;
	}

	.mui-ellipsis-2 {
		display: -webkit-box;
		overflow: hidden;
		white-space: normal !important;
		text-overflow: ellipsis;
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.line-row{
		width:100% ;
		height: 2rpx;
		margin-top: 2rpx;
		margin-bottom: 2rpx;
		background-color:#e8e8e8 ;
	}
</style>
