import { ChangeEvent, FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddChore } from "../components/AddChore";
import { Row } from "../components/Row";

const data = [
  {
    _id: "0",
    title: "Task 1",
    task: "Do laundry 1",
    isCompleted: false,
  },
  {
    _id: "1",
    title: "Task 2",
    task: "Do laundry 2",
    isCompleted: false,
  },
  {
    _id: "2",
    title: "Task 2",
    task: "Do laundry 3",
    isCompleted: false,
  },
];

type Chore = {
  _id: string;
  task: string;
  isCompleted: boolean;
};

export const Chores = () => {
  const [chores, setChores] = useState<Chore[]>(data);
  const [task, setTask] = useState("");

  const choresLength = chores.length;
  const hasChores = chores.length > 0;
  const remainingChores = chores.filter((chore) => !chore.isCompleted).length;

  const handleChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setTask(value);
  };

  const handleDeleteChore = (_id: string) => {
    const updatedChores = chores.filter((chore) => chore._id !== _id);
    setChores(updatedChores);
  };

  const handleCheckChore = (_id: string) => {
    const updatedChores = chores.map((chore) => {
      if (chore._id === _id) {
        return {
          ...chore,
          isCompleted: !chore.isCompleted,
        };
      }
      return chore;
    });
    setChores(updatedChores);
  };

  const handleAddChore = (chore: Chore) => {
    const updatedChores = [...chores, chore];
    setChores(updatedChores);
    setTask("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const chore: Chore = {
      _id: uuidv4(),
      task: task,
      isCompleted: false,
    };

    task && handleAddChore(chore);
  };

  return (
    <section className="w-10/12 lg:w-1/2 max-w-2xl flex flex-col items-center gap-3 ">
      <AddChore
        task={task}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div className="w-full">
        {chores.map((chore) => (
          <Row
            key={chore._id}
            chore={chore}
            handleDeleteChore={handleDeleteChore}
            handleCheckChore={handleCheckChore}
            handleAddChore={handleAddChore}
          />
        ))}
      </div>

      {hasChores ? (
        <p>{`[${remainingChores} out of ${choresLength}] chores remaining`}</p>
      ) : (
        <p className="mb-5 text-xl text-red-500 uppercase">
          Please add a chore!
        </p>
      )}
    </section>
  );
};
