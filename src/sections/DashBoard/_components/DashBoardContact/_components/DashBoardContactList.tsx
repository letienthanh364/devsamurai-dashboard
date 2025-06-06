import { Contact } from "@/types/contact/contact.type";
import DashBoardContactItem from "./DashBoardContactItem";

interface ContactListProps {
  title: string;
  contacts: Contact[];
}
export default function DashBoardContactList({
  title,
  contacts,
}: ContactListProps) {
  return (
    <div className="border border-border-common rounded-xl text-[#fafafa] shadow-sm bg-[#09090b] overflow-hidden">
      <div className="p-6 pb-2">
        <p className="m-0 text-base font-semibold text-left">{title}</p>
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col gap-2">
          {contacts.map((contact) => (
            <DashBoardContactItem key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
    </div>
  );
}
