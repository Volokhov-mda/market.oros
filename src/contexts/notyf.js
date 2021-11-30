import { createContext } from "preact";
import { Notyf } from "notyf";

export default createContext(
  new Notyf({
    duration: 5000,
    ripple: false,
  })
);
