import { Outlet } from "react-router-dom";

export default function AdminSite() {
  return (
    <div className="flex justify-center">
      <Outlet />
    </div>
  );
}
