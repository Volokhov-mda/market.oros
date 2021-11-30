import { trackPromise } from "react-promise-tracker";
import { useState, useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";

import {
    banUserAction,
    restoreUserAction,
    createUserAction,
    editUserAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";
import showConfirm from "../../helpers/show-confirm";

import Grid from "../Grid/Grid";

import GridContainer from "../GridContainer/GridContainer";
import ModalWindow from "../ModalWindow/ModalWindow";
import CategoryCard from "../CategoryCard/CategoryCard";
import EditCategoryCard from "../EditCategoryCard/EditCategoryCard";
import AddCardFlat from "../AddCardFlat/AddCardFlat";
import CreateCategoryCard from "../CreateCategoryCard/CreateCategoryCard";

import styles from "./categories-grid.css";

const CategoriesGrid = ({ categories, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currCategory, setCurrCategory] = useState(null);

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

    const onBan = async ({ _id }) => {
        const isConfirmed = await showConfirm("Вы действительно хотите удалить категорию?");
        if (!isConfirmed) return;

        performMutation(banUser, [_id], "Пользователь забанен");
    }

    const onEdit = (category) => {
        setCurrCategory(category);
        setIsEditing(true);
        // performMutation(editUser, [_id, user], "Пользователь изменён");
    }

    const onRestore = ({ _id }) =>
        performMutation(restoreUser, [_id], "Пользователь разбанен");

    const onCreate = (data) => {
        setIsCreating(true);
        console.log(data);
        performMutation(createUser, [data], "Пользователь создан");
    }

    const onCancel = () => {
        setCurrCategory(null);
        setIsEditing(false);
        setIsCreating(false);
    }

    return (
        <>
            <ModalWindow isShow={isEditing || isCreating} hide={onCancel}>
                {isEditing && (
                    <EditCategoryCard
                        category={currCategory}
                        onEdit={onEdit}
                        onCancel={onCancel}
                        gradient
                    />
                )}
                {isCreating && (
                    <CreateCategoryCard
                        category={currCategory}
                        onCreate={onCreate}
                        onCancel={onCancel}
                        gradient
                    />
                )}
            </ModalWindow>
            <GridContainer>
                {categories.length === 0 && <>Нет категорий.</>}
                <Grid className={styles.grid}>
                    <AddCardFlat onClick={onCreate} />
                    {categories.active.map((category) => (
                        <CategoryCard
                            category={category}
                            key={category._id}
                            onEdit={() => onEdit(category)}
                            onDelete={onBan}
                        />
                    ))}
                    {categories.archived.map((category) => (
                        <CategoryCard
                            category={category}
                            key={category._id}
                            onEdit={() => onEdit(category)}
                            onDelete={onBan}
                        />
                    ))}
                </Grid>
            </GridContainer>
        </>
    );
};

export default CategoriesGrid;
