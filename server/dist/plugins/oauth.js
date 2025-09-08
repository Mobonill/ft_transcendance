import oauthPlugin from "@fastify/oauth2";
import crypto from "crypto";
// Récupération d'une variable d'environnement
function getEnv(key) {
    const v = process.env[key];
    if (!v)
        throw new Error(`Missing env var: ${key}`);
    return v;
}
// Génération du state aléatoire
function generateState() {
    return crypto.randomBytes(16).toString("hex");
}
// Vérification du state (avec cast pour bypass TS)
function checkState(req, providedState, callback) {
    try {
        const stored = req.cookies?.["oauth2-fortytwoOAuth-state"];
        callback(null, stored === providedState);
    }
    catch (err) {
        callback(err);
    }
}
const oauth42 = async (fastify) => {
    const opts = {
        name: "fortytwoOAuth",
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
        // Config cookie (ne pas mettre cookieName ici !)
        cookie: {
            signed: true,
            secure: false, // ⚠️ mettre true en prod avec HTTPS
            httpOnly: true,
            sameSite: "lax",
            path: "/",
        },
        // On caste pour forcer TS à accepter
        generateStateFunction: generateState,
        checkStateFunction: checkState,
    };
    await fastify.register(oauthPlugin, opts);
};
export default oauth42;
