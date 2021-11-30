import { Link as RouterLink } from "preact-router";
import { ExternalLink } from "react-external-link";
import clsx from "clsx";

import styles from "./link.css";

const Link = ({ className, children, external, ...props }) => {
  const Tag = external ? ExternalLink : RouterLink;

  return (
    <Tag className={clsx(styles.link, className)} {...props}>
      {children}
    </Tag>
  );
};

export default Link;
