import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../ui-components/atoms/Button";
import { PropsWithChildren, useState } from "react";
import { VillageEditor } from "../VillageEditor/VillageEditor";
import {
  Village,
  deleteBase,
  getBases,
  postBase,
  putBase,
} from "../../api/bases";
import { Dialog } from "../../ui-components/atoms/Dialog";
import { Text } from "../../ui-components/atoms/Text";
import { getTownhallLevel } from "../../engine/layout/baseLayout";
import { Panel } from "../../ui-components/atoms/Panel";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import { ButtonWithConfirm } from "../../ui-components/composition/ButtonWithConfirm";

export const Inset: React.FC<PropsWithChildren> = ({ children }) => (
  <span
    style={{
      flex: "1 1 auto",
      borderLeft: "1px solid #777",
      borderRight: "1px solid white",
      borderTop: "1px solid #777",
      borderBottom: "1px solid white",
      borderRadius: "5px",
      backgroundColor: "#0001",
    }}
  >
    {children}
  </span>
);

export const Row: React.FC<PropsWithChildren> = ({ children }) => (
  <div style={{ display: "flex", gap: "0.5rem" }}>{children}</div>
);

export const VillagePopup: React.FC<{ onClose?: VoidFunction }> = ({
  onClose,
}) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["villageList"],
    queryFn: getBases,
    networkMode: "always",
  });

  const createMutation = useMutation({
    mutationFn: postBase,
    onSuccess: (village) => {
      queryClient.invalidateQueries({ queryKey: ["villageList"] });
      setSelectedVillage(village);
      setIsEditing(true);
    },
    networkMode: "always",
  });

  const updateMutation = useMutation({
    mutationFn: putBase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["villageList"] });
    },
    networkMode: "always",
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["villageList"] });
    },
    networkMode: "always",
  });

  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <Dialog
        title="Bases"
        onClose={onClose}
        width="min(80vw, 30rem)"
        height="min(80vh, 30rem)"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            padding: "0.5rem",
          }}
        >
          <Panel color="seagreen">
            <Text size="small">
              Here you can create villages of your own to attack.
            </Text>
            <Toolbar>
              <ToolbarSpacer />
              <Button
                color="orange"
                width="default"
                height="small"
                onClick={() => {
                  createMutation.mutate({ name: "New Village" });
                }}
              >
                + New
              </Button>
            </Toolbar>
          </Panel>
          {data &&
            data.map((village) => (
              <Row key={village.id}>
                <Inset>
                  <Text>{village.name}</Text>
                  <Text size="small" color="#333" skipOutline>
                    TH: {getTownhallLevel(village.layout)}
                  </Text>
                </Inset>
                {village.builtIn && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                    }}
                  >
                    <Button
                      color="orange"
                      width="default"
                      height="small"
                      onClick={() => {
                        setSelectedVillage(village);
                        setIsEditing(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      color="cornflowerblue"
                      width="default"
                      height="small"
                      onClick={() => {
                        createMutation.mutate({
                          name: `${village.name} copy`,
                          layout: village.layout,
                        });
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                )}
                {!village.builtIn && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                    }}
                  >
                    <Button
                      color="orange"
                      width="default"
                      height="small"
                      onClick={() => {
                        setSelectedVillage(village);
                        setIsEditing(true);
                      }}
                    >
                      Edit
                    </Button>
                    <ButtonWithConfirm
                      color="red"
                      width="default"
                      height="small"
                      onClick={() => {
                        deleteMutation.mutate(village);
                      }}
                      confirmTitle="Are you sure?"
                      confirmMessage="This cannot be undone! The village will be removed forever."
                    >
                      Delete
                    </ButtonWithConfirm>
                  </div>
                )}
              </Row>
            ))}
        </div>
      </Dialog>

      {isEditing && selectedVillage && (
        <VillageEditor
          name={selectedVillage.name}
          base={selectedVillage.layout}
          onClose={() => {
            setIsEditing(false);
          }}
          readOnly={selectedVillage.builtIn}
          onSave={async (updatedBase) => {
            updateMutation.mutate({ ...selectedVillage, layout: updatedBase });
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
};
