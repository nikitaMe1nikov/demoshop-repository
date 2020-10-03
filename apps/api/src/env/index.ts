let env: any;

if (process.env.production) {
  env = require('./env.prod').default;
} else {
  env = require('./env.dev').default;
}

export default env;
