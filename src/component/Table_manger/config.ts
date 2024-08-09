import { State } from "./types";

export const initialState: State = {
  // input: "",
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
  set_yes: false,
  set_no: false,
};

export const items = [
  {id:1, label: "Vitamin A", value: "vitamin A"},
  {id:2, label: "Vitamin B", value: "vitamin B"},
  {id:3, label: "Vitamin C", value: "vitamin C"},
  {id:4, label: "Vitamin D", value: "vitamin D"},
  {id:5, label: "Vitamin E", value: "vitamin E"}, 
];
