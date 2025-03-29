import { useModal } from "@/providers/context/context"
import { ICategory } from "@/types/categorytypes"
import { Icon } from "@iconify/react/dist/iconify.js"


type Props = {
    product:ICategory
}

export default function CategoryAddModal({
    product,
  
}: Props) {
  const { openCategoryModal } = useModal()
  return (
    <div className="flex gap-3">

      <Icon icon="bxs:edit" fontSize={25} className="cursor-pointer" onClick={()=>{
        openCategoryModal(product)
      }} />
      <Icon icon="material-symbols:delete" fontSize={25} className="cursor-pointer"/>
      
    </div>
  )
}