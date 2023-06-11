import { groupBy, groupByTime, unGroup } from ".";
import { expect } from "@jest/globals";

test("groupBy", () => {
  const arr1 = [
    {
      cat: "Fruits",
      name: "Tomato",
    },
    {
      cat: "Veg",
      name: "brinjal",
    },
    {
      cat: "Non veg",
      name: "Chicken",
    },
  ];
  expect(groupBy(arr1, "cat")).toEqual({
    Fruits: [
      {
        cat: "Fruits",
        name: "Tomato",
      },
    ],
    Veg: [
      {
        cat: "Veg",
        name: "brinjal",
      },
    ],
    "Non veg": [
      {
        cat: "Non veg",
        name: "Chicken",
      },
    ],
  });
});

test("timeLine", () => {
  const arr2 = [
    {
      cat: "Veg",
      name: "brinjal",
      date: new Date("Mar 03,20"),
    },
    {
      cat: "Fruits",
      name: "Tomato",
      date: new Date("Jan 03,20"),
    },
    {
      cat: "Non veg",
      name: "Chicken",
      date: new Date("Aug 03,20"),
    },
  ];
  expect(groupByTime(arr2, "date", "month")).toEqual({
    "August 2020": [
      {
        cat: "Non veg",
        name: "Chicken",
        date: new Date("Aug 03,20"),
      },
    ],
    "March 2020": [
      {
        cat: "Veg",
        name: "brinjal",
        date: new Date("Mar 03,20"),
      },
    ],
    "January 2020": [
      {
        cat: "Fruits",
        name: "Tomato",
        date: new Date("Jan 03,20"),
      },
    ],
  });
});

test("unGroup", () => {
  const arr3 = {
    one: [1, 2],
    two: [3, 4],
  };
  expect(unGroup(arr3)).toEqual([1, 2, 3, 4]);
});
