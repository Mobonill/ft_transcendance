/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   index.ts                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: morgane <morgane@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2025/08/23 11:46:51 by morgane           #+#    #+#             */
/*   Updated: 2025/08/23 11:49:41 by morgane          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

import Fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import oauthPlugin from '@fastify/oauth2';
import fastifyJwt from '@fastify/jwt';
import prismaPlugin from './plugins/prisma.js';
import playersRoutes from './routes/players.js';
import tournamentRoutes from './routes/tournament.js';
import usersRoutes from './routes/users.js';


const fastify = Fastify({
	logger: true
})

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env var: ${key}`);
  }
  return value;
}

fastify.register(fastifyCookie);
fastify.register(fastifyJwt, { secret: "secret123" });
fastify.register(oauthPlugin, {
	name: "fortytwoOAuth2",
	scope: ["public"],
	credentials: {
		client: {
			id: getEnv("CLIENT_ID"),
			secret: getEnv("CLIENT_SECRET"),
		},
		auth: oauthPlugin.FortyTwo,
	},
	startRedirectPath: "/auth/42/login",
	callbackUri: getEnv("REDIRECT_URI"),
});

await fastify.register(prismaPlugin);
await fastify.register(usersRoutes, { prefix: '/users' });
fastify.register(playersRoutes, { prefix: '/players' })
fastify.register(tournamentRoutes)


fastify.get('/', async (request : any, reply : any) => {
 return fastify.prisma.user.findMany({
    select: { id: true, username: true, avatarUrl: true }
  });
})

const start = async() => {
try { 
	await fastify.listen({ port: 3000, host: '0.0.0.0' });

} catch (error) {
		fastify.log.error(error);
		process.exit(1);
		fastify.printRoutes()
	}
}

start()
