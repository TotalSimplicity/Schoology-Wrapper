import apiClient from '$lib/apiClient';

export async function GET({ params }) {
	const documentRes = await apiClient.get(
		`sections/${params.course_id}/documents/${params.document_id}`
	);
	const document = documentRes.data;
	console.log(document);
	return new Response(JSON.stringify(document), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
