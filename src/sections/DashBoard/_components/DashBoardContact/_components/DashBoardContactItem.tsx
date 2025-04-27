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
    >
      <div className="w-full ">
        <Avatar
          src={contact.imageUrl}
          alt={contact.name}
          sx={{
            width: 16,
            height: 16,
            borderRadius: contact.isCompany ? "4px" : "50%",
          }}
        />
        <p className="m-0 text-sm font-medium text-foreground">
          {contact.name}
        </p>
      </div>

      {hover ? (
        <ArrowForward
          sx={{ width: 16, height: 16 }}
          className="text-foreground"
        />
      ) : (
        <p className="m-0 text-sm font-medium !text-foreground">
          {contact.visitCount}
        </p>
      )}
    </Button>
  );
}
