let players = [
    { id: 1, alias: 'Morgane' },
    { id: 2, alias: 'Robin' }
];
async function playersRoutes(fastify, options) {
    // GET /players
    fastify.get('/', async () => players);
    // GET /players/:id
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params; // request.params contient tous les paramètres dynamiques ({ id: "2" })
        const player = players.find(p => p.id === parseInt(id)); // transforme le id texte en nombre
        if (!player) {
            return reply.code(404).send({ error: 'Player not found' });
        }
        return player;
    });
    // POST /players
    fastify.post('/', async (request, reply) => {
        const newPlayer = request.body;
        newPlayer.id = Date.now();
        players.push(newPlayer);
        reply.code(201).send(newPlayer);
    });
    // PUT /players/:id
    fastify.put('/:id', async (request, reply) => {
        const { id } = request.params;
        const updatedPlayer = request.body;
        const index = players.findIndex(p => p.id === parseInt(id));
        if (index === -1)
            return reply.code(404).send({ error: 'Not found' });
        players[index] = { ...players[index], ...updatedPlayer };
        return players[index];
    });
    // DELETE /players/:id
    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params;
        const index = players.findIndex(p => p.id === parseInt(id));
        if (index === -1)
            return reply.code(404).send({ error: 'Not found' });
        const removed = players.splice(index, 1);
        return removed[0];
    });
}
export default playersRoutes;
