import { trackPromise } from "react-promise-tracker";
import { useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";
import { useAtom } from "jotai";
import clsx from "clsx";

import {
  banUserAction,
  restoreUserAction,
  createUserAction,
  editUserAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";
import { userAtom } from "../../data/atoms";

import EditUserCard from "../EditUserCard/EditUserCard";
import RestoreUserCard from "../RestoreUserCard/RestoreUserCard";
import CreateUserCard from "../CreateUserCard/CreateUserCard";
import TitledGrid from "../TitledGrid/TitledGrid";
import Grid from "../Grid/Grid";

import styles from "./users-dashboard.css";

const UsersDashboard = ({ users, onUpdate }) => {
  const notyf = useContext(NotyfContext);
  const [currentUser] = useAtom(userAtom);

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
    <Grid className={styles.users}>
      <Grid className={clsx(styles.grid, styles.topGrid)}>
        <TitledGrid title="Ваш аккаунт">
          <EditUserCard onEdit={onEdit} user={currentUser} />
        </TitledGrid>
        <TitledGrid title="Новый аккаунт">
          <CreateUserCard onCreate={onCreate} />
        </TitledGrid>
      </Grid>

      <TitledGrid title="Активные" className={styles.grid}>
        {users.active.length === 0 && <>Нет активных пользователей.</>}
        {users.active.map((user) => (
          <EditUserCard
            user={user}
            key={user._id}
            onBan={onBan}
            onEdit={onEdit}
          />
        ))}
      </TitledGrid>

      <TitledGrid title="Архивные" className={styles.grid}>
        {users.archived.length === 0 && <>Нет архивных пользователей.</>}
        {users.archived.map((user) => (
          <RestoreUserCard user={user} key={user._id} onRestore={onRestore} />
        ))}
      </TitledGrid>
    </Grid>
  );
};

export default UsersDashboard;
