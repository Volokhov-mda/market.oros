import { trackPromise } from "react-promise-tracker";
import { useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";
import clsx from "clsx";

import {
  banUserAction,
  restoreUserAction,
  createUserAction,
  editUserAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";

import EditUserCard from "../EditUserCard/EditUserCard";
import RestoreUserCard from "../RestoreUserCard/RestoreUserCard";
import CreateUserCard from "../CreateUserCard/CreateUserCard";
import TitledGrid from "../TitledGrid/TitledGrid";
import Grid from "../Grid/Grid";
import GridContainer from "../GridContainer/GridContainer";

import styles from "./users-dashboard.css";

const UsersDashboard = ({ users, onUpdate }) => {
  const notyf = useContext(NotyfContext);

  const { mutate: banUser } = useMutation(banUserAction);
  const { mutate: restoreUser } = useMutation(restoreUserAction);
  const { mutate: createUser } = useMutation(createUserAction);
  const { mutate: editUser } = useMutation(editUserAction);

  const performMutation = async (func, data, message) => {
    const { error } = await trackPromise(func(...data));
    if (error) return;

    await trackPromise(onUpdate());
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
    <GridContainer gridGap={"2rem"}>
      {/* <TitledGrid title="Ваш аккаунт">
        <EditUserCard gradient onEdit={onEdit} user={currentUser} />
      </TitledGrid> */}
      <Grid className={clsx(styles.grid, styles.topGrid)}>
        <TitledGrid title="Новый аккаунт">
          <CreateUserCard gradient onCreate={onCreate} />
        </TitledGrid>
      </Grid>

      <TitledGrid title="Активные" className={styles.grid}>
        {users.active.length === 0 && <>Нет активных пользователей.</>}
        {users.active.map((user) => (
          <EditUserCard
            gradient
            user={user}
            key={user._id}
            onBan={onBan}
            onEdit={onEdit}
          />
        ))}
      </TitledGrid>

      <TitledGrid title="Забаненные" className={styles.grid}>
        {users.archived.length === 0 && <>Нет архивных пользователей.</>}
        {users.archived.map((user) => (
          <RestoreUserCard gradient user={user} key={user._id} onRestore={onRestore} />
        ))}
      </TitledGrid>
    </GridContainer>
  );
};

export default UsersDashboard;
