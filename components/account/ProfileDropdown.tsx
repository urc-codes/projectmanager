import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const user = {
  fullName: "Joel Senyo",
  indexNumber: "UEB1104722",
  referenceNumber: "UA2208846",
  program: "BSc. Computer Engineering",
  email: "ahadzijoelsenyo@gmail.com",
};

const ProfileDropdown = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative font-sans" ref={ref}>
      <button
        className="flex items-center gap-3 pl-2 rounded-full hover:bg-neutral-50 transition-colors p-1 pr-3"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <div className="h-9 w-9 bg-neutral-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-bold text-neutral-700">JD</span>
        </div>
        <ChevronDown size={16} className="text-neutral-300" />
      </button>
      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg z-50 min-w-87.5 max-w-xs border p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-base font-medium text-neutral-900">
              Account Details
            </span>
            <button
              aria-label="Close"
              className="text-neutral-500"
              onClick={() => setOpen(false)}
            >
              <span style={{ fontSize: "1.3rem" }}>&times;</span>
            </button>
          </div>
          <div className="space-y-2 mb-5">
            <div className="text-xs text-neutral-300 uppercase font-medium">
              FULL NAME
            </div>
            <div className="font-medium text-neutral-800">{user.fullName}</div>
            <div className="text-xs text-neutral-300 uppercase font-medium mt-3">
              INDEX NUMBER
            </div>
            <div className="text-neutral-800  text-sm">
              {user.indexNumber}
            </div>
            <div className="text-xs text-neutral-300 uppercase font-medium mt-3">
              REFERENCE NUMBER
            </div>
            <div className="text-neutral-800  text-sm">
              {user.referenceNumber}
            </div>
            <div className="text-xs text-neutral-300 uppercase font-medium mt-3">
              PROGRAM
            </div>
            <div className="text-neutral-800">{user.program}</div>
            <div className="text-xs text-neutral-300 uppercase font-medium mt-3">
              EMAIL
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-800">{user.email}</span>
              <span className="text-xs text-blue-600 cursor-pointer">Edit</span>
            </div>
          </div>
          <hr className="my-3" />
          <button
            onClick={() => {
              document.cookie =
                "proj_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
              window.location.href = "/login";
            }}
            className="text-red-500 px-2 py-2 w-full text-left hover:text-red-600 text-sm"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
