import { RegisterOptions } from "react-hook-form"

interface GetValidation {
  name: string
  type?: "string" | "number"
  min?: number
  max?: number
  req?: boolean
}

export const getValidation = ({
  max,
  min,
  type = "string",
  name,
  req = true,
}: GetValidation) => {
  const itemType = type === "string" ? "characters" : "digits"
  return {
    required: req ? `${name} required` : undefined,
    minLength: min
      ? {
          value: min,
          message: `${name} cannot be less than ${min} ${itemType}`,
        }
      : undefined,
    maxLength: max
      ? {
          value: max,
          message: `${name} cannot be more than ${max} ${itemType}`,
        }
      : undefined,
  } as RegisterOptions
}
export const validPhone = {
  ...getValidation({
    name: "phone",
    type: "number",
    min: 9,
    max: 15,
    req: false,
  }),
  pattern: {
    value: /\d{9,15}/,
    message: "please enter valid phone",
  },
}
