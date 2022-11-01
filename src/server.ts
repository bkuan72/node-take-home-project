import { EntitiesController } from './server/controllers/entities.controller';
import toobusy_js from 'toobusy-js';
import SysEnv from './modules/SysEnv';
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'; // loads the .env environment
import validateEnv from './utils/validateEnv';
import App from './app';
import appDbConnection from './modules/AppDBModule';

// validate that all required environment variable is present
SysEnv.init();
validateEnv();

// const blacklistTokens = new TokenModel(blacklist_tokens_schema_table);
// const tokens = new TokenModel(tokens_schema_table);

const port = SysEnv.PORT;
// insert  authentication controller into stack
appDbConnection.initializeModuleDB().then(async () => {

const app = new App (
  [
    new EntitiesController(),

  ],
  port
);

app.listen();
});

process.on('SIGINT', function() {
  // app.close();
  // calling .shutdown allows your process to exit normally
  toobusy_js.shutdown();
  process.exit();
});

