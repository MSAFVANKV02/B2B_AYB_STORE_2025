import { Textarea } from "@/components/ui/textarea";
import TaskModal, { TaskModalContent, TaskModalFooter, TaskModalHeader } from "../TaskModal";
import { IOrders } from "@/types/orderTypes";
import MyCloseIcon from "@/components/icons/My_CloseIcon";
import { useModal } from "@/providers/context/context";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AyButton from "@/components/myUi/AyButton";

type Props = {
  selectedOrder: IOrders;
  setSelectedOrder: (order: IOrders | null) => void;

}

export default function ReturnModalTypeAll({
  selectedOrder,
  setSelectedOrder,
}: Props) {
  const {setIsOpen} = useModal()
  return (
    <div>
        <TaskModal className="xl:w-[30vw] md:w-[50vw] sm:w-[80vw] w-full p-7">
          <TaskModalHeader>
            <small>Order Code: {selectedOrder.orderCode}</small>
            <MyCloseIcon
              onClick={() => {
                setIsOpen(false);
                setSelectedOrder(null); // Reset the selected order
              }}
            />
          </TaskModalHeader>
          <TaskModalContent className="space-y-4 h-4/5">
            <div className="space-y-1">
              <div className="">
                <span className="text-sm font-bold">Store Details</span>
              </div>
              <div className="">
                <p className="text-sm">{selectedOrder.customer}</p>
              </div>

              <div className="text-sm text-textGray">
                Malayamma, NIT Campus, +919846012078, <br /> support@ayaboo.in
              </div>
              <div className="">
                <div className="text-sm">
                  <strong>Phone Number:</strong> 0000 000 0
                </div>
                <div className="text-sm">
                  <strong>GST Number:</strong> 0000 000 0
                </div>
              </div>
              {/* <p><strong>Store:</strong> {selectedOrder.store}</p>
            <p><strong>Status:</strong> {selectedOrder.deliveryStatus}</p>
            <p><strong>Refund Reason:</strong> {selectedOrder.refund}</p>
            <p><strong>Created At:</strong> {selectedOrder.createdAt}</p> */}
            </div>

            <Separator />

            {/* Product Details ===========
                =============================== */}
            <div className="flex gap-3">
              <div className="w-16 h-20">
                <img
                  src="/img/products/image 78.png"
                  draggable={false}
                  alt="product"
                  className="w-full h-full"
                />
              </div>
              <div className="text-sm">
                <strong className="w-56 truncate">
                  Oversized 100% Cotton 190GSM 240GSM Plain White T Shirt
                </strong>
                {/* == */}
                <div className="">
                  <strong>Subtotal:</strong>
                  <span>$2003</span>
                </div>
                {/* == */}
              </div>
            </div>

            {/* products variation table ===
            ================================= */}
            <div className="">
              <table className="border-collapse">
                <thead>
                  <tr className="text-textGray text-sm">
                    <th className="py-2 px-2 text-start">Variants</th>
                    <th className="py-2 px-2 text-start">Price</th>
                    <th className="py-2 px-2 text-start">Return quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-2 text-start">
                      <div className="flex items-center gap-3">
                        <img
                          src="/img/products/image 78.png"
                          draggable={false}
                          alt="product"
                          className="w-9 h-10"
                        />{" "}
                        <span className="text-xs"> S X 2 times</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 text-start text-sm">$200</td>
                    <td className="py-2 px-2 text-start">
                      <Input type="number" className="max-w-16" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* total */}
            <div className="flex justify-between lg:w-3/4 pb-5">
              <span>Total:</span>
              <Select>
                <SelectTrigger
                  className="w-[180px] text-xs
                border-b-2 border-t-0 border-l-0 border-r-0 rounded-none outline-none t"
                >
                  <SelectValue
                    placeholder="View TAX details"
                    className="text-xs"
                  />
                </SelectTrigger>
                <SelectContent className="z-[10005]">
                  <SelectItem value="IGST">IGST</SelectItem>
                  <SelectItem value="SGST">SGST</SelectItem>
                  <SelectItem value="CGST">CGST</SelectItem>
                  <SelectItem value="CESS">CESS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/*  === Reason Text field */}
            <div className="">
              <Textarea
                className="resize-none"
                placeholder="Reason for Refund"
              />
            </div>
          </TaskModalContent>

          <TaskModalFooter className="">
            <div className="">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Refund" />
                </SelectTrigger>
                <SelectContent className="z-[10005]">
                  <SelectItem value="refund">refund</SelectItem>
                  <SelectItem value="replace">replace</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-4">
              <AyButton
                title="Store Reject"
                sx={{
                  bgcolor: "#E46E61",
                  height: "50px",
                  "&:hover": {
                    bgcolor: "rgba(228,110,97,0.80)", // Optional hover color
                  },
                }}
              />
              <AyButton
                title="Store Approve"
                sx={{
                  bgcolor: "#138808",
                  height: "50px",
                  "&:hover": {
                    bgcolor: "rgba(19, 136, 8, 0.80)", // Optional hover color
                  },
                }}
              />
            </div>
          </TaskModalFooter>
        </TaskModal>
    </div>
  )
}