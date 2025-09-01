export default async function tournamentRoutes(fastify, options) {
    const tournament = "You wanna fight ?";
    fastify.get('/tournament', async (request, reply) => {
        return tournament;
    });
}
