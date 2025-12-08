import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface ActiveLinkProps {
  href: string;
  name: string;
}

const ActiveLink: FC<ActiveLinkProps> = ({ href, name }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "block py-2 px-4 transition-all border-b-2 border-b-transparent hover:scale-105",
        isActive && "font-semibold text-yellow-500 border-yellow-500!"
      )}
    >
      {name}
    </Link>
  );
};

export default ActiveLink;
