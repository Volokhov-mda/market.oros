import { trackPromise } from "react-promise-tracker";
import { useState, useContext } from "preact/hooks";
import { useMutation } from "react-fetching-library";
import { useAtom } from "jotai";

import { userAtom } from "../../data/atoms";

import {
    createCategoryAction,
    deleteCategoryAction,
    editCategoryAction,
} from "../../api/actions";

import NotyfContext from "../../contexts/notyf";
import { showConfirmRu } from "../../helpers/show-confirm";

import Grid from "../Grid/Grid";

import GridContainer from "../GridContainer/GridContainer";
import ModalWindow from "../ModalWindow/ModalWindow";
import CategoryCard from "../CategoryCard/CategoryCard";
import EditCategoryCard from "../EditCategoryCard/EditCategoryCard";
import AddCardFlat from "../AddCardFlat/AddCardFlat";
import CreateCategoryCard from "../CreateCategoryCard/CreateCategoryCard";

import styles from "./categories-grid.css";
import rolesConfig from "../../data/rolesConfig";

const CategoriesGrid = ({ categories, onUpdate }) => {
    const [currentUser] = useAtom(userAtom);

    const [isEditing, setIsEditing] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [currCategory, setCurrCategory] = useState(null);

    const notyf = useContext(NotyfContext);

    const { mutate: createCategory } = useMutation(createCategoryAction);
    const { mutate: editCategory } = useMutation(editCategoryAction);
    const { mutate: deleteCategory } = useMutation(deleteCategoryAction);

    const validateCategoryName = (name) => !!name.match(/^[-a-zA-Z\u0410-\u044F\u0401\u0451_\d ]+$/g);

    const performMutation = async (func, data, message) => {

        const { error } = await trackPromise(func(...data));
        if (error) return;

        await trackPromise(onUpdate());
        notyf.success(message);
    };

    const onDelete = async ({ _id }) => {
        const isConfirmed = await showConfirmRu("Вы действительно хотите удалить категорию?");
        if (!isConfirmed) return;

        performMutation(deleteCategory, [_id], "Категория удалена");
    }

    const onEdit = ({ _id, ...data }) => {
        if (!validateCategoryName(data.name)) {
            notyf.error("Введено недоступное название категории");
        } else {
            performMutation(editCategory, [_id, data], "Категория изменена");
        }
        onCancel();
    }

    const onCreate = (data) => {
        if (!validateCategoryName(data.name)) {
            notyf.error("Введено недоступное название категории");
        } else {
            performMutation(createCategory, [data], "Категория создана");
        }
        onCancel();
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
                <Grid className={styles.grid}>
                    <AddCardFlat onClick={() => setIsCreating(true)} />
                    {categories.map((category) => (
                        <CategoryCard
                            category={category}
                            key={category._id}
                            onEdit={() => { setCurrCategory(category); setIsEditing(true); }}
                            onDelete={(currentUser.role === rolesConfig.admin) && onDelete}
                        />
                    ))}
                </Grid>
            </GridContainer>
        </>
    );
};

export default CategoriesGrid;
