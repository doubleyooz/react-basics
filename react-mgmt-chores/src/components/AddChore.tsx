import { ChangeEvent, FormEvent } from "react";
import { BiPlus } from "react-icons/bi";

import { Button as AppButton } from "./app/Button";

export type AddChoreProps = {
  task: string;
  handleSubmit: (e: FormEvent) => void;
  handleChange: (e: ChangeEvent) => void;
};

export const AddChore = ({
  task,
  handleChange,
  handleSubmit,
}: AddChoreProps) => (
  <form
    className="flex justify-between items-center w-full gap-2"
    onSubmit={handleSubmit}
  >
    <input
      className="flex-1 rounded shadow p-2 text-grey-dark"
      type="text"
      name="task"
      value={task}
      onChange={handleChange}
    />
    <AppButton
      type="submit"
      disabled={task === ""}
      aria-label="Add chore"
      icon={<BiPlus />}
    />
  </form>
);
