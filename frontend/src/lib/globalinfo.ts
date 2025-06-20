import apiClient, { apiGetWithRedirect } from './apiClient';

export let globalData: {
	user_id: number;
	courses: any[];
};

export async function fillInGlobalInfo() {
	let userId: number | undefined;
	let courses: any[] = [];
	console.log('Attempting Load');
	await apiGetWithRedirect('users/me').then((response) => {
		if (response.data && response.data.id) {
			userId = response.data.id;
			console.log('User ID found:', userId);
		} else {
			console.error('User ID not found in response:', response.data);
		}
	});
	try {
		const courseRes = await apiClient.get(`users/${userId}/sections`);
		courses = courseRes.data.section || [];
	} catch {
		console.error('Internet Failed somehow');
	}

	globalData = {
		user_id: userId || 0,
		courses: courses
	};
	console.log('Global data filled:', globalData);
}
