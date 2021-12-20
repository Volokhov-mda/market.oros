import { trackPromise } from "react-promise-tracker";
import { useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";

import {
  banUserAction,
  restoreUserAction,
  createUserAction,
  editUserAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";

import rolesConfig from "../../data/rolesConfig";

import EditUserCard from "../EditUserCard/EditUserCard";
import RestoreUserCard from "../RestoreUserCard/RestoreUserCard";
import CreateUserCard from "../CreateUserCard/CreateUserCard";
import TitledGrid from "../TitledGrid/TitledGrid";
import GridContainer from "../GridContainer/GridContainer";

import styles from "./users-managers-dashboard.css";

const UsersManagersDashboard = ({ usersActive, usersArchive, onUpdateActive, onUpdateArchive }) => {
  const notyf = useContext(NotyfContext);

  const { mutate: banUser } = useMutation(banUserAction);
  const { mutate: restoreUser } = useMutation(restoreUserAction);
  const { mutate: createUser } = useMutation(createUserAction);
  const { mutate: editUser } = useMutation(editUserAction);

  const performMutation = async (func, data, message) => {
    const { error } = await trackPromise(func(...data));
    if (error) return;

    await trackPromise(onUpdateActive());
    await trackPromise(onUpdateArchive());
    notyf.success(message);
  };

  const onBan = ({ _id }) =>
    performMutation(banUser, [_id], "Пользователь забанен");

  const onEdit = ({ _id, ...user }) =>
    performMutation(editUser, [_id, user], "Пользователь изменён");

  const onRestore = ({ _id }) =>
    performMutation(restoreUser, [_id], "Пользователь разбанен");

  const onCreate = (data) =>
    performMutation(createUser, [data], "Пользователь создан");

  return (
    <GridContainer className={styles.grid} gridGap={"2rem"}>
      <TitledGrid className={styles.grid} title="Новый аккаунт">
        <CreateUserCard gradient onCreate={onCreate} role={rolesConfig.manager} />
      </TitledGrid>

      <TitledGrid title="Активные" className={styles.grid}>
        {usersActive.length === 0 && <>Нет активных пользователей.</>}
        {usersActive.map((user) => (
          <EditUserCard
            showPassword
            user={user}
            key={user._id}
            onBan={onBan}
            onEdit={onEdit}
          />
        ))}
      </TitledGrid>

      <TitledGrid title="Забаненные" className={styles.grid}>
        {usersArchive.length === 0 && <>Нет архивных пользователей.</>}
        {usersArchive.map((user) => (
          <RestoreUserCard showPassword user={user} key={user._id} onRestore={onRestore} />
        ))}
      </TitledGrid>
    </GridContainer>
  );
};

export default UsersManagersDashboard;
