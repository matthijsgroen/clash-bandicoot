import React, {
  ComponentProps,
  MouseEventHandler,
  useRef,
  useState,
} from "react";
import { Button } from "../atoms/Button";
import { createPortal } from "react-dom";
import { ConfirmDialog } from "./ConfirmDialog";

export const ButtonWithConfirm: React.FC<
  ComponentProps<typeof Button> & {
    confirmTitle: string;
    confirmMessage: string;
  }
> = ({ confirmTitle, confirmMessage, onClick, ...buttonProps }) => {
  const [showModal, updateShowModal] = useState(false);
  const buttonEvent = useRef<React.MouseEvent<HTMLButtonElement>>();

  const onClose = (confirmed: boolean) => {
    updateShowModal(false);
    if (confirmed) {
      onClick?.(buttonEvent.current!);
    }
  };

  const onButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    buttonEvent.current = e;
    updateShowModal(true);
  };

  return (
    <>
      <Button {...buttonProps} onClick={onButtonClick} />
      {showModal &&
        createPortal(
          <ConfirmDialog
            title={confirmTitle}
            message={confirmMessage}
            onClose={onClose}
          />,
          document.body
        )}
    </>
  );
};
