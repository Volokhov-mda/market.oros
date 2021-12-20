import { trackPromise } from "react-promise-tracker";
import { useAtom } from "jotai";
import { useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";

import { editUserAction } from "../../api/actions";
import { userAtom } from "../../data/atoms";

import NotyfContext from "../../contexts/notyf";

import EditUserCard from "../EditUserCard/EditUserCard";
import GridContainer from "../GridContainer/GridContainer";
import TitledGrid from "../TitledGrid/TitledGrid";

import styles from "./admin-dashboard.css";

const AdminDashboard = () => {
    const notyf = useContext(NotyfContext);

    const [currentUser] = useAtom(userAtom);

    const { mutate: editUser } = useMutation(editUserAction);

    const performMutation = async (func, data, message) => {
        const { error } = await trackPromise(func(...data));
        if (error) return;
    
        notyf.success(message);
      };

    const onEdit = ({ _id, ...user }) =>
        performMutation(editUser, [_id, user], "Пользователь изменён");

    return (
        <GridContainer>
            <TitledGrid title="Ваш аккаунт" className={styles.grid}>
                {!currentUser && <>Загрузка администратора...</>}
                {currentUser && <EditUserCard showPassword onEdit={onEdit} user={currentUser} />}
            </TitledGrid>
        </GridContainer>
    );
}

export default AdminDashboard;