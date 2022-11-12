import joi from "joi";

export const RegisterFormSchema = joi.object({
  "register-email": joi
    .string()
    .ruleset.email({ tlds: false })
    .rule({})
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  "register-password": joi
    .string()
    .ruleset.min(6)
    .rule({ message: "Please provide a valid password" })
    .required()
    .messages({ "string.empty": "Password is required" }),
  "register-username": joi.optional(),
});
