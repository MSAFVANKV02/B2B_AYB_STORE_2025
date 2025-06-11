import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileSidebar from "@/components/user-profiles/bar-options/profile_sidebar";

import { useAppSelector } from "@/redux/hook";
import { useEffect, useRef, useState } from "react";

const AdminProfile = () => {
  const { currentAdmin } = useAppSelector((state) => state.admin);
  const openRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  // Close when clicking outside of the openRef
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openRef.current && !openRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <div>
      <div className="flex gap-3 ml-5 relative">
        <div className="flex flex-col text-start">
          <span className=" text-gray-700 dark:text-gray-300 text-sm">
            {" "}
            {currentAdmin?.name || currentAdmin?.emailId?.split("@")[0]}
          </span>
          <span className="text-xs font-medium text-gray-400 dark:text-gray-300">
            {currentAdmin?.role}
          </span>
        </div>
        {/* ====== */}
        {/* ====== */}
        <Avatar
          className="w-9 h-9 cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <AvatarImage src={currentAdmin?.avatar} />
          <AvatarFallback className=" bg-bgSoft dark:bg-[#2B90EC] dark:backdrop-blur-none backdrop-blur-sm">
            {currentAdmin?.name?.charAt(0) || "Seller"}
          </AvatarFallback>
        </Avatar>

        <div
          ref={openRef}
          className={`absolute w-[200px] bg-white h-fit ${
            open ? "translate-y-0 top-14" : "-translate-y-[110%] "
          } duration-300 transition-all rounded-md shadow-lg right-0`}
        >
          <ProfileSidebar />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
