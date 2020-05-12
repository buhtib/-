<template>
	<view
		class="page-content"
		@click="$u.route({ url: '/pages/sort/index', type: 'switchTab' })">
		<van-image
			width="100%"
			height="300"
			lazy-load
			src="https://lgts.mynatapp.cc/management?id=banner1&type=sm&suffix=jpg"
		/>
		<van-image
			width="100%"
			height="300"
			lazy-load
			src="https://lgts.mynatapp.cc/management?id=banner2&type=sm&suffix=jpg"
		/>
		<van-image
			width="100%"
			height="300"
			lazy-load
			src="https://lgts.mynatapp.cc/management?id=banner3&type=sm&suffix=jpg"
		/>
		<van-image
			width="100%"
			height="300"
			lazy-load
			src="https://lgts.mynatapp.cc/management?id=banner4&type=sm&suffix=jpg"
		/>
		<van-image
			width="100%"
			height="300"
			lazy-load
			src="https://lgts.mynatapp.cc/management?id=banner5&type=sm&suffix=jpg"
		/>
	</view>
</template>

<script>
export default {
	mounted() {},
};
</script>

<style>
.page-content {
	overflow-y: auto;
}
</style>
