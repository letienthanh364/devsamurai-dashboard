import { Button } from "@/components/ui/button";
import { Contact } from "@/types/contact/contact.type";
import { ArrowForward } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useState } from "react";

interface ContactItemProps {
  contact: Contact;
}

export default function DashBoardContactItem({ contact }: ContactItemProps) {
  const [hover, setHover] = useState(false);

  return (
    <Button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="hover:!bg-bg-hovering !bg-transparent !text-sm !font-normal"
    >
      <div className="w-full flex items-center gap-2 justify-start ">
        <Avatar
          src={contact.imageUrl}
          alt={contact.name}
          sx={{
            width: 16,
            height: 16,
            borderRadius: contact.isCompany ? "4px" : "50%",
          }}
        />
        <p className="">{contact.name}</p>
      </div>

      {hover ? (
        <ArrowForward sx={{ width: 16, height: 16 }} className="" />
      ) : (
        <p className="">{contact.visitCount}</p>
      )}
    </Button>
  );
}
