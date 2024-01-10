<template>
	<uni-search-bar :style="{backgroundColor:bgcolor}" @confirm="search" cancel-button="none" :focus="true"
		v-model="searchValue">
	</uni-search-bar>
	<view class="catogory">
		<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" :show-scrollbar="true">
			<view class="scroll-view-item_H">
			    <view v-if="categories.length > 0" class="category-list">
			      <view v-for="category in categories" :key="category.id" class="category-item" @tap="navigateToCategory(category.id, category.catName)">
			        <text class="category-name" :style="{ color: isCategorySelected(category.id) ? selectedTextColor : defaultTextColor,backgroundColor: isCategorySelected(category.id) ? selectedBackgroundColor : defaultBackgroundColor }">{{ category.catName }}</text>
			      </view>
			    </view>
			    <view v-else>
			      <text>加载中...</text>
			    </view>
			</view>
		</scroll-view>
		<uni-icons :type="type" class="more"></uni-icons>
	</view>
	<view class="detail"></view>
</template>

<script>
	import articleCatsData from '@/http/home';
	export default {
		data() {
			return {
				searchValue: '',
				bgcolor: '#367BE7',
				frontColor: '#ffffff',
				type: 'bottom',
				categories: [], // 用于存储文章分类数据
				
				selectedCategory: 9,
				defaultColor: 'white',
				selectedColor: 'blue',
				defaultTextColor: 'black',
				selectedTextColor: 'white',
				selectedBackgroundColor: '#367BE7',
				defaultBackgroundColor: '#ffffff',
					  
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				backgroundColor: this.bgcolor,
				frontColor: this.frontColor
			});
			articleCatsData.fetchData().then(() => {
			      this.categories = articleCatsData.categories;
			});
		},
		methods: {
			formatDate(dateString) {
			    const date = new Date(dateString);
			    const year = date.getFullYear();
			    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
			    const day = date.getDate().toString().padStart(2, '0');
			
			    return `${year}-${month}-${day}`;
			},
			isCategorySelected(categoryId) {
			      return this.selectedCategory === categoryId;
			    },
			navigateToCategory(id, catName) {
				this.selectedCategory = id;
				uni.navigateTo({
					url: `/pages/index/categoryDetail?id=${id}&catName=${catName}`
				});
			},
			

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
		height: 50rpx;
		border-bottom: 1upx solid #ccc;
	}
	/deep/::-webkit-scrollbar{
		display: none;
		width: 0;
		height: 0;
	}


	.scroll-view-item_H {
		display: inline-block;
		width: 200px;
		height: 60rpx;
		line-height: 50rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.more {
		position: absolute;
		top: 10upx;
		right: 0;
		background-color: #f5f5f5;
	}
	.category-item {
	  margin-top: -5px;
	  margin-right: 20px; /* 为每个 category-item 添加右边距，使它们之间有间隔 */
	  white-space: nowrap; /* 防止文字换行 */
	  display: inline-block; /* 让每个 category-item 在同一行显示 */
	}


</style>