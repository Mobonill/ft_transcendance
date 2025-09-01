import oauthPlugin from "@fastify/oauth2";
import crypto from "crypto";
// Récupération des variables d’env
function getEnv(key) {
    const v = process.env[key];
    if (!v)
        throw new Error(`Missing env var: ${key}`);
    return v;
}
// Génère un state aléatoire
const generateState = () => crypto.randomBytes(16).toString("hex");
// Vérifie le state (utilise les cookies signés par fastify-cookie)
const checkState = (req, providedState, callback) => {
    try {
        const cookies = req.cookies || {};
        const stored = cookies["oauth2-fortytwoOAuth-state"] ??
            cookies["oauth2-state"] ??
            cookies["oauth_state"] ??
            cookies["state"];
        callback(null, Boolean(stored) && stored === providedState);
    }
    catch (err) {
        callback(err);
    }
};
// Plugin OAuth2 pour l’API 42
const oauth42 = async (fastify) => {
    const opts = {
        name: "fortytwoOAuth", // ⚠️ doit correspondre au declare module
        scope: ["public"],
        credentials: {
            client: { id: getEnv("CLIENT_ID"), secret: getEnv("CLIENT_SECRET") },
            auth: {
                authorizeHost: "https://api.intra.42.fr",
                authorizePath: "/oauth/authorize",
                tokenHost: "https://api.intra.42.fr",
                tokenPath: "/oauth/token",
            },
        },
        startRedirectPath: "/auth/42/login",
        callbackUri: getEnv("REDIRECT_URI"),
        cookie: {
            signed: true,
            secure: false, // ⚠️ passe à true en prod avec HTTPS
            httpOnly: true,
            sameSite: "lax",
            path: "/",
        },
        generateStateFunction: generateState,
        checkStateFunction: checkState,
    };
    fastify.register(oauthPlugin, opts);
};
export default oauth42;
