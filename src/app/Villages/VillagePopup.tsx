import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../ui-components/atoms/Button";
import { useState } from "react";
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
import { Panel } from "../../ui-components/atoms/Panel";
import { Toolbar, ToolbarSpacer } from "../../ui-components/atoms/Toolbar";
import { VillageList } from "./VillageList";
import { Tab } from "../../ui-components/atoms/Tab";

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
  const [activeTab, setActiveTab] = useState<"profile" | "own" | "premade">(
    "own"
  );

  return (
    <>
      <Dialog
        onClose={onClose}
        width="min(90vw, 30rem)"
        height="min(80vh, 30rem)"
        title={
          <Toolbar>
            <Button
              color="limegreen"
              icon
              width="default"
              height="small"
              disabled={true}
              invisible={true}
            >
              ⬅
            </Button>
            <Tab
              active={activeTab === "own"}
              onClick={() => setActiveTab("own")}
            >
              Custom
            </Tab>
            <Tab
              active={activeTab === "premade"}
              onClick={() => setActiveTab("premade")}
            >
              Pre-made
            </Tab>
          </Toolbar>
        }
      >
        {activeTab === "own" && (
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
            {data && (
              <VillageList
                villages={data.filter((v) => !v.builtIn)}
                onSelect={(village) => {
                  setSelectedVillage(village);
                  setIsEditing(true);
                }}
                onCopy={(village) => {
                  createMutation.mutate({
                    name: `${village.name} copy`,
                    layout: village.layout,
                  });
                }}
                onDelete={(village) => {
                  deleteMutation.mutate(village);
                }}
              />
            )}
          </div>
        )}
        {activeTab === "premade" && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              padding: "0.5rem",
            }}
          >
            {data && (
              <VillageList
                villages={data.filter((v) => v.builtIn)}
                onSelect={(village) => {
                  setSelectedVillage(village);
                  setIsEditing(true);
                }}
                onCopy={(village) => {
                  createMutation.mutate({
                    name: `${village.name} copy`,
                    layout: village.layout,
                  });
                }}
                onDelete={(village) => {
                  deleteMutation.mutate(village);
                }}
              />
            )}
          </div>
        )}
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
