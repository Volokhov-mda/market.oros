import clsx from "clsx";

import { useEffect, useState } from "preact/hooks";
import chevron from "./../../assets/icons/chevron-right.svg";
import chevrons from "./../../assets/icons/chevrons-right.svg";

import MarketPageButton from "../MarketPageButton/MarketPageButton";

import styles from "./market-pages.css";

const MarketPages = ({
  currPage,
  onRedirect,
  setTotalNumOfPages,
  usersPerPage,
  influencersCount,
}) => {
  const [numOfPages, setNumOfPages] = useState(undefined);
  const [numOfPagesShown, setNumOfPagesShown] = useState(
    document.body.clientWidth <= 500 ? 6 : 8
  );

  useEffect(() => {
    setNumOfPagesShown(document.body.clientWidth <= 500 ? 6 : 8);
  }, [document.body.clientWidth]);

  useEffect(() => {
    const totalNumOfPages = Math.ceil(influencersCount / usersPerPage);
    setNumOfPages(totalNumOfPages);
    setTotalNumOfPages(totalNumOfPages);
  }, [influencersCount, usersPerPage]);

  const setNewPage = (newPageNum) => {
    if (
      newPageNum < 0 ||
      newPageNum > numOfPages - 1 ||
      newPageNum === currPage
    )
      return;

    onRedirect(newPageNum);
    window.scrollTo({
      top: 0,
    });
  };

  const renderNumsOfPages = (numOfPages) => {
    if (numOfPages > 0) {
      const nums = [
        <button
          key={-2}
          className={clsx(styles.prevPage, styles.chevrons)}
          onClick={() => setNewPage(0)}
        >
          <img className={styles.icon} src={chevrons} alt="left" />
        </button>,
        <button
          key={-1}
          className={styles.prevPage}
          onClick={() => setNewPage(currPage - 1)}
        >
          <img className={styles.icon} src={chevron} alt="left" />
        </button>,
      ];

      if (numOfPages <= numOfPagesShown) {
        for (let i = 0; i < numOfPages; i++) {
          nums.push(
            <MarketPageButton
              key={i}
              pageNum={i + 1}
              isActive={currPage === i}
              onClick={() => setNewPage(i)}
            />
          );
        }
      } else if (currPage <= Math.floor(numOfPagesShown / 2) - 1) {
        for (let i = 0; i < numOfPagesShown - 1; i++) {
          nums.push(
            <MarketPageButton
              key={i}
              pageNum={i + 1}
              isActive={currPage === i}
              onClick={() => setNewPage(i)}
            />
          );
        }

        nums.push(
          <>
            <span>...</span>
            <MarketPageButton
              key={numOfPages - 1}
              pageNum={numOfPages}
              isActive={currPage === numOfPages - 1}
              onClick={() => setNewPage(numOfPages - 1)}
            />
          </>
        );
      } else if (
        currPage >=
        numOfPages - (Math.floor(numOfPagesShown / 2) + 1)
      ) {
        for (let i = numOfPages - numOfPagesShown; i < numOfPages; i++) {
          nums.push(
            <MarketPageButton
              key={i}
              pageNum={i + 1}
              isActive={currPage === i}
              onClick={() => setNewPage(i)}
            />
          );
        }
      } else {
        const upperLimit =
          currPage + 3 < numOfPages - 1
            ? currPage + (Math.floor(numOfPagesShown / 2) - 1)
            : numOfPages - (Math.floor(numOfPagesShown / 2) - 2);

        for (
          let i = currPage - (Math.floor(numOfPagesShown / 2) - 1);
          i <= upperLimit;
          i++
        ) {
          nums.push(
            <MarketPageButton
              key={i}
              pageNum={i + 1}
              isActive={currPage === i}
              onClick={() => setNewPage(i)}
            />
          );
        }

        nums.push(
          <>
            <span>...</span>
            <MarketPageButton
              key={numOfPages - 1}
              pageNum={numOfPages}
              isActive={currPage === numOfPages - 1}
              onClick={() => setNewPage(numOfPages - 1)}
            />
          </>
        );
      }

      nums.push([
        <button
          key={numOfPages}
          className={styles.nextPage}
          onClick={() => setNewPage(currPage + 1)}
        >
          <img className={styles.icon} src={chevron} alt="left" />
        </button>,
        <button
          key={numOfPages + 1}
          className={clsx(styles.nextPage, styles.chevrons)}
          onClick={() => setNewPage(numOfPages - 1)}
        >
          <img className={styles.icon} src={chevrons} alt="left" />
        </button>,
      ]);

      return nums;
    }

    return [];
  };

  const [pagesPanel, setPagesPanel] = useState(undefined);

  useEffect(() => {
    setPagesPanel(renderNumsOfPages(numOfPages));
  }, [currPage, numOfPages, numOfPagesShown]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.nums}>{pagesPanel}</div>
    </div>
  );
};

export default MarketPages;
