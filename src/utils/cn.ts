export const cn = (args: (string | false)[]): string => {
  return args.reduce((result, className) => typeof (className) !== "string" ? result : result += ' ' + className, "") as string
}