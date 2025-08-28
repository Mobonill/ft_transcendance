import type { FastifyPluginAsync } from "fastify";
import oauthPlugin, { FastifyOAuth2Options } from "@fastify/oauth2";
import crypto from "crypto";

function getEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

const oauth42: FastifyPluginAsync = async (fastify) => {
  const opts: FastifyOAuth2Options = {
    name: "fortytwoOAuth",   // DOIT correspondre au nom que tu utilises ensuite
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
    generateStateFunction: () => crypto.randomBytes(16).toString("hex"),
    checkStateFunction: (req, providedState, callback) => {
      const stored = (req.cookies as any)?.["oauth2-fortytwoOAuth-state"];
      callback(null, stored === providedState);
    },
    cookie: {
      signed: true,
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  };

  // IMPORTANT: ici on doit "await"
  await fastify.register(oauthPlugin, opts);
};

export default oauth42;
