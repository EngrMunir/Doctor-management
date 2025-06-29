/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import mongoose from 'mongoose';
import app from './app';

import { Server } from 'http';
import config from './app/config';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`App listening on port http://localhost:${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();