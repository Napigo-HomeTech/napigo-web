import joi from "joi";

export const ChangePasswordFormSchema = joi.object({
  "old-password": joi.string().required().messages({
    "string.empty": "Current password is required",
  }),
  "new-password": joi
    .string()
    .ruleset.min(6)
    .rule({ message: "Please provide a valid password" })
    .required()
    .messages({ "string.empty": "New Password is required" }),
});
