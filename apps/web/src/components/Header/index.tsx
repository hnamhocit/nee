"use client";

import { Button, Input } from "@heroui/react";
import {
  UserIcon,
  ShoppingCartSimpleIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from "@phosphor-icons/react";

import Notification from "./Notification";
import ActiveLink from "./ActiveLink";

const pages = [
  {
    name: "Home",
    href: "/",
  },

  {
    name: "About",
    href: "/about",
  },

  {
    name: "Contact",
    href: "/contact",
  },
];

const Header = () => {
  return (
    <header className="sticky top-0 left-0 w-full z-20 border-b-2 border-slate-200 bg-white">
      <Notification />

      <div className="container mx-auto py-8 flex items-center justify-between">
        <div className="flex items-center gap-3 text-3xl font-bold font-serif">
          Nee
        </div>

        <div className="flex items-center gap-12">
          {pages.map((page) => (
            <ActiveLink key={page.href} href={page.href} name={page.name} />
          ))}
        </div>

        <div className="flex items-center gap-7">
          <Input
            placeholder="What are you looking for?"
            endContent={<MagnifyingGlassIcon size={24} />}
          />

          <Button isIconOnly variant="light">
            <BellIcon size={24} />
          </Button>

          <Button isIconOnly variant="light">
            <ShoppingCartSimpleIcon size={24} />
          </Button>

          <Button isIconOnly variant="light">
            <UserIcon size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
