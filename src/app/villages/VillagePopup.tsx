import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "../../ui-components/atoms/Button";
import { useState } from "react";
import { VillageEditor } from "../VillageEditor/VillageEditor";
import { Village, getBases, postBase, putBase } from "../../api/bases";

export const VillagePopup = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: ["villageList"], queryFn: getBases });

  const createMutation = useMutation({
    mutationFn: postBase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["villageList"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: putBase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["villageList"] });
    },
  });

  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <>
      <div>
        <h1>Bases</h1>
        <ol>
          {data &&
            data.map((village) => (
              <li
                key={village.id}
                style={{
                  background:
                    selectedVillage && selectedVillage.id === village.id
                      ? "green"
                      : "transparent",
                }}
              >
                {village.name}
                <Button
                  color="green"
                  width="default"
                  height="small"
                  onClick={() => setSelectedVillage(village)}
                >
                  Select
                </Button>
              </li>
            ))}
        </ol>
        <div>
          <Button
            color="orange"
            width="default"
            height="small"
            onClick={() => {
              createMutation.mutate({ name: "New Village" });
              // set as selected, and start editing
            }}
          >
            + New
          </Button>

          <Button
            color="orange"
            width="default"
            height="small"
            disabled={selectedVillage === null || selectedVillage.builtIn}
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
          <Button
            color="red"
            width="default"
            height="small"
            disabled={selectedVillage === null || selectedVillage.builtIn}
          >
            Delete
          </Button>
        </div>
      </div>
      {isEditing && selectedVillage && (
        <VillageEditor
          base={selectedVillage.layout}
          onClose={() => {
            setIsEditing(false);
          }}
          onSave={async (updatedBase) => {
            console.log("Saving village");
            updateMutation.mutate({ ...selectedVillage, layout: updatedBase });
            setIsEditing(false);
          }}
        />
      )}
    </>
  );
};
