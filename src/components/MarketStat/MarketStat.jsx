import formatNumberSpaces from "../../helpers/formatNumberSpaces";

import style from "./market-stat.css";

const MarketStat = ({ number, title }) => (
    <div className={style.container}>
        <div className={style.number}>{formatNumberSpaces(number)}</div>
        <div>{title}</div>
    </div>
);

export default MarketStat;