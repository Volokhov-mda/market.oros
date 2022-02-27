import { useQuery } from "react-fetching-library";
import { route, Router } from "preact-router";
import { useAtom } from "jotai";
import { trackPromise } from "react-promise-tracker";
import ReactGA from "react-ga";

import ProgressBar from "../ProgressBar/ProgressBar";

import { fetchCartTotalAction, fetchCurrentUserAction } from "../../api/actions";
import { cartItemsNumAtom, userAtom } from "../../data/atoms";

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
import Cart from "../../routes/cart";

import styles from "./app.css";

ReactGA.initialize("UA-180919978-2");

const App = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setCartItemsNum] = useAtom(cartItemsNumAtom);

  const { query: queryCurrUser } = useQuery(fetchCurrentUserAction, false);
  const { query: queryCartTotal } = useQuery(fetchCartTotalAction, false);

  const onRouteChange = async (e) => {
    let userTemp;

    const fetchUser = async () => {
      const { payload, error } = await trackPromise(queryCurrUser());
      if (error) return;

      setUser(payload);
      userTemp = payload;

    };

    const fetchCartItemsNum = async () => {
      const { payload, error } = await trackPromise(queryCartTotal());
      if (error) return;

      setCartItemsNum(payload.total.count);
    }

    userTemp && fetchCartItemsNum();

    if (localStorage.getItem("token")) {
      await trackPromise(fetchUser());
    }

    if (!userTemp) {
      ReactGA.pageview("/");
      return route("/");
    }

    if (e.url === "/") {
      ReactGA.pageview("/market");
      return route("/market?page=1", true);
    }
    else if (e.url === "/market" || e.url.includes("/market?")) {
      ReactGA.pageview("/market");
      return route(e.url);
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
        ReactGA.pageview(e.url);
        return route("/", true);
      }
    } else if (e.url === "/admin") {
      if (userTemp?.role !== rolesConfig.admin) {
        return route("/", true);
      }
    } else if (e.url === "/cart") {
      if (userTemp?.role === rolesConfig.client && userTemp.showCart) {
        ReactGA.pageview("/cart");
        return route("/cart", true);
      }
      return route("/", true);
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
        <Cart path="/cart" />
      </Router>
    </div>
  );
};

export default App;
