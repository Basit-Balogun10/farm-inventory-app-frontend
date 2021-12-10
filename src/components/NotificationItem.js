import React from 'react';

const NotificationItem = ({notification, notifications, setNotifications}) => {
  return (
    <div className="shadow-md my-4 flex justify-between items-center">
      <div className={`flex-1 p-4 flex justify-start items-center space-x-4 ${notification.status === "warning" ? "bg-red-200" : ""} ${notification.status === "info" ? "bg-blue-200" : ""} ${notification.status === "success" ? "bg-green-200" : ""}`}>
          <input type="checkbox" class="appearnce-none checked:bg-green-500 checked:border-transparent" checked={notification.seen}/>
          <div className="space-y-4">
            <p className="font-bold text-black text-lg">{notification.text}</p>
            <p className="font-bold text-gray-500 text-xs italic">{notification.date_created}</p>
          </div>
      </div>
    </div>
  );
}

export default NotificationItem;
