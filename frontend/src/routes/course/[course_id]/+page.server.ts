import apiClient from '$lib/apiClient.js';
export async function load({ params }) {
	const courseRes = await apiClient.get(`sections/${params.course_id}`);
	const courseData = courseRes.data;

	const foldersRes = await apiClient.get(`sections/${params.course_id}/folders?limit=10000`);
	const folders = foldersRes.data.folders;
	return {
		courseData,
		folders
	};
}
