import MyDeleteIcon from "@/components/icons/My_DeleteIcon";
import MyEditIcon from "@/components/icons/My_EditIcon";

export default function ReviewActionModal() {
  return (
    <div className="flex justify-end">

      <MyEditIcon
      onClick={()=>{
            
      }}
      />
        <MyDeleteIcon
        onClick={()=>{
            
        }}
        />
    </div>
  )
}