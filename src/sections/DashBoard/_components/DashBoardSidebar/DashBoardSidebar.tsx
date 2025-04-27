"use client";

import { cn } from "@/lib/utils";
import {
  DashBoardSideBar_favoriteContacts,
  DashBoardSideBar_footerItems,
  DashBoardSideBar_navigationItems,
} from "./items";
import DashBoardSidebarDropdown from "./_components";
import useAppStore from "@/stores/useAppStore";
import useDashBoardSidebarStore from "./DashBoardSidebar.store";
import { Button, IconButton } from "@mui/material";

const buttonStyles = {
  textTransform: "none",
  fontWeight: "normal",
  justifyContent: "flex-start",
  minWidth: "unset",
  padding: "10px",
  boxShadow: "none",
  borderRadius: "6px",
};

export default function DashBoardSidebar() {
  const { toggle, isOpen } = useDashBoardSidebarStore();
  const { user, isInitialized } = useAppStore();

  const menuButtonClass =
    "flex w-full items-center gap-2 overflow-hidden rounded-md p-2.5 text-left outline-none disabled:opacity-50 h-9 text-sm";

  // Don't render until store is initialized to prevent hydration mismatch
  if (!isInitialized) {
    return (
      <div className="flex min-h-svh bg-[#09090b] border-r-[1px] border-[#27272a] flex-col w-16">
        {/* Loading skeleton */}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-svh bg-[#09090b] border-r-[1px] border-[#27272a] flex-col",
        "transition-[width] duration-300 ease-in-out",
        {
          "w-60": isOpen,
          "w-16": !isOpen,
        }
      )}
      style={{
        overflow: "hidden",
        willChange: "width",
      }}
    >
      {/* Rest of your component remains the same */}
      <div className="flex flex-col gap-2 p-3 w-full">
        <div className="flex h-10 w-full flex-row items-center justify-between pl-0.5">
          <div
            className={cn(
              "flex items-center space-x-2 transition-opacity duration-300"
            )}
          >
            {isOpen && (
              <div className="flex size-9 items-center justify-center p-1">
                <div className="flex size-7 items-center justify-center rounded-md border text-primary">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path
                        d="M7.81815 8.36373L12 0L24 24H15.2809L7.81815 8.36373Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M4.32142 15.3572L8.44635 24H-1.14809e-06L4.32142 15.3572Z"
                        fill="currentColor"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
            )}
            <span
              className={cn(
                "font-bold whitespace-nowrap transition-all duration-300",
                {
                  "opacity-0": !isOpen,
                  "opacity-100": isOpen,
                  "w-0": !isOpen,
                  "w-auto": isOpen,
                }
              )}
            >
              Acme
            </span>
          </div>
          <IconButton
            onClick={toggle}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground size-9 shrink-0 rounded-full text-muted-foreground"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left size-4 shrink-0"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu size-4 shrink-0"
              >
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
              </svg>
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </IconButton>
        </div>
      </div>

      {/* Main navigation section */}
      <div className="relative flex w-full min-w-0 flex-col p-3">
        <ul className="flex w-full min-w-0 flex-col gap-1">
          {DashBoardSideBar_navigationItems.map((item, index) => (
            <li key={index} className="relative">
              <Button
                data-size="default"
                data-active={item.active ? "true" : "false"}
                className={`${menuButtonClass} ${
                  !item.active ? "opacity-80" : ""
                }`}
                data-state="closed"
                // onClick={() => handleNavigation(item.path)}
                disableRipple
                disableElevation
                sx={buttonStyles}
              >
                {item.icon}
                <span
                  className={cn(
                    item.textClass,
                    "whitespace-nowrap transition-all duration-300",
                    {
                      "opacity-0 w-0": !isOpen,
                      "opacity-100 ml-2 w-auto": isOpen,
                    }
                  )}
                >
                  {item.name}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <DashBoardSidebarDropdown title="Favorites">
        <ul className="flex w-full min-w-0 flex-col gap-1">
          {DashBoardSideBar_favoriteContacts.map((contact) => (
            <li
              key={contact.id}
              className="group/menu-item relative"
              tabIndex={0}
              aria-disabled="false"
              aria-roledescription="sortable"
            >
              <a
                href={`/dashboard/contacts/${contact.id}`}
                className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2.5 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!p-2.5 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-9 text-sm group/fav-item relative"
                data-state="closed"
              >
                <span className="relative flex overflow-hidden size-4 flex-none shrink-0 rounded-md">
                  <img
                    className="aspect-square size-full"
                    alt="avatar"
                    src={contact.imageSrc}
                  />
                </span>
                <span className="backface-hidden ml-0.5 truncate text-sm font-normal will-change-transform">
                  {contact.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </DashBoardSidebarDropdown>

      <div className="relative flex w-full min-w-0 flex-col p-3 mt-auto pb-0">
        <ul className="flex w-full min-w-0 flex-col gap-1">
          {DashBoardSideBar_footerItems.map((item, index) => (
            <li key={index} className="group/menu-item relative">
              <Button
                data-size="default"
                data-active="false"
                className={`${menuButtonClass} !text-muted-foreground`}
                type="button"
                data-state="closed"
                onClick={item.action}
                disableRipple
                disableElevation
                sx={buttonStyles}
              >
                {item.icon}
                <span
                  className={cn(
                    "whitespace-nowrap transition-all duration-300",
                    {
                      "opacity-0 w-0": !isOpen,
                      "opacity-100 ml-2 w-auto": isOpen,
                    }
                  )}
                >
                  {item.name}
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* User profile section */}
      <div className="flex flex-col gap-2 p-3">
        <div className="relative flex w-full min-w-0 flex-col p-0">
          <ul className="flex w-full min-w-0 flex-col gap-1">
            <li className="group/menu-item relative">
              <Button
                className={`flex w-full items-center gap-2 overflow-hidden "justify-start" !pl-[2px] rounded-md text-left !text-black h-9 text-sm`}
                disableRipple
                disableElevation
                sx={buttonStyles}
              >
                <span className="relative flex shrink-0 overflow-hidden size-7 rounded-full">
                  <img
                    className="aspect-square size-full"
                    alt="Name user"
                    src="/images/UserImage.jpg"
                  />
                </span>
                <span
                  className={cn(
                    "truncate text-sm font-medium leading-none whitespace-nowrap transition-all duration-300",
                    {
                      "opacity-0 w-0": !isOpen,
                      "opacity-100 ml-2 w-auto": isOpen,
                    }
                  )}
                >
                  {user?.name || "User"}
                </span>
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
