import { State } from "./types";

export const initialState: State = {
  input: "",
  data: [
    {
      id: 1,
      Name: "Potato",
      Description: "It is healthy and highly carbohydrated",
      Link: "https://en.wikipedia.org/wiki/potato#Nutrition",
      Should_Cook: "Yes",
      Nutritions: ["Vitamin C, Vitamin D, Vitamin B6"],
      Max_Intake_per_day: "250g",
      completed: false,
    },
  ],
  Name: "",
  Description: "",
  Link: "",
  Should_Cook: "",
  Nutritions: [],
  Max_Intake_per_day: "",
  selectedNutrition: [],
  display: false,
  completed: false,
  filteredItem: [],
  selectedItems: [],
  log: false,
  delete: false,
};

export const items = [
  { value: "vitamin A" },
  { value: "vitamin B" },
  { value: "vitamin C" },
  { value: "vitamin D" },
  { value: "vitamin E" },
];
