import { UseModal } from "@/providers/context/context";
import MyCloseIcon from "../icons/My_CloseIcon";
import TaskModal, { TaskModalContent, TaskModalHeader } from "../modals/TaskModal";
import BrandAcceptionForm from "./Brand_Acception_Form";




const BrandDetailsModal = () => {
    const {setIsOpen} = UseModal()
  return (
    <TaskModal className="p-7 xl:w-[40%] sm:w-[70%] w-full sm:h-[80%] h-full">
    <TaskModalHeader>
      <h5 className="font-bold capitalize">Brand request</h5>
      {/* Close Icon */}
      <MyCloseIcon
        onClick={() => {
          setIsOpen(false);
        }}
        isTooltip={false}
      />
    </TaskModalHeader>

    <TaskModalContent>
      {/* Brand Details */}
      <BrandAcceptionForm />
    </TaskModalContent>
  </TaskModal>
  )
}

export default BrandDetailsModal