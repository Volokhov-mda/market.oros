import { useQuery } from "react-fetching-library";
import { Router } from "preact-router";
import { useAtom } from "jotai";
import { trackPromise } from "react-promise-tracker";

import ProgressBar from "../ProgressBar/ProgressBar";

import { fetchUserAction } from "../../api/actions";
import { userAtom } from "../../data/atoms";

import Home from "../../routes/home";
import Market from "../../routes/market";
import Reorder from "../../routes/reorder";
import AddPrices from "../../routes/add-prices";
import EditPrices from "../../routes/edit-prices";
import Users from "../../routes/users";

import styles from "./app.css";

const App = () => {
  const [, setUser] = useAtom(userAtom);
  const { query } = useQuery(fetchUserAction, false);

  const onRouteChange = () => {
    const fetchUser = async () => {
      const { payload, error } = await query();
      if (!error) setUser(payload);
    };

    !!localStorage.getItem("token") && trackPromise(fetchUser());
  };

  return (
    <div className={styles.app}>
      <ProgressBar />

      <Router onChange={onRouteChange}>
        <Home path="/" />
        <Market path="/market" />
        <Reorder path="/reorder" />
        <AddPrices path="/prices/add" />
        <EditPrices path="/prices/:id" />
        <Users path="/users" />
      </Router>
    </div>
  );
};

export default App;
