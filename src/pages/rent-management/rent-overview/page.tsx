
// import React360Viewer from 'react-360-view';

import { RentOverviewTableColumnSDcn } from "@/components/tasks/table_columns/rent-management/rent-overview-column";
import { DataTable } from "@/components/tasks/task_components/data-table";

import { IRentTypes } from "@/types/rent-types";

const RentManagementOverview = () => {
//   const { formatNumber } = NumberFormateI18n();

const mockOrder: IRentTypes[] = [
  {
    seller_name: "Haash India pvt ltd",
    space_m3: 35,
    start_date: "10 Jun 2025",
    end_date: "10 July 2025",
    total_amount: "₹5,000",
    days_remaining: "5 Days",
    status: "Received",
    invoice: {
      print: true,
      view: true
    }
  },
  {
    seller_name: "Haash India pvt ltd",
    space_m3: 35,
    start_date: "10 Jun 2025",
    end_date: "10 July 2025",
    total_amount: "₹5,000",
    days_remaining: "5 Days",
    status: "Received",
    invoice: {
      print: true,
      view: true
    }
  },
  {
    seller_name: "Haash India pvt ltd",
    space_m3: 35,
    start_date: "10 Jun 2025",
    end_date: "10 July 2025",
    total_amount: "₹5,000",
    days_remaining: "5 Days",
    status: "Received",
    invoice: {
      print: true,
      view: true
    }
  },
  {
    seller_name: "Filia Enterprises",
    space_m3: 35,
    start_date: "10 Jun 2025",
    end_date: "10 July 2025",
    total_amount: "₹5,000",
    days_remaining: "10 Days Overdue",
    status: "Overdue",
    invoice: {
      print: true,
      view: true
    }
  }
]



  const cards = [
    {
      id: 1,
      title: "Total Sellers Renting Space",
      value: `10`,
    },
    {
      id: 2,
      title: "Total Space Rented",
      value: `130 m³`,
    },
    {
      id: 3,
      title: "Total Rent Due (This Month)",
      value: `₹35,000`,
    },
    {
      id: 4,
      title: "Rent Collected (This Month)",
      value: `₹28,000`,
    },
  ];


  return (
    <div>
      <div className="page-outer !shadow-none !bg-inherit space-y-3">
        <div className="">
          <h1 className="font-bold text-lg uppercase">Rent Overview</h1>
        </div>
        <section className="py-3 space-y-5 sm:px-4 px-1 bg-white dark:bg-inherit">
          <div className="flex gap-3">
            <div className="flex flex-col gap-1">
              <span className="">My total rent space</span>
              <span className="">150 m³</span>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full sm:gap-6 gap-3">
            {/* Rent management overview cards */}
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white  dark:bg-neutral-300/30 p-4 min-h-[90px] flex justify-center flex-col rounded-lg shadow-[0px_0px_6px_4px_#00000024]"
              >
                <h2 className="text-sm font-semibold">{card.title}</h2>
                <p className="text-sm font-bold text-[#4D4D4D] ">
                  {card.value}
                </p>
                {/* <p className="text-sm font-bold text-[#4D4D4D] ">
                  {formatNumber(Number(card.value.replace(/[^\d.]/g, "")))}
                </p>
                <p className="text-sm font-bold text-[#4D4D4D] ">
                  {formatNumber(Number(card.value.trim()))}
                </p> */}
                {/* <sup>3</sup> */}
              </div>
            ))}
          </div>
        </section>


        {/* table starts */}

      <section className="bg-white sm:px-4 dark:bg-inherit h-fit rounded-md py-4 overflow-auto lg:min-w-[calc(100vw-28rem)] ">
        <DataTable
          // isLoading={isFetching}
          classNameOne="space-y-3"
          enableDatepicker
          searchWith={"all"}
          
          enableSearch
          columns={RentOverviewTableColumnSDcn}
          data={mockOrder ?? []}
          tableRowClass="capitalize h-10 py-0 text-xs mb-0 border-none"
          tableCellClass="py-2 align-middle border-none"
          tableHeadClass=""
          toolBarClassName="justify-end  space-x-0 text-xs"
          tableClass="border-none "
          className="border-none"
          title="Sellers Rent Table"
          titleDivClassName="sm:px-3 px-2 sm:flex-row flex-col gap-3"
        />
      </section>
      </div>

  {/* <div className="w-[40%] border m-10 relative">
  <React360Viewer
  amount={36}
  imagePath="https://scaleflex.airstore.io/demo/360-car/"
  fileName="shoe_{index}.jpg"
/>
  </div> */}


    </div>
  );
};

export default RentManagementOverview;
