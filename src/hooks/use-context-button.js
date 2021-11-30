import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";

import { contextButtonAtom } from "../data/atoms";

const useContextButton = (button) => {
  const [, setContextButton] = useAtom(contextButtonAtom);

  useEffect(() => {
    setContextButton(button);
    return () => setContextButton(null);
  }, [button]);
};

export default useContextButton;
