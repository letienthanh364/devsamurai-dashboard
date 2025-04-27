import React, { ReactNode, useState } from "react";

import { styled } from "@mui/material/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button } from "@mui/material";
import useDashBoardSidebarStore from "../DashBoardSidebar.store";

interface SidebarGroupProps {
  title: string;
  children: ReactNode;
}

const StyledButton = styled(Button)(({ theme }) => ({
  display: "flex",
  height: "36px",
  flexShrink: 0,
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  textTransform: "none",
  borderRadius: theme.shape.borderRadius,
  padding: "0 10px",
  fontSize: "0.75rem",
  fontWeight: 500,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TitleSpan = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const ContentDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  overflow: "hidden",
  maxHeight: isOpen ? "1000px" : "0",
  opacity: isOpen ? 1 : 0,
  transition: isOpen
    ? "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out"
    : "max-height 0.5s ease-in-out, opacity 0.3s ease-in-out",
  marginTop: isOpen ? theme.spacing(1) : 0,
}));

const ButtonContainer = styled("div")({
  "&:hover .chevron-icon": {
    display: "inline-flex",
  },
});

export const DashBoardSidebarDropdown: React.FC<SidebarGroupProps> = ({
  title,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isOpen: isSidebarOpen } = useDashBoardSidebarStore();

  return (
    <div
      data-sidebar="group"
      className="relative flex w-full min-w-0 flex-col p-3"
      data-state={isOpen ? "open" : "closed"}
    >
      <ButtonContainer>
        <StyledButton
          type="button"
          aria-controls="sidebar-content"
          aria-expanded={isOpen}
          data-state={isOpen ? "open" : "closed"}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isSidebarOpen && <TitleSpan>{title}</TitleSpan>}
          <ChevronRightIcon
            className="chevron-icon"
            sx={{
              ml: "auto",
              display: "none",
              fontSize: "1rem",
              color: "text.primary",
              transition: "transform 200ms",
              transform: isOpen ? "rotate(90deg)" : "none",
            }}
          />
        </StyledButton>
      </ButtonContainer>

      <ContentDiv isOpen={isOpen}>
        <div data-sidebar="group-content" className="w-full text-sm">
          {children}
        </div>
      </ContentDiv>
    </div>
  );
};
