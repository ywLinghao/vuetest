<template>
	<view>
		<button type="default" @click="login" >点击登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login() {
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log("cg");
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log('用户昵称为：' + infoRes.userInfo.nickName);
				      }
				    });
				  }
				});
			}
		}
	}
</script>

<style>

</style>
