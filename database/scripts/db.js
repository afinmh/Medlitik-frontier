#!/usr/bin/env node

/**
 * Database Management Scripts
 * Utilitas untuk mengelola database migrations dan seeders
 */

const { exec } = require('child_process');
const path = require('path');

const commands = {
  // Migration commands
  'migrate': 'npx sequelize-cli db:migrate',
  'migrate:undo': 'npx sequelize-cli db:migrate:undo',
  'migrate:undo:all': 'npx sequelize-cli db:migrate:undo:all',
  'migrate:status': 'npx sequelize-cli db:migrate:status',
  
  // Seeder commands
  'seed': 'npx sequelize-cli db:seed:all',
  'seed:undo': 'npx sequelize-cli db:seed:undo:all',
  
  // Database commands
  'db:create': 'npx sequelize-cli db:create',
  'db:drop': 'npx sequelize-cli db:drop',
  
  // Fresh install
  'fresh': 'npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all',
  
  // Reset database
  'reset': 'npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all'
};

const command = process.argv[2];

if (!command || !commands[command]) {
  console.log('Available commands:');
  Object.keys(commands).forEach(cmd => {
    console.log(`  npm run db:${cmd}`);
  });
  process.exit(1);
}

console.log(`Running: ${commands[command]}`);

exec(commands[command], (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(stdout);
});
