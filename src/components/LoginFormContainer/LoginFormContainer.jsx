import { useMutation } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";
import { route } from "preact-router";

import LoginForm from "../LoginForm/LoginForm";

import { loginAction } from "../../api/actions";

const LoginFormContainer = () => {
  const { mutate } = useMutation(loginAction);

  const onSubmit = async (data) => {
    const { error, payload } = await trackPromise(mutate(data));
    if (error) return;

    localStorage.setItem("token", payload.token);
    route("/market");
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default LoginFormContainer;
