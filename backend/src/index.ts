import Fastify from 'fastify';

const fastify = Fastify({
	logger: true
})


fastify.get('/', async (request : any, response : any) => {
	//   reply.send({ Hello ! })
	return {
		message: 'Hello'
	};
	const t = () => {
		return true
	}
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
