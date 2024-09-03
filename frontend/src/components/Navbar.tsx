import { EarthIcon, Menu } from "lucide-react";
import { Button } from "./ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-full bg-white">
      <div className="flex justify-between items-center p-3 sm:py-6 mx-auto">
        <div className="flex items-center font-extrabold tracking-tight">
          <EarthIcon className="w-6 h-6 min-[416px]:h-9 min-[416px]:w-9" />
          <span className="text-lg min-[416px]:text-2xl ml-2">GlobeLoom</span>
        </div>

        {/* Menu items for larger screens */}
        <div className="hidden md:flex space-x-8">
          <NavLink title="Features" href="#features" />
          <NavLink title="About" href="#about" />
          <NavLink title="Contact" href="#contact" />
        </div>

        <div className="hidden md:flex">
          <BookTripBtn />
        </div>

        <div className="md:hidden flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="top">
              <div className="grid gap-4 py-4">
                <ul className="flex flex-col items-center gap-4 p-4">
                  <li>
                    <SheetClose asChild>
                      <NavLink
                        title="Features"
                        href="#features"
                        className="text-lg"
                      />
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <NavLink
                        title="About"
                        href="#about"
                        className="text-lg"
                      />
                    </SheetClose>
                  </li>
                  <li>
                    <SheetClose asChild>
                      <NavLink
                        title="Contact"
                        href="#contact"
                        className="text-lg"
                      />
                    </SheetClose>
                  </li>
                </ul>
              </div>
              <SheetFooter className="flex items-center justify-center sm:justify-center">
                <SheetClose asChild>
                  <BookTripBtn />
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

const BookTripBtn = () => {
  return (
    <Button size="lg" className="rounded-full w-32 text-[16px]">
      Book Trip
    </Button>
  );
};

type NavLinkProps = { title: string; href: string; className?: string };

const NavLink = ({ title, href, className = "" }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={cn(
        "hover:text-black/75 transition duration-300 text-xl font-normal",
        className
      )}
    >
      {title}
    </a>
  );
};
