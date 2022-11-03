import * as express from 'express';
// import cookieParser = require('cookie-parser');
import SysLog from './modules/SysLog';
import toobusy_js = require('toobusy-js');
import ServerTooBusyException from './exceptions/ServerTooBusyException';
// import rateLimit = require('express-rate-limit');
import SysEnv from './modules/SysEnv';
import cors = require('cors');




class App {
  public app: express.Application;
  public port: number;
  public logger: any;

  constructor(controllers: any[], port: number) {
    this.app = express.default();
    this.port = port;
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    // The default maxLag value is 70ms, and the default check interval is 500ms.
    // This allows an "average" server to run at 90-100% CPU and keeps request latency
    // at around 200ms. For comparison, a maxLag value of 10ms results in 60-70% CPU usage,
    // while latency for "average" requests stays at about 40ms
    toobusy_js.maxLag(SysEnv.TOOBUSY_MAX_LAG);
    toobusy_js.interval(SysEnv.TOOBUSY_CHECK_INTERVAL);
    toobusy_js.onLag(function(currentLag: number) {
      SysLog.info("Event loop lag detected! Latency: " + currentLag + "ms");
    });
  }

  loggerMiddleware = (request: express.Request, _response: express.Response, next: any) => {
    SysLog.http('Request Header:' + request.url);
    SysLog.http('Request Body :' + JSON.stringify(request.body));
    SysLog.http('Request Parameters :' + JSON.stringify(request.params))
    next();
  }

  private initializeMiddlewares() {
    const corsOptions = {
      origin: [SysEnv.VALID_CORS_ORIGIN],
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.urlencoded({ limit: SysEnv.MAX_URLENCODE_SIZE, extended: true ,  parameterLimit:50000 }));
    this.app.use(express.json({ limit: SysEnv.MAX_JSON_SIZE }));

    this.app.use(this.loggerMiddleware);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(function(_req, _res, next) {
      if (toobusy_js()) {
        next(new ServerTooBusyException());
      } else {
        next();
      }
    })
  }

  private initializeControllers(controllers: any[]) {
    controllers.forEach((controller: { router: import("express-serve-static-core").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs>; }) => {
      this.app.use('/api', controller.router);
    });
  }


  public listen(): void {
    console.log(`App listening on the port ${this.port}`);
    this.app.listen(this.port, () => {
      SysLog.info(`App listening on the port ${this.port}`);
    });
  }
}

export default App;