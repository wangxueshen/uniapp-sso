<template>
	<image src="../../static/iv_welcome.png" style="width: 100%; height: 100%;"></image>
</template>

<script>
	export default {
		onLoad() {
			var ticket = uni.getStorageSync('ticket')
			if (ticket) {
				uni.navigateTo({
					url: 'pages/home/home'
				})
			} else {
				uni.navigateTo({
					url: "pages/other/login"
				})
			}
		}
	}
</script>

<style>
</style>
