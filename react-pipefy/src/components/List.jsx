import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import Card from './Card';
import Popup from './NewCard';

import { ReactComponent as Add } from '../assets/add.svg';

const data = [
    {
        title: 'Unstable internet connection',
    },
    { title: 'I cannot access some domains', label: 2 },
    { title: 'My telephone is not working properly', label: 1 },
];

const List = ({ title, description, colour }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [chores, setChores] = useState(data);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(chores);

        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setChores(items);
    };

    return (
        <div className="w-fit ml-6 rounded-sm">
            <Popup trigger={showPopup} setTrigger={setShowPopup} />
            <header
                className="flex justify-between items-center p-2 mb-2 min-h-11 border-t-2 bg-white rounded"
                style={{ borderColor: colour }}
            >
                <div className="flex gap-3 items-center">
                    <span
                        className="font-semibold text-base"
                        style={{ color: colour }}
                    >
                        {title}
                    </span>
                    <span
                        className="text-sm font-normal"
                        style={{ color: '#48626f' }}
                    >
                        (1)
                    </span>
                </div>
                <button
                    className="rounded-full"
                    style={{ backgroundColor: colour }}
                    onClick={() => setShowPopup(!showPopup)}
                >
                    <Add />
                </button>
            </header>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="chores">
                    {(provided) => (
                        <div
                            className="pt-3"
                            style={{ backgroundColor: '#f2f2f2' }}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            <div className="justify-center px-3 pb-3 h-96 overflow-auto scrollbar-hide">
                                {chores.map((element, index) => {
                                    return (
                                        <Draggable
                                            key={element.title + index}
                                            draggableId={element.title + index}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    ref={provided.innerRef}
                                                >
                                                    <Card
                                                        title={element.title}
                                                        label={element.label}
                                                    ></Card>
                                                </div>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                                <div className="text-xs text-center font-medium text-gray-400">
                                    {description}
                                </div>
                            </div>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default List;
