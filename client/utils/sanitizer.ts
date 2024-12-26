import { Primitive } from "type-fest";

export const pathParamSanitizer = (
  path: string,
  params: GenericObj<Primitive> | undefined,
  identifier: "{}" | ":" = ":",
) => {
  return Object.entries(params || {}).reduce(
    // eslint-disable-next-line no-return-assign
    (acc, [key, value]) =>
      // eslint-disable-next-line no-param-reassign,no-return-assign
      (acc = acc.replace(identifier === "{}" ? `{${key}}` : `:${key}`, String(value))),
    path,
  );
};