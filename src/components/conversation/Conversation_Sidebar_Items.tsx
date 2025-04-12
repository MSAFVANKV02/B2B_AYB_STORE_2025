

export default function ConversationSidebarItems() {


  const users = [
    {
      id:1,
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      lastMessage: "Hello, how are you?",
      lastMessageTime: "11:45 AM",
      unreadCount: 2,
    },{
      id:2,
      name: "Maam",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      lastMessage: "Hi, I'm available. Let's catch up?",
      lastMessageTime: "10:30 AM",
      unreadCount: 0,
    }
  ]

  return (
    <div className="h-full bg-gray-50 overflow-y-scroll">
      <ul>
        {
          users.map((user) =>(
            <li key={user.id} className="py-3 px-4 flex items-center justify-between gap-4 bg-white border-b cursor-pointer">
             <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-sm truncate whitespace-nowrap overflow-hidden">{user.name}</div>
                <div className="text-xs text-gray-500">{user.lastMessageTime}</div>
              </div>
             </div>
              {user.unreadCount > 0 && <span className="text-xs text-red-500">{user.unreadCount}</span>}
            </li>
          ))
        }
      </ul>
    </div>
  )
}