"dotenv/config";
import Fastify from "fastify";
import crypto from "crypto";
// import fastifyCookie from "fastify-cookie";
import fastifyCookie from "@fastify/cookie";
// import fastifyCookie from "@fastify/cookie";
// import prismaPlugin from "./plugins/prisma.js";
// import oauth42 from "./plugins/oauth.js";
// import playersRoutes from "./routes/players.js";
// import tournamentRoutes from "./routes/tournament.js";
// import usersRoutes from "./routes/users.js";


const fastify = Fastify({ logger: true });

function generateState(): string {
	return crypto.randomBytes(16).toString("hex");
}

fastify.register(fastifyCookie, { secret: process.env.COOKIE_SECRET! });

// await fastify.register(prismaPlugin);
// await fastify.register(oauth42);
// fastify.after(() => {
//	console.log("✅ OAuth plugin chargé:", fastify.fortytwoOAuth);
// });

// await fastify.register(usersRoutes, { prefix: "/users" });
// fastify.register(playersRoutes, { prefix: "/players" });
// fastify.register(tournamentRoutes, {prefix: '/tournament'});

fastify.get("/", async () => {
	return { message: "HELLO !!! /auth/42/login pour te connecter avec 42" };
});


fastify.get("/auth/42/login", async (reply:any) => {
	const state = generateState();
	console.log(state);
	reply.setCookie("oauth_cookie", state);
	const url = `https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-c45fec7ff3c070b86aabb0ec3654e9718f0bb6ed6e39ca7c9c797a2bb131cc8d&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fcallback&response_type=code&state=${state}`;
	reply.redirect(url);
});

fastify.get("/auth/callback", async (request:any, reply:any) => {
	const code = (request.query as any).code;
	const state = (request.query as any).state;
	if (!code || !state)
		return reply.send({Error: "No code sent"});
	if (request.cookies.oauth_state !== state)
		return reply.code(400).send({Error: "Wrong state received"});
	return reply.send({code}); 
});



await fastify.listen({ port: 3000, host: "0.0.0.0" });