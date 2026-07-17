export const auth0Config = {
    clientId: 'r6f5tafiKTUB0t3gaSsI3Dy4TlawSuSs',
    issuer: 'dev-58r52o8fx5djc8od.us.auth0.com',
    audience: "http://localhost:8080",
    redirectUri: window.location.origin + "/callback",
    scope: 'openid profile email'
}