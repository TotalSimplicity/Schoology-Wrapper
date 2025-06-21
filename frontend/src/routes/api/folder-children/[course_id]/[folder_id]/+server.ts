import apiClient from '$lib/apiClient';

export async function GET({ params }) {
	const folderChildrenRes = await apiClient.get(
		`courses/${params.course_id}/folder/${params.folder_id}`
	);
	const folders = folderChildrenRes.data['folder-item'];
	return new Response(JSON.stringify(folders), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
