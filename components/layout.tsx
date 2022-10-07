import { PropsWithChildren } from "react";
import Head from "next/head";
import pkg from "../package.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

export type LayoutProps = {
  pageTitle?: string;
};

export default function Layout({
  children,
  pageTitle,
}: PropsWithChildren<LayoutProps>) {
  const title = `${pageTitle ? pageTitle : "Untitled"} - ${pkg.name}`;
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header className="items-center">
        <div className="navbar bg-neutral text-neutral-content">
          <a className="btn-ghost btn text-xl normal-case">{pkg.name}</a>
        </div>
      </header>
      <section>{children}</section>
      <footer className="footer items-center bg-neutral p-4 text-neutral-content">
        <div className="grid-flow-col items-center">
          <p>
            &copy; {new Date(Date.now()).getFullYear().toString() + " "}
            Perfection
          </p>
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            href="https://discord.gg/z7A4t7sTsK"
            title="Already Gone Discord"
            target="blank"
          >
            <FontAwesomeIcon icon={faDiscord} className="fill-current" />
          </a>
        </div>
      </footer>
    </div>
  );
}
