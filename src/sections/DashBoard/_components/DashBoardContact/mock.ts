import { Contact } from "@/types/contact/contact.type";

// Mock data for demonstration
export const mock_Contacts: Contact[] = [
  {
    id: "0776ae41-7f9f-4783-bbd8-72a4bf5b91cc",
    name: "Vivian Casey",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/0776ae41-7f9f-4783-bbd8-72a4bf5b91cc",
    visitCount: 1,
  },
  {
    id: "29ff3088-114b-4709-bacc-581f29438f71",
    name: "Mei Ling Chen",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/29ff3088-114b-4709-bacc-581f29438f71",
    visitCount: 1,
  },
  {
    id: "acde96ef-b560-4ba3-8cf8-ec3c66791ad5",
    name: "Uber",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/acde96ef-b560-4ba3-8cf8-ec3c66791ad5",
    visitCount: 1,
    isCompany: true,
  },
  {
    id: "4c86a6cd-0325-4bcf-ab1f-40b6f22e6beb",
    name: "Google",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/4c86a6cd-0325-4bcf-ab1f-40b6f22e6beb",
    visitCount: 0,
    isCompany: true,
  },
  {
    id: "646e6bdd-f29d-407b-86f4-d61821cec4ea",
    name: "Gabriel Fischer",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/646e6bdd-f29d-407b-86f4-d61821cec4ea",
    visitCount: 0,
  },
  {
    id: "896a4c26-412a-4631-ab79-9e6d053e0e44",
    name: "Slack",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/896a4c26-412a-4631-ab79-9e6d053e0e44",
    visitCount: 0,
    isCompany: true,
  },
];

export const mock_leastVisitedContacts: Contact[] = [
  {
    id: "f66618bb-2243-4d14-bc20-c7281d51a222",
    name: "Marie Jones",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/f66618bb-2243-4d14-bc20-c7281d51a222",
    visitCount: 0,
  },
  {
    id: "2d9bbc19-8362-4e94-bfd0-ea03cd9eb784",
    name: "Spotify",
    imageUrl:
      "https://demo.achromatic.dev/api/contact-images/2d9bbc19-8362-4e94-bfd0-ea03cd9eb784",
    visitCount: 0,
    isCompany: true,
  },
  // Add other least visited contacts from your data
];
