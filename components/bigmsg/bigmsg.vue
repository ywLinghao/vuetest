<template>
	<view class="big-msg">
		<view class="msg-user">用户：{{user}}</view>
		<view class="msg-content">{{content}}</view>
		<view class="msg-time">发生时间: {{happen}}</view>
	</view>
</template>

<script>
	export default {
	  name:"bigmsg",
	  props:{
	    user: '',
	    content:'',
	    happen:''
	  },
	  data() {
	    return {
	
	    };
	  }
	}
</script>

<style>

</style>
