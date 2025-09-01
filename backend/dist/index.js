import "dotenv/config";
import Fastify from "fastify";
import fastifyCookie from "@fastify/cookie";
import prismaPlugin from "./plugins/prisma.js";
import playersRoutes from "./routes/players.js";
import tournamentRoutes from "./routes/tournament.js";
import usersRoutes from "./routes/users.js";
import oauth42 from "./plugins/oauth.js";
const fastify = Fastify({ logger: true });
// 1) Cookies (pour le state signé)
fastify.register(fastifyCookie, { secret: "secret123" });
// 2) Plugins
await fastify.register(prismaPlugin);
await fastify.register(oauth42);
fastify.after(() => {
    console.log("✅ OAuth plugin chargé:", typeof fastify.fortytwoOAuth);
});
// 3) Routes métier
await fastify.register(usersRoutes, { prefix: "/users" });
fastify.register(playersRoutes, { prefix: "/players" });
fastify.register(tournamentRoutes);
// --- Routes OAuth ---
fastify.get("/", async () => {
    return { message: "Clique sur /auth/42/login pour te connecter avec 42" };
});
fastify.get("/auth/callback", async (req, reply) => {
    console.log("👉 Callback hit, fastify.fortytwoOAuth=", !!fastify.fortytwoOAuth);
    try {
        const token = await fastify.fortytwoOAuth.getAccessTokenFromAuthorizationCodeFlow(req);
        console.log("✅ Got token:", token);
        reply
            .setCookie("token42", token.access_token, {
            httpOnly: true,
            sameSite: "lax",
            path: "/",
            secure: false, // true en prod
        })
            .redirect("/me");
    }
    catch (err) {
        fastify.log.error(err);
        reply.code(500).send({ error: "auth_failed" });
    }
});
fastify.get("/me", async (req, reply) => {
    const token42 = req.cookies?.token42;
    if (!token42)
        return reply.code(401).send({ error: "not_authenticated" });
    const res = await fetch("https://api.intra.42.fr/v2/me", {
        headers: { Authorization: `Bearer ${token42}` },
    });
    if (!res.ok)
        return reply.code(res.status).send({ error: "profile_fetch_failed" });
    return res.json();
});
// --- Lancement ---
await fastify.listen({ port: 3000, host: "0.0.0.0" });
