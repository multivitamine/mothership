const websiteUrl = 'http://localhost:2000/';

export const API_ROOT = process.env.NODE_ENV === 'production' ? '/api/' : websiteUrl + 'api/';

export const WEBSITE_URL = process.env.NODE_ENV === 'production' ? '' : websiteUrl;
