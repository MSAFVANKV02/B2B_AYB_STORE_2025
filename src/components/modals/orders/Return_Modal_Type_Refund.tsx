import { Textarea } from "@/components/ui/textarea";
import TaskModal, {
  TaskModalContent,
  TaskModalFooter,
  TaskModalHeader,
} from "../TaskModal";
import { IOrders } from "@/types/orderTypes";
import MyCloseIcon from "@/components/icons/My_CloseIcon";
import { UseModal } from "@/providers/context/context";
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
import MyPdf from "@/components/myUi/MyPdf";

type Props = {
  selectedOrder: IOrders;
  setSelectedOrder: (order: IOrders | null) => void;
};

export default function ReturnModalTypeRefund({
  selectedOrder,
  setSelectedOrder,
}: Props) {
  const { setIsOpen } = UseModal();
  return (
    <div>
      <TaskModal className="xl:w-[30vw] md:w-[50vw] sm:w-[80vw] w-full p-7 md:h-[90vh] h-full">
        <TaskModalHeader>
          <small>Order Code: {selectedOrder.orderCode}</small>
          <MyCloseIcon
            onClick={() => {
              setIsOpen(false);
              setSelectedOrder(null); // Reset the selected order
            }}
          />
        </TaskModalHeader>
        <TaskModalContent className="space-y-10 ">
          <div className="space-y-3">
            {/*  Shipping Partner Name ===== */}
            <div className="flex justify-between">
              <span className="text-xs text-textGray font-bold">
                Shipping Partner Name
              </span>
              <div className="w-[60%] text-xs">
                <Input
                  type="text"
                  className="w-full bg-bgGraySoft text-xs"
                  placeholder="Shipping Partner Name"
                  style={{
                    fontSize: "12px",
                  }}
                />
              </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
              <span className="text-xs text-textGray font-bold">LR No.</span>
              <div className="w-[60%] text-xs">
                <Input
                  type="text"
                  className="w-full bg-bgGraySoft text-xs"
                  style={{
                    fontSize: "12px",
                  }}
                  placeholder="LR No."
                />
              </div>
            </div>
            {/*  */}
            <div className="flex justify-between">
              <span className="text-xs text-textGray font-bold">LR Photo</span>
              <div className="w-[60%]">
                <MyPdf
                  value="/Invoice_INV1482989614215502 (16).pdf"
                  className="w-14 h-14"
                />
              </div>
            </div>
            {/*=== Return bill pdf == */}
            <div className="flex justify-between">
              <span className="text-xs text-textGray font-bold">
                Return bill pdf
              </span>
              <div className="w-[60%]">
                <MyPdf
                  value="/Invoice_INV1482989614215502 (16).pdf"
                  className="w-14 h-14"
                />
              </div>
            </div>
            {/* ====== */}
            <div className="flex justify-between">
              <span className="text-xs text-textGray font-bold">Date</span>
              <div className="w-[60%] text-xs">
                <Input
                  type="text"
                  className="w-full bg-bgGraySoft text-xs"
                  style={{
                    fontSize: "12px",
                  }}
                  placeholder="Date"
                />
              </div>
            </div>

           <div className="flex justify-end">
           <AyButton
            title="Save"
            type="submit"
            sx={{
              bgcolor:"black",
              "&:hover":{
                bgcolor:"rgba(0, 0, 0, 0.80)"
              }
            }}
            />
           </div>
          </div>

          <Separator />
          {/* store Details =====
        ======================= */}
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
                border-b border-t-0 border-l-0 border-r-0 rounded-none outline-none t"
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
            <Textarea className="resize-none" placeholder="Reason for Refund" />
          </div>
        </TaskModalContent>

        <TaskModalFooter className="">
          <div className="flex gap-4">
            <AyButton
              title="Store Refund Approved"
              sx={{
                bgcolor: "#2B90EC",
                height: "50px",
                "&:hover": {
                  bgcolor: "rgba(43, 144, 236, 0.80)", // Optional hover color
                },
                width: "100%",
              }}
            />
          </div>
        </TaskModalFooter>
      </TaskModal>
    </div>
  );
}
