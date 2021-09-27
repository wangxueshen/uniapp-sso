export function uniRequest(url, methods, data, util) {
	//加载loading
	uni.showLoading({
		title: '加载中'
	})
	uni.getNetworkType({
		success: (ret) => {
			if (ret.networkType == 'none') {
				uni.hideLoading();
				return uni.showToast({
					title: '网络不给力,请监测网络!',
					icon: 'none',
				})
			}
		}
	});
	if (util == undefined) {
		util = {
			showError: true, //开启错误提示
		}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: getApp().globalData.BaseUrl + url,
			method: methods || 'POST', //请求方式必须大写
			data: data,
			timeout: 50000,
			header: {
				'Content-Type': 'application/json;charset=UTF-8',
			},
			dataType: 'json',
			success: (res) => {
				console.log('success===>', res)
				if (res.data.result) {
					resolve(res)
				} else {
					/**
					 * 请求失败，是否要提示出来;
					 * showError: true,开启错误提示
					 *  showError: false,关闭错误提示
					 * */
					if (util.showError) {
						uni.hideLoading()
						uni.showToast({
							title: res.data.message || '',
							icon: 'none',
							duration: 3000
						});
					}
					resolve(res)
				}
			},
			//失败调用reject，
			fail: (err) => {
				// loggingRecords(data.requestModule,data.requestFeatures,data.dataObjId,dataTemp,err);
				console.log('请求失败，', JSON.stringify(err))
				let title = err.data && err.data.message || err.errMsg || ''
				// 失败做处理
				if (util.showError) {
					uni.showToast({
						title: title,
						icon: 'none',
						duration: 3000
					});
				}
				reject(err)
			},
			complete() {
				uni.hideLoading()
			}
		})
	})
}
