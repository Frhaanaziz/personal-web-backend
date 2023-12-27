module.exports = {
  apps: [
    {
      name: 'dev.aththariq.com',
      script: 'npm',
      args: 'run start:prod',
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      //   instances: 'max',
      //   exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
