export default async function usersRoutes(app) {
    // GET /users
    app.get('/', async () => {
        return app.prisma.user.findMany({
            select: { id: true, email: true, username: true }
        });
    });
    // POST /users
    app.post('/', async (req, reply) => {
        const body = req.body;
        const user = await app.prisma.user.create({ data: body });
        reply.code(201).send(user);
    });
}
