import { Update } from "../../data/changes/type";
import {
  getLastUpdateSeen,
  updateUpdatesSeen,
} from "../../data/changes/updateCount";
import { Button } from "../../ui-components/atoms/Button";
import { Text } from "../../ui-components/atoms/Text";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import { UpdateItem } from "./UpdateItem";

export const Updates: React.FC<{
  updates: Update[];
  triggerUpdate?: VoidFunction;
  viewChangelog?: VoidFunction;
}> = ({ updates, triggerUpdate, viewChangelog }) => {
  const lastUpdateSeen = getLastUpdateSeen();
  if (!triggerUpdate) {
    updateUpdatesSeen(updates);
  }
  return (
    <>
      <Toolbar>
        {triggerUpdate ? (
          <Button
            color="cornflowerblue"
            onClick={() => {
              updateUpdatesSeen(updates);
              triggerUpdate();
            }}
            width="huge"
            height="default"
          >
            Update now
          </Button>
        ) : (
          <Text color={"black"} skipOutline>
            The app is up to date.
          </Text>
        )}
        <ToolbarSpacer />
        <Button
          color="orange"
          width="huge"
          height="default"
          onClick={viewChangelog}
        >
          View changelog
        </Button>
      </Toolbar>
      {updates
        .filter(
          (u) =>
            (triggerUpdate && lastUpdateSeen && lastUpdateSeen < u.date) ||
            lastUpdateSeen === u.date
        )
        .map((update) => (
          <UpdateItem key={update.date} update={update} />
        ))}
    </>
  );
};
