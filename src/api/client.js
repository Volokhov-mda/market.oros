import { createClient } from "react-fetching-library";

import {
  requestHostInterceptor,
  responseErrorInterceptor,
  requestTokenInterceptor,
} from "./interceptors";

const HOST = process.env.PREACT_APP_API_HOST;

export const Client = createClient({
  requestInterceptors: [requestHostInterceptor(HOST), requestTokenInterceptor],
  responseInterceptors: [responseErrorInterceptor],
});
