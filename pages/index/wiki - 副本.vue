<template>
	<uni-search-bar :style="{backgroundColor:bgcolor}" @confirm="search" cancel-button="none" :focus="true"
		v-model="searchValue">
	</uni-search-bar>
	<view class="catogory">
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" :show-scrollbar="true">
			<view class="scroll-view-item_H ">A</view>
			<view class="scroll-view-item_H ">B</view>
			<view class="scroll-view-item_H ">C</view>
			<view class="scroll-view-item_H ">D</view>
			<view class="scroll-view-item_H ">E</view>
			<view class="scroll-view-item_H ">F</view>
			<view class="scroll-view-item_H ">A</view>
			<view class="scroll-view-item_H ">B</view>
			<view class="scroll-view-item_H ">C</view>
			<view class="scroll-view-item_H ">D</view>
			<view class="scroll-view-item_H ">E</view>
			<view class="scroll-view-item_H ">F</view>
			<view class="scroll-view-item_H ">JAVA</view>
			<view class="scroll-view-item_H ">A</view>
			<view class="scroll-view-item_H ">B</view>
			<view class="scroll-view-item_H ">C</view>
			<view class="scroll-view-item_H ">D</view>
			<view class="scroll-view-item_H ">E</view>
			<view class="scroll-view-item_H "></view>

		</scroll-view>
		<uni-icons :type="type" class="more"></uni-icons>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				bgcolor: '#e43d33',
				frontColor: '#ffffff',
				type: 'bottom'
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				backgroundColor: this.bgcolor,
				frontColor: this.fontColor
			})
		},
		methods: {
			search(e) {
				console.log(e)
			},
			scroll(e) {
				// console.log(e)
			}
		}
	}
</script>

<style>
	.catogory {
		position: relative;

	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 60rpx;
		border-bottom: 1upx solid #ccc;
	}
	/deep/::-webkit-scrollbar{
		display: none;
		width: 0;
		height: 0;
	}


	.scroll-view-item_H {
		display: inline-block;
		width: 100upx;
		line-height: 60rpx;
		text-align: center;
		font-size: 16rpx;
	

	}

	.more {
		position: absolute;
		top: 10upx;
		right: 0;
		background-color: #f5f5f5;
	}
</style>