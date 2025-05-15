// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://fa24cdd21a59789d4c055b4130f0b88d@o4509328316694528.ingest.us.sentry.io/4509328318267392",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
