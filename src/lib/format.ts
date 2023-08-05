export const formatBlogDate = (input: string) => {
  const date = new Date(input);
  const month = date.toLocaleString("en-US", { month: "long" }).substring(0, 3);
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  return `${month} ${day < 10 ? `0${day}` : day}, ${year}`;
};

export const formatClassSpacePrefix = (input: string | null | undefined) => {
  return input ? ` ${input}` : "";
};
