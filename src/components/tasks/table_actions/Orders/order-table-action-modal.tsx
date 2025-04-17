import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";


type Props = {
    orderId:string;
}

export default function OrderTableActionModal({orderId}: Props) {
    // const {setIsOpen} = UseModal();
    const navigate = useNavigate();

    const showOrderDetails = (orderId:string) =>{
        navigate(`/sales/orders?order=${orderId}`)
    }

  return (
    <div className="flex">
    
    <DropdownMenu>
      <DropdownMenuTrigger>
       <div className="">
       <IconButton>
          <Icon icon="mi:options-vertical" />
        </IconButton>
       </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-10 ">
        <DropdownMenuItem className="text-xs px-3 cursor-pointer"
        onClick={()=>{
            // setIsOpen(true)
            showOrderDetails(orderId);
        }}
        >View</DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="text-xs px-3 cursor-pointer">Download</DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="text-xs px-3 cursor-pointer">Cancel Order</DropdownMenuItem>
        <Separator />
        <DropdownMenuItem className="text-xs px-3 cursor-pointer">Delete</DropdownMenuItem>
       
      </DropdownMenuContent>
    </DropdownMenu>

    {/* <TaskModal className="w-[60vw]">
      <Formik
        enableReinitialize
        onSubmit={(values) => {
          console.log("Updated Values:", values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col justify-between h-full">
            <TaskModalContent>
            </TaskModalContent>
            <TaskModalFooter>
              <AyButton title="Save" type="submit" />
            </TaskModalFooter>
          </Form>
        )}
      </Formik>
    </TaskModal> */}
  </div>
  )
}