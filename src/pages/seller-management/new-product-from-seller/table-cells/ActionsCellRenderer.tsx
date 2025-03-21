import { useModal } from '@/providers/context/context';
import { IProducts } from '@/types/productType'
import { ArrowRight } from 'lucide-react';
import RequestStockModal from './request_stock_modal';


type Props = {
    data : IProducts;
    refetch: any;

}

const ActionsCellRenderer = ({data}: Props) => {
  const {  dynamicOpenModal } = useModal();

  return (
    <div>
        <div className='text-textMain flex items-center gap-2 cursor-pointer'
        onClick={()=>{
          dynamicOpenModal(data)
        
        }}
        >
       <span> Request for Stock </span> <ArrowRight size={14} />
        </div>

        <RequestStockModal 
        // data={data}
        />
    </div>
  )
}

export default ActionsCellRenderer