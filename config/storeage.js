/**
 * 存储Storage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	uni.setStorageSync(name, content)
}

/**
 * 获取Storage
 */
export const getStore = name => {
	if (!name) return;
	return uni.getStorageSync(name)
}

/**
 * 删除Storage
 */
export const removeStore = name => {
	if (!name) return;
	uni.removeStorageSync(name);
}