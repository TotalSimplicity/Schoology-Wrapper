import apiClient from '$lib/apiClient';

export async function GET({ params }) {
	const assignmentRes = await apiClient.get(
		`sections/${params.course_id}/assignments/${params.assignment_id}`
	);
	const assignment = assignmentRes.data;
	console.log(assignment);
	return new Response(JSON.stringify(assignment), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
