import { useState } from "react";
import { Dialog } from "../../ui-components/atoms/Dialog";
import { Tab } from "../../ui-components/atoms/Tab";
import { Toolbar } from "../../ui-components/atoms/Toolbar";
import { EditArmy } from "./EditArmy";
import {
  ArmyItem,
  deleteArmy,
  getArmies,
  putArmy,
  trainArmy,
} from "../../api/armies";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShowActiveArmy } from "./ShowActiveArmy";
import { BackButton } from "../components/BackButton";
import { ArmyList } from "./ArmyList";

export const ArmyPopup: React.FC<{ onClose?: VoidFunction }> = ({
  onClose,
}) => {
  const [editItem, setEditItem] = useState<null | ArmyItem>(null);
  const [activeTab, setActiveTab] = useState<"Army" | "Quick Train">("Army");

  const { data } = useQuery({
    queryKey: ["armyList"],
    queryFn: getArmies,
    networkMode: "always",
  });
  const activeArmy = data?.find((army) => army.id === "active");

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: putArmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armyList"] });
    },
    networkMode: "always",
  });
  const deleteMutation = useMutation({
    mutationFn: deleteArmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armyList"] });
    },
    networkMode: "always",
  });
  const trainMutation = useMutation({
    mutationFn: trainArmy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["armyList"] });
    },
    networkMode: "always",
  });

  return (
    <>
      <Dialog
        title={
          <Toolbar>
            <BackButton
              disabled={!editItem}
              invisible={!editItem}
              onClick={() => {
                setEditItem(null);
              }}
            />
            <Tab
              active={activeTab === "Army"}
              onClick={() => {
                setActiveTab("Army");
                setEditItem(null);
              }}
            >
              Army
            </Tab>
            <Tab
              active={activeTab === "Quick Train"}
              onClick={() => setActiveTab("Quick Train")}
            >
              Quick train
            </Tab>
          </Toolbar>
        }
        onClose={onClose}
        width="min(90vw, 30rem)"
        height="min(93vh, 22.6rem)"
      >
        {!editItem && activeTab === "Quick Train" && (
          <ArmyList
            onEdit={(item) => setEditItem(item)}
            armies={data?.filter((army) => army.id !== "active")}
            onTrain={(item) => {
              trainMutation.mutate(item);
              setActiveTab("Army");
            }}
          />
        )}
        {editItem && activeTab === "Quick Train" && (
          <EditArmy
            army={editItem}
            onCancel={() => {
              setEditItem(null);
            }}
            onChange={(item) => {
              updateMutation.mutate(item);
              setEditItem(null);
            }}
            onDelete={() => {
              deleteMutation.mutate(editItem);
              setEditItem(null);
            }}
          />
        )}
        {activeTab === "Army" && <ShowActiveArmy armyItem={activeArmy} />}
      </Dialog>
    </>
  );
};
