import type { MetaFunction } from "@remix-run/node";
import { Logo } from "~/components";
import { useEffect, useRef, useState } from "react";
import { NavList } from "~/components/navigation";
import { RxHamburgerMenu } from "react-icons/rx";

export const meta: MetaFunction = () => {
  return [
    { title: "IIAS" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const nav_ele = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let click = (e: any) => {
      if (nav_ele.current && !nav_ele.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    addEventListener("click", click, true);

    return () => {
      removeEventListener("click", click, true);
    };
  }, []);

  useEffect(() => {
    let drag = (e: any) => {
      setIsOpen(false);
    };
    window.addEventListener("resize", drag, true);
    return () => {
      removeEventListener("drag", drag);
    };
  }, []);

  return (
    <>
      <section className="flex h-14 w-full bg-slate-800 items-center justify-center">
        <div className="w-10/12 flex items-center justify-between text-gray-100 text-xs sm:text-sm lg:text-base">
          <p className="">
            Special welcome gift. Get 30% off your first purchase with code
            “Eduma”.<a href="#">Find out more!</a>
          </p>
          <p className="hidden md:block">register / login</p>
        </div>
      </section>
      <header className="w-full shadow-lg flex justify-center">
        <div className="w-10/12 flex justify-between">
          <Logo />
          {isOpen && (
            <h1 className="absolute top-0 left-0 w-dvw h-dvh bg-black bg-opacity-10 backdrop-blur-sm z-40"></h1>
          )}
          <div
            ref={nav_ele}
            className={`h-dvh ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:w-auto transition-all md:-translate-x-0 bg-white md:bg-transparent md:h-auto absolute md:relative left-0 md:left-auto top-0 md:top-auto overflow-hidden md:overflow-visible z-50`}
          >
            <NavList
              data={[
                { title: "about us", to: "/about" },
                {
                  title: "courses",
                  to: "/courses",
                },
                {
                  title: "courses",
                  to: "/courses",
                  sub_nav: [
                    {
                      title: "java master class",
                    },
                    {
                      title: "Selenium java for begineors",
                    },
                    {
                      title: "10 - days of java",
                    },
                  ],
                },
              ]}
            />
          </div>
          <div className="flex items-center">
            <button className="hidden md:block bg-orange-500 capitalize px-6 py-3 rounded-md text-gray-100">
              register Course
            </button>
            <button
              className="md:hidden"
              onClick={() => setIsOpen((st) => !st)}
            >
              <RxHamburgerMenu size={35} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
