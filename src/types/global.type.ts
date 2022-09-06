/**
 *
 */
export type GeneralObject = { [k: string]: string };

/**
 *
 */
export type LoadStatus = "idle" | "loading" | "onerror" | "onsuccess";

/**
 * Only this is not a type but being declare
 * for use on Component that enforce props to have a default
 * function implementation - typescript rules
 */
export const DefaultCallback = () => "default callback";
