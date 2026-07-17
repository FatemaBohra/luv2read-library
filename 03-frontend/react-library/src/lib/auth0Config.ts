export const auth0Config = {
    clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || 'r6f5tafiKTUB0t3gaSsI3Dy4TlawSuSs',
    issuer: process.env.REACT_APP_AUTH0_DOMAIN || 'dev-58r52o8fx5djc8od.us.auth0.com',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || 'https://luv2read-api',
    redirectUri: window.location.origin + "/callback",
    scope: 'openid profile email'
}