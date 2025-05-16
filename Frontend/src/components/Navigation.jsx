import { routes } from "@/App";
import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NavigationComponent = ({ name, path }) => {
  return (
    <NavigationMenu className={"space-x-2"}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to={path}>
            <NavigationMenuLink className={"text-white"}>
              {name}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default function Navigation() {
  const param = window.location.pathname;
  const filterRoute = routes.filter((item) => item.name !== "Home");

  return (
    <nav
      className={`fixed z-40 top-0 w-full flex justify-center ${
        param !== "/" ? "bg-gray-800" : "bg-transparent"
      }`}
    >
      <ul className="grid grid-cols-2 py-4">
        <Link to={"/"}>
          <h1 className="text-lg font-bold text-white">Navigasi</h1>
        </Link>
        <div className="flex">
          {filterRoute.map((item, index) => (
            <NavigationComponent
              key={index}
              name={item.name}
              path={item.path}
            />
          ))}
        </div>
      </ul>
    </nav>
  );
}
