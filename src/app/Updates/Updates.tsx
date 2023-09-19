import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Update } from "../../data/changes/type";
import { Button } from "../../ui-components/atoms/Button";
import { Text } from "../../ui-components/atoms/Text";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import { UpdateItem } from "./UpdateItem";
import { putLastSeen } from "../../api/updates";
import { useRef, useState } from "react";

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
  const [notificationPermission, setNotificationPermission] = useState(
    Notification.permission
  );

  const isUpdating = useRef(false);
  if (
    updates.length > 0 &&
    !triggerUpdate &&
    !isUpdating.current &&
    (lastSeen === undefined || updates[0].date !== lastSeen)
  ) {
    isUpdating.current = true;
    mutation.mutate(updates[0].date);
  }

  return (
    <>
      <Toolbar>
        {triggerUpdate ? (
          <Button
            color="cornflowerblue"
            onClick={() => {
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
        {notificationPermission !== "granted" && (
          <Button
            color="orange"
            onClick={() => {
              Notification.requestPermission((response) => {
                setNotificationPermission(response);
              })?.then?.((response) => {
                setNotificationPermission(response);
              });
            }}
            width="huge"
            height="default"
          >
            Enable Notifications
          </Button>
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
          (u, i) =>
            (triggerUpdate && lastSeen && lastSeen < u.date) ||
            (!triggerUpdate && lastSeen && lastSeen <= u.date) ||
            (!triggerUpdate && !lastSeen && i === 0)
        )
        .map((update) => (
          <UpdateItem key={update.date} update={update} />
        ))}
    </>
  );
};
