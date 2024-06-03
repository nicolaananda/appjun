import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";
import Avatar from "boring-avatars";

export const Header = () => {
  const { user, handleLogout } = useAuth({});
  const [searchKey, setSearchKey] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = format(now, "HH:mm");
      setCurrentTime(formattedTime);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const searchBooks = async () => {
      if (searchKey) {
        navigate(`/?search=${searchKey}`);
      } else if (
        location.pathname === "/" ||
        location.pathname.startsWith("/?search=")
      ) {
        navigate(`/`);
      }
    };

    const timeoutId = setTimeout(() => {
      searchBooks();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchKey, navigate, location.pathname]);

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md border-b border-gray-200">
      <div
        className="font-bold text-xl text-gray-800 cursor-pointer"
        onClick={() => navigate("/")}
      >
        pinjamkanbuku.
      </div>
      <div className="flex items-center">
        <Input
          placeholder={`${currentTime}, Search book ... `}
          onChange={(e) => setSearchKey(e.target.value)}
          value={searchKey}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      {user ? (
        <div className="relative flex items-center gap-4">
          <Avatar variant="beam" name={user.name} size={30} />

          <div className="font-semibold">{user.name}</div>
          <Button size={"sm"} variant={"outline"} onClick={toggleDropdown}>
            <div className="flex items-center">Menu</div>
          </Button>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="py-2 my-2 p-2 absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
              style={{ top: "100%", left: "auto" }}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Profile
              </Link>
              <Link
                to="/add-book"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Add Book
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link to="/login">
            <div className="text-gray-600 cursor-pointer hover:text-gray-800">
              Login
            </div>
          </Link>
          <Link to="/register">
            <Button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
};
