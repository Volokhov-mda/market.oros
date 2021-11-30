import clsx from "clsx";
import { Link } from "preact-router/match";

import long from "../../assets/logos/full.svg";
import short from "../../assets/logos/short.svg";

import styles from "./logo.css";

const Logo = ({ full, to, className }) => {
  const logo = full ? long : short;
  const image = <img src={logo} alt="" className={className} />;

  if (!to) return image;

  return (
    <Link href={to} className={clsx(styles.link, className)}>
      {image}
    </Link>
  );
};

export default Logo;
