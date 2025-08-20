import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma.js';
import playersRoutes from './routes/players.js';
import tournamentRoutes from './routes/tournament.js';
import usersRoutes from './routes/users.js';


const fastify = Fastify({
	logger: true
})

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
