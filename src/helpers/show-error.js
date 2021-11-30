import { Notyf } from "notyf";

const notyf = new Notyf();

const showError = (payload) => {
  const message = payload?.error || "Unknown error occured";
  notyf.error(message);
};

export default showError;
