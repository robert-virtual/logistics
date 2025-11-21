import type { Route } from "./+types/home";
import { Outlet } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Logistics" },
    { name: "description", content: "Application for logistecs" },
  ];
}

export default function Home() {
  return <>
    <h2>Menu</h2> 
    <hr />
    <Outlet/>
  </>
}
