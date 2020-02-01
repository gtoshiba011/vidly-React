import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn: "https://9b76c48089b94bca922542b2454274c8@sentry.io/2142832"
  // });
}

function log(error) {
  // Sentry.captureException(error);
  console.log(error);
}

export default { init, log };
