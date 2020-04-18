const fastify = require("fastify")({
  logger: true,
});
const imagist = require("./imagist/fastify");
const imagistFastify = imagist({
  host:
    process.env.IMAGIST_HOST ||
    "coronamaison.auth-e8ff76c02e7a414c81127818b6d04ea0.storage.gra.cloud.ovh.net",
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
};
start();
