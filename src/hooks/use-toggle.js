import { useCallback, useState } from "react";

/**
 * useState alternative for boolean values
 * that can be toggled from false to true and vice versa.
 *
 * @param {boolean|undefined} initialState - Initial toggle value
 *
 * @returns Array with the first element being current value,
 * and the second one being toggle function.
 */
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

export default useToggle;
