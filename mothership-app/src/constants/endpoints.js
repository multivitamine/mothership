const websiteUrl = 'https://mothership.pangaeatest.nl/';

export const API_ROOT = process.env.NODE_ENV === 'production' ? '/api/' : websiteUrl + 'api/';

export const WEBSITE_URL = process.env.NODE_ENV === 'production' ? '' : websiteUrl;
