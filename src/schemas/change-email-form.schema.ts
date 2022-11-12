import joi from "joi";

export const ChangeEmailFormSchema = joi.object({
  "new-email": joi
    .string()
    .ruleset.email({ tlds: false })
    .rule({})
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Email is invalid",
    }),
  "current-password": joi.string().required().messages({
    "string.empty": "Password is required to authenticate",
  }),
});
