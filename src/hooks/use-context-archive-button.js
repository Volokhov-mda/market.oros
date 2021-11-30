import { useAtom } from "jotai";
import { useEffect } from "preact/hooks";

import { contextArchiveButtonAtom } from "../data/atoms";

const useContextArchiveButton = (button) => {
  const [, setContextButton] = useAtom(contextArchiveButtonAtom);

  useEffect(() => {
    setContextButton(button);
    return () => setContextButton(null);
  }, [button]);
};

export default useContextArchiveButton;
