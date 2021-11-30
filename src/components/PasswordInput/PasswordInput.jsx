import { useState } from "preact/hooks";
import clsx from "clsx";

import EyeToggle from "../EyeToggle/EyeToggle";
import Input from "../Input/Input";

import styles from "./password-input.css";
import { forwardRef } from "preact/compat";

const PasswordInput = forwardRef(({ className, ...props }, ref) => {
  const [type, setType] = useState("password");

  const onToggle = () => {
    setType(type === "password" ? "text" : "password");
  };

  return (
    <div className={styles.wrapper}>
      <Input
        className={clsx(styles.input, className)}
        {...props}
        type={type}
        ref={ref}
      />

      <EyeToggle className={styles.eye} onChange={onToggle} />
    </div>
  );
});

export default PasswordInput;
