
export default async function tournamentRoutes(fastify : any, options : any) {
  const tournament = "You wanna fight ?"


  fastify.get('/tournament', async (request : any, reply : any) => {
    return tournament
  });
}