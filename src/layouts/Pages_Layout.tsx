import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export default function PagesLayout({ children, className }: Props) {
  return (
    <div className={cn(``, className)}>
      {/* <PageLayoutHeader >
        <h1>{title}</h1>
      </PageLayoutHeader> */}
      {/* ======= */}
      {children}
      {/* <div className={cn(`page-outer`,className)}>
    {children}
      </div> */}
    </div>
  );
}

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageLayoutHeader({ children, className }: HeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between sm:p-4 p-2", className)}
    >
      {children}
    </div>
  );
}

type ContentProps = {
  children: React.ReactNode;
  className?: string;
  title?: string;
};

export function PagesLayoutContent({ children, className }: ContentProps) {
  return (
    <div>
      <div className={cn(`page-outer`, className)}>{children}</div>
    </div>
  );
}
