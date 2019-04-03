


export function getRedirectPath({type, avatar}){
	// 根据用户信息，返回跳转地址
	// user.type / restaurant/ customer
	// user.avatar / companyInfo / applicantInfo
	console.log(type, avatar);
	let url = (type === 'restaurant') ? '/restaurant': '/customer'
	if(!avatar) {
		url += 'info'
	}
	console.log('url',url)
	return url
}

export function getChatId(userId, targetId){
	return [userId, targetId].sort().join('_')
}