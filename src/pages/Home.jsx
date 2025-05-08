import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="mx-16 pt-2 flex-grow">
        <div className="flex justify-between pb-5 ">
          <div className="text-3xl font-semibold">Blogipsum</div>
          <div className="flex gap-5">
            <div>
              <Link to="/login">
                <Button size="lg" className="text-md cursor-pointer">
                  Login
                </Button>
              </Link>
            </div>
            <div>
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-md cursor-pointer"
                >
                  Signup
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white text-black flex flex-col justify-center items-center px-6 py-28 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to My Blog</h1>
          <p className="text-xl mb-8 max-w-xl text-gray-700">
            Dive into a world of thoughts, stories, tutorials, and inspiration.
            Let's explore ideas and technology together.
          </p>
          <div className="flex gap-4">
            <Button size="lg" className="text-md cursor-pointer">
              Explore Blogs
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="text-md cursor-pointer"
            >
              Join in Now
            </Button>
          </div>
        </div>
      </div>

      {/* Footer always at the bottom */}
      <footer className="text-center text-sm text-gray-500 py-6 border-t border-gray-200">
        © {new Date().getFullYear()} Suprodip Bhattacharjee. All rights
        reserved.
      </footer>
    </div>
  );
};

export default Home;
