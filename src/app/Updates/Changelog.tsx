import { Update } from "../../data/changes/type";
import { UpdateItem } from "./UpdateItem";

export const ChangeLog: React.FC<{ updates: Update[] }> = ({ updates }) => (
  <>
    {updates.map((update) => (
      <UpdateItem key={update.date} update={update} />
    ))}
  </>
);
