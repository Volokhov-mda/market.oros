import { ClientContextProvider } from "react-fetching-library";

import App from "../App/App";

import { Client } from "../../api/client";

const Root = () => (
  <ClientContextProvider client={Client}>
    <App />
  </ClientContextProvider>
);

export default Root;
