import { dashboardPaths } from "@/constants/path";
import { toast } from "sonner";

export const DashBoardSideBar_favoriteContacts = [
  {
    id: "5ff2aa98-9370-462f-bb28-62d8ffc80af1",
    name: "Airbnb",
    imageSrc:
      "https://demo.achromatic.dev/api/contact-images/5ff2aa98-9370-462f-bb28-62d8ffc80af1?v=51bbe674c4608776218704a0bdc00a18082affe42b946db6d3c80cb579f1829e",
  },
  {
    id: "4c86a6cd-0325-4bcf-ab1f-40b6f22e6beb",
    name: "Google",
    imageSrc:
      "https://demo.achromatic.dev/api/contact-images/4c86a6cd-0325-4bcf-ab1f-40b6f22e6beb?v=c6baedbc608cec1692c40b3b15c5f3bb557a51fcbe0bc07140807fac7d03075a",
  },
  {
    id: "a00a72e8-7df7-4a00-940a-a1439093030e",
    name: "Microsoft",
    imageSrc:
      "https://demo.achromatic.dev/api/contact-images/a00a72e8-7df7-4a00-940a-a1439093030e?v=a1fab8fc3cf9fb9554b6d0fcab8236be7a22ceadec82ce0704cf79d3973c1139",
  },
];

export const DashBoardSideBar_navigationItems = [
  {
    name: "Home",
    icon: (
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
        className="lucide lucide-house size-4 shrink-0 text-muted-foreground"
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      </svg>
    ),
    path: dashboardPaths.home,
    textClass: "!text-muted-foreground",
  },
  {
    name: "Contacts",
    icon: (
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
        className="lucide lucide-users size-4 shrink-0 text-muted-foreground"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    path: "",
    textClass: "!text-muted-foreground",
  },
  {
    name: "Settings",
    icon: (
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
        className="lucide lucide-settings size-4 shrink-0 text-muted-foreground"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    ),
    path: "",
    textClass: "!text-muted-foreground",
  },
];

export const DashBoardSideBar_footerItems = [
  {
    name: "Invite member",
    icon: (
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
        className="lucide lucide-plus size-4 shrink-0"
      >
        <path d="M5 12h14"></path>
        <path d="M12 5v14"></path>
      </svg>
    ),
    action: () => toast.success("Invite member clicked"),
  },
  {
    name: "Feedback",
    icon: (
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
        className="lucide lucide-message-circle size-4 shrink-0"
      >
        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"></path>
      </svg>
    ),
    action: () => toast.success("Feedback clicked"),
  },
];
