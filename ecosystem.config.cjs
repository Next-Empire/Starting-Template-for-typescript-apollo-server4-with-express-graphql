/**
 * PM2 configuration for:
 * Process management:
 * -- PM2 helps you manage your GraphQL API as a process, allowing you to start, stop, restart, and monitor your application with ease.
 * Automatic restart:
 * -- PM2 can automatically restart your GraphQL API in case of a crash or error, ensuring that your application is always running smoothly.
 * Load balancing: (round-robin #default)
 * -- If your GraphQL API receives a high volume of traffic, PM2 can help you distribute the load across multiple instances of your application, improving performance and reliability.
 * Logging:
 * -- PM2 provides built-in log management capabilities, making it easy to view and analyze logs from your GraphQL API.
 * Deployment:
 * -- PM2 can simplify the deployment process for your GraphQL API by providing a variety of deployment options, including Git integration, script deployment, and more.
 */

module.exports = {
  apps: [
    {
      name: "app",
      script: "./dist/index.js",
      out_file: "/dev/null",
      error_file: "/dev/null",
      listen_timeout: 10000,
      instances: 10,
      watch: true,
      env_development: {
        JWT_TOKEN: "token",
        MONGODB_URI: "mongodb://127.0.0.1:27017/users",
        G_MAIL_PASS: "fhexouchoqkcvoyn",
        MY_EMAIL: "abdiurgessa9@gmail.com",
        SESSION_TOKEN: "token",
        MONGO_SESSION_TOKEN: "token",
        PORT: 4000,
        HOST: "localhost",
        NODE_ENV: "development",
        PROTOCOL: "https",
        SERVER: "https://localhost:4000/",
        DEBUG: "*",
      },
      env_production: {
        NODE_ENV: "production",
      },
      ignore_watch: ["node_modules"],
    },
  ],
};
