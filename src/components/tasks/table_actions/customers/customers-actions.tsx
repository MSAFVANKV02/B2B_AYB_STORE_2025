import MyDeleteIcon from '@/components/icons/My_DeleteIcon'
import MyEditIcon from '@/components/icons/My_EditIcon'
import MyEyeIcon from '@/components/icons/My_EyeIcon'
import CustomerDetailsModal from '@/components/modals/cuestomers/customer_details_modal'
import { useModal } from '@/providers/context/context'



export default function CustomersActions() {
    const {setIsOpen} = useModal();
  return (
    <div className='flex items-center'>
        <MyEditIcon
        onClick={()=>{
            setIsOpen(true)
        }}
        />
        <MyEyeIcon
          onClick={()=>{

          }}
        />
        <MyDeleteIcon
         onClick={()=>{

         }}
        />


        <CustomerDetailsModal 
        onClose={()=>{
            setIsOpen(false)
        }}
        />
    </div>
  )
}