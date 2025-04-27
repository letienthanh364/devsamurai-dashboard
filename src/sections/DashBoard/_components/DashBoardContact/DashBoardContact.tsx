import React from "react";

import DashBoardContactList from "./_components/DashBoardContactList";
import { mock_Contacts, mock_leastVisitedContacts } from "./mock";

export default function DashBoardContact() {
  return (
    <div className="grid grid-cols-2 gap-8 w-full ">
      <div className="col-span-1 w-full">
        <DashBoardContactList
          title="Most visited contacts"
          contacts={mock_Contacts}
        />
      </div>
      <div className="col-span-1 w-full">
        <DashBoardContactList
          title="Least visited contacts"
          contacts={mock_leastVisitedContacts}
        />
      </div>
    </div>
  );
}
