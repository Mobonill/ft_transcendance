import type { FastifyPluginAsync, FastifyInstance, FastifyRequest } from "fastify";
import oauthPlugin, { FastifyOAuth2Options, FastifyCheckStateFunction } from "@fastify/oauth2";

// Récupération d'une variable d'environnement
function getEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}


// Vérification du state (avec cast pour bypass TS)
function checkState(
  this: FastifyInstance,
  req: FastifyRequest,
  providedState: string,
  callback: (err: Error | null, result?: boolean) => void
): void {
  try {
    const stored = (req as any).cookies?.["oauth2-fortytwoOAuth-state"];
    callback(null, stored === providedState);
  } catch (err) {
    callback(err as Error);
  }
}

const oauth42: FastifyPluginAsync = async (fastify) => {
  const opts: FastifyOAuth2Options = {
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
      secure: false,  // ⚠️ mettre true en prod avec HTTPS
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },

    // On caste pour forcer TS à accepter
    generateStateFunction: generateState as any,
    checkStateFunction: checkState as unknown as FastifyCheckStateFunction,
  };

await fastify.register(oauthPlugin, opts);
};

export default oauth42;