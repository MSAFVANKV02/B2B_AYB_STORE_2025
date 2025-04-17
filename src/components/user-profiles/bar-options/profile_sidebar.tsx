import AyButton from "@/components/myUi/AyButton";
import { UseModal } from "@/providers/context/context";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useParams } from "react-router-dom";

const ProfileSidebar = () => {
  const { page } = useParams();
  const { handleLogout } = UseModal();


  const sidebarList = [
    {
      id: 1,
      icon: "gg:profile",
      title: "Profile",
      slug: "profile",
      active: true,
    },
    {
      id: 2,
      icon: "mdi:bank-outline",
      title: "Billing",
      slug: "billing",
      active: false,
    },
    {
      id: 3,
      icon: "material-symbols:security",
      title: "Security",
      slug: "security",
      active: false,
    },
    {
      id: 4,
      icon: "material-symbols:notification-settings-outline-rounded",
      title: "Notifications",
      slug: "notifications",
      active: false,
    },
  ];
  return (
    <div className="p-5 flex flex-col justify-between h-full  ">
      <ul className="flex flex-col gap-3">
        {sidebarList.map((item) => (
          <Link key={item.id} to={`/admin/profile/${item.slug}`}>
            <li
              className={`text-sm flex items-center gap-3 ${
                page === item.slug
                  ? "font-bold bg-gray-100 rounded-md shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:rounded-md hover:shadow-sm"
              } p-3 duration-300 transition-all`}
            >
              <Icon icon={item.icon} fontSize={20} />
              <span>{item.title}</span>
            </li>
          </Link>
        ))}
      </ul>

      <AyButton
      sx={{
        width:"100%",
        color:"red",
        marginTop:"7px",
        "&:hover":{
          bgcolor:"white"
        }
      }}
      variant="outlined"
      outLineColor="red"
      onClick={handleLogout}
      >
          logout
      </AyButton>
    </div>
  );
};

export default ProfileSidebar;
