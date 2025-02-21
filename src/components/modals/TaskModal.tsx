import React from "react";
import { useModal } from "@/providers/context/context";
import { motion } from "framer-motion";
import Modal from "react-modal";
// import MyBackBtn from "../myUi/myBackBtn";
import { cn } from "@/lib/utils";
Modal.setAppElement("#root");

type ModalComponent = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function TaskModal({
  children,
  className,
  onClick,
}: ModalComponent) {
  const { isOpen, closeModal } = useModal();

  const handleCloseModal = () => {
    if (!onClick) {
      closeModal();
    } else if (isOpen) {
      onClick();
    }
  };
  // if (!selectedTask) return null; // If there's no selected task, don't render the modal

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed inset-0 bg-black/20 backdrop-filter  flex items-center justify-center z-[10000] "
      className={cn(
        `bg-white  md:rounded-lg rounded-none  min-w-xl w-[30vw] p-4 h-[80vh]  outline-none  overflow-y-auto relative z-[10001]`,
        className
      )}
    >
      {/* <div className="md:hidden block">
        <MyBackBtn
          clickEvent={closeModal}
          iconSize={25}
          className=" absolute top-0 right-0 z-50 "
          tooltipTitle="close"
          placeTooltip="left"
          icon="ei:close"
        />
      </div> */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          `bg-white md:rounded-lg rounded-none min-w-xl max-w-full outline-none overflow-y-auto relative`
        )}
      >
        {children}
      </motion.div>
    </Modal>
  );
}

type TaskModalHeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalHeader({ children, className }: TaskModalHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      {children}
    </div>
  );
}

type TaskModalContentProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalContent({
  children,
  className,
}: TaskModalContentProps) {
  return <div className={cn("flex-grow", className)}>{children}</div>;
}

type TaskModalFooterProps = {
  children: React.ReactNode;
  className?: string;
};

export function TaskModalFooter({ children, className }: TaskModalFooterProps) {
  return (
    <div className={cn("flex justify-end items-center gap-4 pt-4", className)}>
      {children}
    </div>
  );
}
