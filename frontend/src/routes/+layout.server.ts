import { globalData, fillInGlobalInfo } from '$lib/globalinfo';

export async function load({}) {
	console.log('Loaded Global Data to page');
	if (!globalData) {
		console.log('Global data not found, filling in global info...');
		await fillInGlobalInfo();
	}
	return {
		globalData
	};
}