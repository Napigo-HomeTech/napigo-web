import joi from "joi";

export const SignInFormSchema = joi.object({
    "signin-email": joi.string().ruleset.email({ tlds: false }).rule({}).required().messages({
        "string.empty": "Email is required",
        "string.email": "Email is invalid",
    }),
    "signin-password": joi
        .string()
        .ruleset.min(6)
        .rule({ message: "Please provide a valid password" })
        .required()
        .messages({ "string.empty": "Password is required" }),
});
