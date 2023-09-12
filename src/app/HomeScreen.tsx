import { useState } from "react";
import { Button } from "../ui-components/atoms/Button";
import { useAppUpdate } from "./hooks/useAppUpdater";
import { VillagePopup } from "./Villages/VillagePopup";
import { ArmyPopup } from "./Armies/ArmyPopup";
import { useQuery } from "@tanstack/react-query";
import { getArmies } from "../api/armies";
import { TargetSearch } from "./Combat/TargetSearch";
import { getUpdates } from "../api/updates";
import { Badge } from "../ui-components/atoms/Badge";
import { HelpDialog } from "./Help/HelpDialog";
import { getNewUpdateCount } from "../data/changes/updateCount";

export const HomeScreen: React.FC = () => {
  const [hasUpdate, triggerUpdate] = useAppUpdate();
  const [openPopup, setOpenPopup] = useState<
    "villages" | "armies" | "combat" | "help" | null
  >(null);

  const { data } = useQuery({
    queryKey: ["armyList"],
    queryFn: getArmies,
    networkMode: "always",
  });
  const activeArmy = data?.find((army) => army.id === "active");

  const { data: updates } = useQuery({
    queryKey: ["updates"],
    queryFn: getUpdates,
    networkMode: "always",
  });

  const updateCount = getNewUpdateCount(updates);

  return (
    <div>
      <header>
        <h1>Clash Bandicoot</h1>
        <p>
          The useless clash coach.{" "}
          <strong>
            This app is under construction. Everything can potentially break or
            change.
          </strong>
        </p>
      </header>
      <menu style={{ display: "flex" }}>
        <Button
          onClick={() => setOpenPopup("combat")}
          color="orange"
          width="large"
          height="large"
          disabled={activeArmy === null}
        >
          Attack
        </Button>

        <Button
          onClick={() => setOpenPopup("villages")}
          color="orange"
          width="large"
          height="large"
        >
          Bases
        </Button>

        <Button
          onClick={() => setOpenPopup("armies")}
          color="orange"
          width="large"
          height="large"
        >
          Armies
        </Button>

        <Button color="orange" width="large" height="large" disabled>
          Replays
        </Button>

        <Badge content={`${updateCount}`} hidden={updateCount === 0}>
          <Button
            color="orange"
            width="large"
            height="large"
            onClick={() => setOpenPopup("help")}
          >
            Help & Updates
          </Button>
        </Badge>
      </menu>

      <footer>
        <p>
          This material is unofficial and is not endorsed by Supercell. For more
          information see Supercell's Fan Content Policy:
          <a href="www.supercell.com/fan-content-policy" target="policy">
            www.supercell.com/fan-content-policy
          </a>
          .
        </p>
      </footer>
      {openPopup === "villages" && (
        <VillagePopup onClose={() => setOpenPopup(null)} />
      )}
      {openPopup === "armies" && (
        <ArmyPopup onClose={() => setOpenPopup(null)} />
      )}
      {openPopup === "combat" && activeArmy && (
        <TargetSearch
          onClose={() => setOpenPopup(null)}
          armyItem={activeArmy}
        />
      )}
      {openPopup === "help" && (
        <HelpDialog
          onClose={() => setOpenPopup(null)}
          triggerUpdate={hasUpdate ? triggerUpdate : undefined}
          updates={updates ?? []}
        />
      )}
    </div>
  );
};
