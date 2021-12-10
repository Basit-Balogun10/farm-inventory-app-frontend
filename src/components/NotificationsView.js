import React from 'react';
import NotificationItem from "./NotificationItem";

const NotificationsView = () => {
  const notifications = [
    {
      "id": 1,
      "status": "warning",
      "seen": false,
      "text": "The average temperatures of the following broilers are ABOVE THE NORMAL TEMPERATURE: BR-2 and BR-7",
      "date_created": "5th December, 2021",
    },
    {
      "id": 2,
      "status": "info",
      "seen": false,
      "text": "You have successfully concluded WEEK 4",
      "date_created": "5th December, 2021",
    },
    {
      "id": 3,
      "status": "success",
      "seen": false,
      "text": "The following broilers are HAVE NO ISSUES with their growth and development so far: BR-1, BR-3, BR-5, BR-6 and BR-8",
      "date_created": "5th December, 2021",
    },
    {
      "id": 4,
      "status": "warning",
      "seen": true,
      "text": "The following broilers are CURRENTLY UNDERWEIGHT: BR-1 BR-4 and BR-8",
      "date_created": "28th November, 2021",
    },
    {
      "id": 5,
      "status": "info",
      "seen": true,
      "text": "You have successfully concluded WEEK 3",
      "date_created": "28th November, 2021",
    },
    {
      "id": 6,
      "status": "success",
      "seen": true,
      "text": "The following broilers are HAVE NO ISSUES with their growth and development so far: BR-2, BR-3, BR-5, BR-6 and BR-7",
      "date_created": "28th November, 2021",
    },
]
  return (
    <>
      <div class="px-4">
        <h3 class="italic text-xs">Notifications with red backgrounds denote warnings, those with blue background confirm the conclusion of a week, while those with green backgrounds tell about healthy broilers</h3>
        <div className="flex justify-center items-center space-x-2">
            <input type="checkbox" class="appearnce-none checked:bg-green-500 checked:border-transparent"/>
            <p>Mark all as read</p>
        </div>
              
      </div>
        <hr />
      {
        notifications.map((notification, index) => (
          <div key={notification.id}>
          <NotificationItem notification={notification}/>
        </div>
        ))
      }
    </>
  );
}

export default NotificationsView;
