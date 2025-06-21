import apiClient from '$lib/apiClient';

export async function GET({ params }) {
	const pageRes = await apiClient.get(
		`sections/${params.course_id}/pages/${params.page_id}`
	);
	const page = pageRes.data;
	console.log(page);
	return new Response(JSON.stringify(page), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
