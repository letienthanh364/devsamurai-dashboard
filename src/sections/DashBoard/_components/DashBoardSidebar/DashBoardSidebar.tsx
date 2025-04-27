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
import { Avatar, Button, Divider, IconButton } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AuthServices from "@/services/auth.service";

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
  const { handleLogout } = AuthServices.useAuth();

  const { toggle, isOpen } = useDashBoardSidebarStore();
  const { user, isInitialized } = useAppStore();
  const pathname = usePathname();

  const menuButtonClassnames =
    "flex w-full items-center gap-2 overflow-hidden rounded-md p-2.5 text-left outline-none disabled:opacity-50 h-9 text-sm hover:!bg-bg-hovering";

  // Don't render until store is initialized to prevent hydration mismatch
  if (!isInitialized) {
    return (
      <div className="flex min-h-svh bg-sidebar-background border-r-[1px] border-[#27272a] flex-col w-16">
        {/* Loading skeleton */}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex min-h-svh bg-sidebar border-r-[1px] border-[#27272a] text-white flex-col",
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
      <div data-sidebar="header" className="flex flex-col gap-2 p-3 w-full">
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
            className="inline-flex items-center justify-center text-sm font-medium size-9 shrink-0 rounded-full !text-muted-foreground hover:!bg-white/10"
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
      <div
        data-sidebar="group"
        className="relative flex w-full min-w-0 flex-col p-3"
      >
        <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
          {DashBoardSideBar_navigationItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <li key={index} className="relative">
                <Link
                  className={cn(menuButtonClassnames, {
                    "text-opacity-100 bg-bg-hovering": isActive,
                    "!text-opacity-80": !isActive,
                    "!rounded-full": !isOpen,
                  })}
                  data-state="closed"
                  href={item.path}
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
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <DashBoardSidebarDropdown title="Favorites">
        <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
          {DashBoardSideBar_favoriteContacts.map((contact) => {
            return (
              <li
                key={contact.id}
                data-sidebar="menu-item"
                className="group/menu-item relative"
                tabIndex={0}
              >
                <Link
                  href={`/dashboard/contacts/${contact.id}`}
                  className="peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2.5 text-left outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-9 group-data-[collapsible=icon]:!p-2.5 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-9 text-sm group/fav-item relative hover:bg-bg-hovering"
                >
                  <span className="relative flex overflow-hidden size-4 flex-none shrink-0 rounded-md">
                    <Image
                      className="aspect-square size-full"
                      alt="avatar"
                      src={contact.imageSrc}
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="backface-hidden ml-0.5 truncate text-sm font-normal will-change-transform">
                    {contact.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </DashBoardSidebarDropdown>

      <div className="relative flex w-full min-w-0 flex-col p-3 mt-auto pb-0">
        <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
          {DashBoardSideBar_footerItems.map((item, index) => {
            return (
              <li
                key={index}
                data-sidebar="menu-item"
                className="group/menu-item relative"
              >
                <Button
                  data-sidebar="menu-button"
                  data-size="default"
                  data-active="false"
                  className={`${menuButtonClassnames} !text-muted-foreground`}
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
            );
          })}
        </ul>
      </div>

      {/* User profile section */}
      <div className="w-full p-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              className={cn(
                "flex items-center justify-cente  !px-2.5  !w-full !text-white hover:!bg-bg-hovering",
                {
                  "!rounded-full !p-1": !isOpen,
                }
              )}
              sx={buttonStyles}
            >
              <Avatar
                alt="Name user"
                src="/images/UserImage.jpg"
                className="!h-7 !w-7"
              />
              <span
                className={cn(
                  "truncate text-sm font-medium leading-none whitespace-nowrap transition-all duration-300",
                  {
                    "opacity-0 w-0": !isOpen,
                    "opacity-100 ml-2 w-auto": isOpen,
                  }
                )}
              >
                {user?.name}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 !bg-black !border-border-common p-1 gap-1 flex flex-col">
            <div className="w-full flex flex-col gap-1 text-sm px-2 py-1.5">
              <p className="font-medium text-white">{user?.name}</p>
              <p className=" text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <Divider className="!border-border-common" />

            <div className="w-full flex flex-col text-sm font-medium">
              <Link
                href={"#"}
                className="py-1.5 px-2 hover:bg-bg-hovering rounded-md"
              >
                Profile
              </Link>
              <Link
                href={"#"}
                className="py-1.5 px-2 hover:bg-bg-hovering rounded-md"
              >
                Billing
              </Link>
            </div>
            <Divider className="!border-border-common" />

            <div className="w-full flex flex-col text-sm font-medium capitalize">
              <Link
                href={"#"}
                className="py-1.5 px-2 hover:bg-bg-hovering rounded-md"
              >
                Command menu
              </Link>
              <Link
                href={"#"}
                className="py-1.5 px-2 hover:bg-bg-hovering rounded-md"
              >
                Theme
              </Link>
            </div>

            <Divider className="!border-border-common" />
            <button
              type="button"
              onClick={handleLogout}
              className="py-1.5 px-2 hover:bg-bg-hovering rounded-md text-left font-medium"
            >
              Logout
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
