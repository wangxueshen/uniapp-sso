<template>
	<view class="content">
		<image class="logo" src="/static/pic_register.png"></image>
		<form @submit="submitForm">
			<view class="login-input" style="margin-top: 80rpx;">
				<image style="width: 40rpx; height: 40rpx; flex-shrink: 0;" src="/static/iv_login_user_name.png">
				</image>
				<input class="userName-input" name="userName" placeholder="请输入用户名" />
			</view>
			<view class="login-input" style="margin-top: 30rpx;">
				<image style="width: 40rpx; height: 40rpx; flex-shrink: 0;" src="/static/iv_login_user_pwd.png"></image>
				<input class="userName-input" password="true" type="text" name="password" placeholder="请输入密码" />
			</view>

			<button class="blueButton login-button" form-type="submit">
				登录
			</button>
		</form>
	</view>
</template>

<script>
	import md5 from '../../common/md5.js';
	export default {
		data() {
			return {
				userName: '', //姓名
				password: '', //密码
			}
		},
		methods: {
			submitForm(e) {
				debugger;
				let value = e.detail.value;
				if (!value.userName) {
					return uni.showToast({
						title: "请输入用户名",
						icon: 'none'
					})

				} else if (!value.password) {
					return uni.showToast({
						title: "请输入密码",
						icon: 'none'
					})
				} else {
					uni.showLoading({
						title: '请稍后'
					});
					uni.request({
						sslVerify: false,
						url: getApp().globalData.BaseUrl + "acc/doLogin.do",
						method: 'GET',
						data: {
							userName: value.userName,
							password: md5(value.password),
							clientId: plus.push.getClientInfo().clientid,
							platform: 'Android',
						},
						success: (res) => {
							uni.hideLoading()
							console.log(plus.push.getClientInfo());
							console.log('uniId login success', res);
							if (res.data.result == 'loginSuccess') {
								uni.setStorageSync('ticket', res.data.ticket)
								uni.switchTab({
									url: '/pages/home/home'
								})
								uni.showToast({
									title: '登录成功',
									icon: 'success',
								})
							} else {
								uni.showToast({
									title: res.data.message,
									icon: 'none',
								})
							}
						},
						fail: (e) => {
							console.log(e);
							uni.hideLoading()
							uni.showModal({

							})
						}
					})
				}

			},

		}
	}
</script>

<style>
	.login-input {
		margin: 40rpx;
		padding-left: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		align-content: center;
		background: #f5f5f5;
		border-radius: 120rpx;

	}

	.userName-input {
		flex: 1;
		margin: 20rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 390rpx;
		width: 428rpx;
		margin-top: 200rpx;
	}

	.login-button {
		width: 90%;
		margin-top: 60rpx;
	}
</style>
