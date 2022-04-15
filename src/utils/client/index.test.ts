import { groupBy } from "."

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
  ]
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
  })
})
