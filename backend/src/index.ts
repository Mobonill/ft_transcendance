import Fastify from 'fastify';
import playersRoutes from './routes/players.js';
import tournamentRoutes from './routes/tournament.js';
// import baseDeDonnees from './routes/bd.js';

const fastify = Fastify({
	logger: true
})


fastify.register(playersRoutes, { prefix: '/players' })
fastify.register(tournamentRoutes)


fastify.get('/', async (request : any, reply : any) => {
// 	const data = await getData()
//   const processed = await processData(data)
//   return processed
	return {
		message: 'Hello'
	};
})

const start = async() => {
try { 
	await fastify.listen({ port: 3000, host: '0.0.0.0' });

} catch (error) {
		fastify.log.error(error);
		process.exit(1);
	}
}

start()
