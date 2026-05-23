import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="site-grid theme-transition min-h-screen text-text">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-8rem)] max-w-[1360px] px-5 py-7 md:py-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
