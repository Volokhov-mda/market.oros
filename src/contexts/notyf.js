import { createContext } from "preact";
import { Notyf } from "notyf";

export default createContext(
  new Notyf({
    duration: 3000,
    ripple: false,
  })
);
