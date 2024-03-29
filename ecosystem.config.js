module.exports = {
  apps: [
    {
      name: "molestats",
      script: "./app.js",
      instances: 1,
      autorestart: true,
      max_restarts: 1,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
