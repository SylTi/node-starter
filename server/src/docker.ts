import server from './server';

process.on('SIGINT', () => {
  console.log(`Got SIGINT (aka ctrl-c in docker). Graceful shutdown ${new Date().toISOString()}`);
  shutdown();
});

process.on('SIGTERM', () => {
  console.log(`Got SIGTERM (docker container stop). Graceful shutdown ${new Date().toISOString()}`);
  shutdown();
});

function shutdown() {
  server.close((err) => {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}
