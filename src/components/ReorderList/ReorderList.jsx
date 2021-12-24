import { useContext } from "preact/hooks";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation } from "react-fetching-library";
import { trackPromise } from "react-promise-tracker";

import { deleteInfluencerAction } from "../../api/actions";

import NotyfContext from "../../contexts/notyf";
import { showConfirmRu } from "../../helpers/show-confirm";

import ReorderCard from "../ReorderCard/ReorderCard";

import styles from "./reorder-list.css";

const ReorderList = ({ influencers, setInfluencers, onUpdate }) => {
  const notyf = useContext(NotyfContext);
  const { mutate: deleteInfluencer } = useMutation(deleteInfluencerAction);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    const newInfluencers = [...influencers];
    const [removed] = newInfluencers.splice(source.index, 1);
    newInfluencers.splice(destination.index, 0, removed);

    setInfluencers(newInfluencers);
  };

  const onDelete = async ({ _id, nickname }) => {
    const message = `Вы действительно хотите удалить @${nickname}?`;
    const isConfirmed = await showConfirmRu(message);
    if (!isConfirmed) return;

    const { error } = await trackPromise(deleteInfluencer(_id));
    if (error) return;

    await trackPromise(onUpdate());
    notyf.success("Инфлюенсер удалён");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <div
            className={styles.grid}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {influencers.map((influencer, i) => (
              <Draggable
                draggableId={influencer._id}
                key={influencer._id}
                index={i}
              >
                {(provided) => (
                  <ReorderCard
                    influencer={influencer}
                    onDelete={onDelete}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReorderList;
