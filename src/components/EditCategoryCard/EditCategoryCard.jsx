import { useForm } from "react-hook-form";
import FlatButton from "../FlatButton/FlatButton";
import UserCard from "../UserCard/UserCard";
import styles from "./edit-category-card.css";

const EditCategoryCard = ({ category, onEdit, onCancel, gradient }) => {
    const { register, handleSubmit } = useForm({
        defaultValues: { name: category?.name },
    });

    const onSubmit = (data) => onEdit({ ...category, ...data });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <UserCard
                gradient={gradient}
                nameProps={register("name")}
                namePlaceholder="Название категории"
                className={styles.card}
            >
                {onEdit && <FlatButton accent>Сохранить</FlatButton>}

                {onCancel && (
                    <FlatButton
                        danger
                        onClick={onCancel ? onCancel : undefined}
                        type="button"
                    >
                        Отменить
                    </FlatButton>
                )}
            </UserCard>
        </form>
    );
}

export default EditCategoryCard;

