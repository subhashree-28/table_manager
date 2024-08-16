import { State } from "./types";

export const headers = [
  " ",
  "Id",
  "Name",
  "Description",
  "Link",
  "Should Cook",
  "Nutritions",
  "Max. Intake per day",
  "Action",
];

export const initialState: State = {
  // input: "",
  data: [
    {
      id: 1,
      name: "Potato",
      description: "It is healthy and highly carbohydrated",
      link: "https://en.wikipedia.org/wiki/potato#Nutrition",
      should_cook: "Yes",
      nutritions: ["Vitamin C, Vitamin D, Vitamin B6"],
      max_intake: "250g",
      completed: false,
    },
  ],
  name: "",
  description: "",
  link: "",
  should_cook: "",
  nutritions: [],
  max_intake: "",
  selectedNutrition: [],
  display: false,
  completed: false,
  filteredItem: [],
  selectedItems: [],
  log: false,
  delete: false,
  set_yes: false,
  set_no: false,
  add: false,
};

export const items = [
  { id: 1, label: "Vitamin A", value: "vitamin-a" },
  { id: 2, label: "Vitamin B", value: "vitamin-b" },
  { id: 3, label: "Vitamin C", value: "vitamin-c" },
  { id: 4, label: "Vitamin D", value: "vitamin-d" },
  { id: 5, label: "Vitamin E", value: "vitamin-e" },
];

export const item = [
  { id: 1, label: "Yes", value: "yes" },
  { id: 2, label: "No", value: "no" }
];
