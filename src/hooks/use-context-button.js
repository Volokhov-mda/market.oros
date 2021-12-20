import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";

import { contextReorderButtonAtom } from "../data/atoms";

const useContextReorderButton = (button) => {
  const [, setContextButton] = useAtom(contextReorderButtonAtom);

  useEffect(() => {
    setContextButton(button);
    return () => setContextButton(null);
  }, [button]);
};

export default useContextReorderButton;
