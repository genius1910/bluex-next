import { ReactNode } from "react";

export default function ConsoleLog({ children }: { children: ReactNode }) {
  console.log(children);
  return false;
};
