module.exports = {
  apps: [
    {
      name: "mariapori-website",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/home/miro/projects/mariapori-website",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
