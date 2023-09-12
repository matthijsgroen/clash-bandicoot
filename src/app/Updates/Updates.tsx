import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Update } from "../../data/changes/type";
import { Button } from "../../ui-components/atoms/Button";
import { Text } from "../../ui-components/atoms/Text";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import { UpdateItem } from "./UpdateItem";
import { putLastSeen } from "../../api/updates";

export const Updates: React.FC<{
  updates: Update[];
  lastSeen?: number;
  triggerUpdate?: VoidFunction;
  viewChangelog?: VoidFunction;
}> = ({ updates, lastSeen, triggerUpdate, viewChangelog }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: putLastSeen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lastSeen"] });
    },
  });

  if (
    updates.length > 0 &&
    !triggerUpdate &&
    (lastSeen === undefined || updates[0].date > lastSeen)
  ) {
    mutation.mutate(updates[0].date);
  }
  return (
    <>
      <Toolbar>
        {triggerUpdate ? (
          <Button
            color="cornflowerblue"
            onClick={() => {
              // updateUpdatesSeen(updates);
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
            (triggerUpdate && lastSeen && lastSeen < u.date) ||
            lastSeen === u.date
        )
        .map((update) => (
          <UpdateItem key={update.date} update={update} />
        ))}
    </>
  );
};
