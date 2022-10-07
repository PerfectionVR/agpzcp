import { FC, PropsWithChildren } from "react";

const Layout: FC<PropsWithChildren> = ({ children }: PropsWithChildren) => (
  <div>{children}</div>
);

export default Layout;
