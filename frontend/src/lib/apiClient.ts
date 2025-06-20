import axios from 'axios';

import { OAUTH_CONSUMER_KEY, OAUTH_SIGNATURE } from '$env/static/private';
function generateNonce() {
	return (
		Date.now().toString(36) +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

function getTimestamp() {
	return Math.floor(Date.now() / 1000).toString();
}


const apiClient = axios.create({
	baseURL: 'https://api.schoology.com/v1/',
	maxRedirects: 0
});

apiClient.interceptors.request.use((config) => {
	const nonce = generateNonce();
	const timestamp = getTimestamp();

	config.headers = config.headers || {};
	config.headers['Authorization'] =
		`OAuth realm="Schoology API",` +
		` oauth_consumer_key="${OAUTH_CONSUMER_KEY}",` +
		` oauth_token="",` +
		` oauth_nonce="${nonce}",` +
		` oauth_timestamp="${timestamp}",` +
		` oauth_signature_method="PLAINTEXT",` +
		` oauth_version="1.0",` +
		` oauth_signature="${OAUTH_SIGNATURE}"`;

	return config;
});

export default apiClient;

// Helper to handle redirects manually
export async function apiGetWithRedirect(url: string, config = {}) {
	try {
		const response = await apiClient.get(url, config);
		return response;
	} catch (error: any) {
		// If we get a 3xx redirect, follow it manually with a new request (new nonce/timestamp)
		if (error.response && error.response.status >= 300 && error.response.status < 400) {
			const location = error.response.headers['location'];
			if (location) {
				// Remove baseURL if present in the redirect location
				const redirectUrl = location.startsWith('http')
					? location.replace(apiClient.defaults.baseURL || '', '')
					: location;
				return await apiClient.get(redirectUrl, config);
			}
		}
		throw error;
	}
}
