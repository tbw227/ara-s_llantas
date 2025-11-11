module.exports = {
  apps: [
    {
      name: 'aras-llantas-api',
      script: 'server.js',
      instances: 1, // Single instance for VPS (change to 'max' for more powerful servers)
      exec_mode: 'fork', // Use fork mode for single instance
      cwd: process.cwd(),
      env: {
        NODE_ENV: 'development',
        PORT: 8000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000,
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
      max_memory_restart: '1G',
      node_args: '--max-old-space-size=1024',
      autorestart: true,
      watch: false,
      max_restarts: 10,
      min_uptime: '10s',
    },
  ],
};
