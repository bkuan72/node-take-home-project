/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    cleanEnv, str, port, num
  } from 'envalid';

  function validateEnv() {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        MAX_URLENCODE_SIZE: str(),
        MAX_JSON_SIZE: str(),
        VALID_CORS_ORIGIN: str(),
        GRAPHQL_PORT: port(),
        APP_PORT: port(),
        TOOBUSY_MAX_LAG: num(),
        TOOBUSY_CHECK_INTERVAL: num()
    });
  }

  export default validateEnv;