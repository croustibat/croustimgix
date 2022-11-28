const fastify = require("fastify")({
  logger: true,
});
const imagist = require("./imagist/fastify");
const imagistFastify = imagist({
  host: process.env.IMAGIST_HOST,
  ssl: process.env.IMAGIST_SSL || false,
});

// main url
fastify.get("/i/*", imagistFastify());

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT || 3000, "0.0.0.0");
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
start();
