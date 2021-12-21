import { useQuery } from "react-fetching-library";
import { route, Router } from "preact-router";
import { useAtom } from "jotai";
import { trackPromise } from "react-promise-tracker";

import ProgressBar from "../ProgressBar/ProgressBar";

import { fetchCurrentUserAction } from "../../api/actions";
import { userAtom } from "../../data/atoms";

import rolesConfig from "../../data/rolesConfig";

import Home from "../../routes/home";
import Market from "../../routes/market/index";
import Archive from "../../routes/archive/index";
import Reorder from "../../routes/reorder";
import AddPrices from "../../routes/add-prices";
import EditPrices from "../../routes/edit-prices";
import Clients from "../../routes/clients";
import AddClietns from "../../routes/add-clients";
import EditClietns from "../../routes/edit-clients";
import Managers from "../../routes/managers";
import Categories from "../../routes/categories";
import Admin from "../../routes/admin";

import styles from "./app.css";

const App = () => {
  const [, setUser] = useAtom(userAtom);
  const { query } = useQuery(fetchCurrentUserAction, false);

  const onRouteChange = async (e) => {
    let userTemp;

    const fetchUser = async () => {
      const { payload, error } = await query();
      if (!error) {
        setUser(payload);
        userTemp = payload;
      }
    };

    if (localStorage.getItem("token")) {
      await trackPromise(fetchUser());
    }

    if (!userTemp) return route("/");

    if (e.url === "/") {
      return route("/market?page=1", true);
    } 
    else if (e.url === "/market") {
      return route("/market?page=1");
    } 
    else if (e.url === "archive") {
      if (!(userTemp?.role <= rolesConfig.manager)) {
        return route("/", true);
      }
      return route("/archive?page=1");
    } 
    else if (e.url === "/reorder") {
      if (!(userTemp?.role <= rolesConfig.admin)) {
        return route("/", true);
      }
    } 
    else if (e.url.startsWith("/prices/")) {
      if (!(userTemp?.role <= rolesConfig.manager)) {
        return route("/", true);
      }
    } 
    else if (e.url === "/prices/add") {
      if (!(userTemp?.role <= rolesConfig.manager)) {
        return route("/", true);
      }
    } 
    else if (e.url.startsWith("/clients")) {
      if (!(userTemp?.role <= rolesConfig.manager)) {
        return route("/", true);
      }
    } else if (e.url === "/clients/add") {
      if (!(userTemp?.role === rolesConfig.admin)) {
        return route("/", true);
      }
    } else if (e.url === "/managers") {
      if (!(userTemp?.role <= rolesConfig.admin)) {
        return route("/", true);
      }
    } else if (e.url === "/categories") {
      if (!(userTemp?.role <= rolesConfig.manager)) {
        return route("/", true);
      }
    } else if (e.url === "/admin") {
      if (userTemp?.role !== rolesConfig.admin) {
        return route("/", true);
      }
    }
  };

  return (
    <div className={styles.app}>
      <ProgressBar />

      <Router onChange={onRouteChange}>
        <Home path="/" />
        {["/market", "/market?page=:page", "/market?scroll=:scroll", "/market?page=:page&scroll=:scroll"].map((path, i) =>
          <Market path={path} key={i} />
        )}
        {["/archive", "/archive?page=:page", "/archive?scroll=:scroll", "/archive?page=:page&scroll=:scroll"].map((path, i) =>
          <Archive path={path} key={i} />
        )}
        <Reorder path="/reorder" />
        <AddPrices path="/prices/add" />
        <EditPrices path="/prices/:id" />
        <Clients path="/clients" />
        <AddClietns path="/clients/add" />
        <EditClietns path="/clients/:id" />
        <Managers path="/managers" />
        <Categories path="/categories" />
        <Admin path="/admin" />
      </Router>
    </div>
  );
};

export default App;
