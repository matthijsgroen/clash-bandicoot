import { useState } from "react";
import { Update } from "../../data/changes/type";
import { getNewUpdateCount } from "../../data/changes/updateCount";
import { Badge } from "../../ui-components/atoms/Badge";
import { Dialog } from "../../ui-components/atoms/Dialog";
import { Tab } from "../../ui-components/atoms/Tab";
import { Toolbar } from "../../ui-components/atoms/Toolbar";
import { BackButton } from "../components/BackButton";
import { Updates } from "../Updates/Updates";
import { ChangeLog } from "../Updates/Changelog";

export const HelpDialog: React.FC<{
  onClose?: VoidFunction;
  triggerUpdate?: VoidFunction;
  updates: Update[];
}> = ({ onClose, triggerUpdate, updates }) => {
  const updateCount = getNewUpdateCount(updates);
  const [activeTab, setActiveTab] = useState<"help" | "updates" | "changelog">(
    "updates"
  );

  return (
    <Dialog
      onClose={onClose}
      width="min(90vw, 30rem)"
      height="min(80vh, 30rem)"
      title={
        <Toolbar>
          <BackButton
            invisible={activeTab !== "changelog"}
            onClick={() => setActiveTab("updates")}
          />
          <Tab disabled active={activeTab === "help"}>
            Help
          </Tab>
          <Badge content={`${updateCount}`} hidden={updateCount === 0}>
            <Tab active={activeTab === "changelog" || activeTab === "updates"}>
              Updates
            </Tab>
          </Badge>
        </Toolbar>
      }
    >
      {activeTab === "updates" && (
        <Updates
          updates={updates}
          triggerUpdate={triggerUpdate}
          viewChangelog={() => setActiveTab("changelog")}
        />
      )}
      {activeTab === "changelog" && <ChangeLog updates={updates} />}
    </Dialog>
  );
};
