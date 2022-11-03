// import { EntitiesController } from './server/controllers/organization/entities.controller';
import toobusy_js from 'toobusy-js';
import SysEnv from './modules/SysEnv';
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'dotenv/config'; // loads the .env environment
import validateEnv from './utils/validateEnv';
import App from './app';
import appDB from './modules/DB.module'
import AppGraphQL from './services/GraphQL.service';

// validate that all required environment variable is present
SysEnv.init();
validateEnv();

// const blacklistTokens = new TokenModel(blacklist_tokens_schema_table);
// const tokens = new TokenModel(tokens_schema_table);


// insert  authentication controller into stack
appDB.initialize().then(async () => {



const appGraphQL = new AppGraphQL();

appGraphQL.listen();
// const port = SysEnv.APP_PORT;
// const app = new App (
//   [
//     new EntitiesController(),

//   ],
//   port
// );
// app.listen();

});

process.on('SIGINT', function() {
  // app.close();
  // calling .shutdown allows your process to exit normally
  toobusy_js.shutdown();
  process.exit();
});

