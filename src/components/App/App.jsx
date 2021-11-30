import { useQuery } from "react-fetching-library";
import { Router } from "preact-router";
import { useAtom } from "jotai";
import { trackPromise } from "react-promise-tracker";

import ProgressBar from "../ProgressBar/ProgressBar";

import { fetchUserAction } from "../../api/actions";
import { userAtom } from "../../data/atoms";

import Home from "../../routes/home";
import Market from "../../routes/market/index";
import Archive from "../../routes/archive/index";
import Reorder from "../../routes/reorder";
import AddPrices from "../../routes/add-prices";
import EditPrices from "../../routes/edit-prices";
import Clients from "../../routes/clients";
import Managers from "../../routes/managers";
import Admin from "../../routes/admin";

import styles from "./app.css";
import Categories from "../../routes/categories";

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
        <Archive path="/archive" />
        <Reorder path="/reorder" />
        <AddPrices path="/prices/add" />
        <EditPrices path="/prices/:id" />
        <Clients path="/clients" />
        <Managers path="/managers" />
        <Categories path="/categories" />
        <Admin path="/admin" />
      </Router>
    </div>
  );
};

export default App;
