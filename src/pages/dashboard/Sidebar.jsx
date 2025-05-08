import NewDocumentButton from "@/components/dashboard/NewDocumentButton";
import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Blog from "./Blog";
import { useBlog } from "@/components/context/BlogContext";

export default function Sidebar() {
  const { blogs } = useBlog();

  // const [selectedBlog, setSelectedBlog] = useState([]);

  const menuOptions = (
    <>
      <NewDocumentButton />

      {blogs.length === 0 ? (
        <>
          <h2 className="text-sm text-gray-500 font-semibold">
            No Documents found
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-md text-gray-500 font-semibold pl-2 pt-2">
            My Documents
          </h2>
          <div className="flex flex-col gap-4 mt-2">
            {blogs.map((blog) => (
              <Blog data={blog} key={blog._id} />
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="bg-gray-200 pt-2 md:p-4 relative flex flex-col ">
      <div className="md:hidden cursor-pointer">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-center md:text-left">Menu</SheetTitle>
              <div className="text-center">{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
