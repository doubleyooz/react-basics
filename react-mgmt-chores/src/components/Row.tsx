import { Button as AppButton } from "./app/Button";
type Chore = {
  _id: string;
  task: string;
  isCompleted: boolean;
};

type ChoreProps = {
  chore: Chore;
  handleDeleteChore: (_id: string) => void;
  handleCheckChore: (_id: string) => void;
  handleAddChore: (chore: Chore) => void;
};

export const Row = ({
  chore: { _id, task, isCompleted },
  handleDeleteChore,
  handleCheckChore,
}: ChoreProps) => (
  <div
    className={`
            flex w-full p-4 mb-2 justify-between items-center 
            ${isCompleted ? "bg-gray-700" : "bg-gray-300 hover:bg-gray-400"}
         
    `}
  >
    <input
      type="checkbox"
      className="form-checkbox h-7 w-7 cursor-pointer"
      checked={isCompleted}
      onChange={() => handleCheckChore(_id)}
    />
    <p
      className={`
                ml-2 text-xl font-sans font-medium
                ${isCompleted ? "text-white line-through" : "text-gray-700"}`}
    >
      {task}
    </p>

    <AppButton
      aria-label="Delete a chore"
      text="x"
      handleClick={() => handleDeleteChore(_id)}
    />
  </div>
);
