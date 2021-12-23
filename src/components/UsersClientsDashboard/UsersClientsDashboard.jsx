import { trackPromise } from "react-promise-tracker";
import { useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";
import { useAtom } from "jotai";

import {
  banUserAction,
  restoreUserAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";

import { userAtom } from "../../data/atoms";

import EditUserCard from "../EditUserCard/EditUserCard";
import RestoreUserCard from "../RestoreUserCard/RestoreUserCard";
import TitledGrid from "../TitledGrid/TitledGrid";
import GridContainer from "../GridContainer/GridContainer";
import AddCardFlat from "../AddCardFlat/AddCardFlat";

import styles from "./users-clients-dashboard.css";
import { route } from "preact-router";
import rolesConfig from "../../data/rolesConfig";

const UsersClientsDashboard = ({ usersActive, usersArchive, onUpdateActive, onUpdateArchive }) => {
  const [currUser] = useAtom(userAtom)

  const notyf = useContext(NotyfContext);

  const { mutate: banUser } = useMutation(banUserAction);
  const { mutate: restoreUser } = useMutation(restoreUserAction);

  const performMutation = async (func, data, message) => {
    const { error } = await trackPromise(func(...data));
    if (error) return;

    await trackPromise(onUpdateActive());
    await trackPromise(onUpdateArchive());
    notyf.success(message);
  };

  const onCreate = () =>
    route("/clients/add");

  const onBan = ({ _id }) =>
    performMutation(banUser, [_id], "Пользователь забанен");

  const onEdit = ({ _id }) =>
    route(`/clients/${_id}`);

  const onRestore = ({ _id }) =>
    performMutation(restoreUser, [_id], "Пользователь разбанен");

  return (
    <GridContainer gridGap={"2rem"}>
      {currUser.role === rolesConfig.admin && (
        <TitledGrid title="Новый аккаунт" className={styles.topGrid}>
          <AddCardFlat onClick={onCreate} />
        </TitledGrid>
      )}

      <TitledGrid title="Активные" className={styles.grid}>
        {usersActive.length === 0 && <>Нет активных пользователей.</>}
        {currUser && usersActive.map((user) => (
          <EditUserCard
            isNameReadOnly
            user={user}
            key={user._id}
            onEdit={onEdit}
            onBan={currUser.role === rolesConfig.admin && onBan}
          />
        ))}
      </TitledGrid>

      <TitledGrid title="Забаненные" className={styles.grid}>
        {usersArchive.length === 0 && <>Нет архивных пользователей.</>}
        {currUser && usersArchive.map((user) => (
          <RestoreUserCard
            user={user}
            key={user._id}
            onEdit={onEdit}
            onRestore={currUser.role === rolesConfig.admin && onRestore}
          />
        ))}
      </TitledGrid>
    </GridContainer>
  );
};

export default UsersClientsDashboard;
