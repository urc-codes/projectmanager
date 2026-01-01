"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function fakeAuthenticate(index: string, ref: string) {
  return (
    (index === "UEB123456" && ref === "UA2203382") 
  );
}

const LoginPage = () => {
  const [index, setIndex] = useState("");
  const [ref, setRef] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!index.trim() || !ref.trim()) {
      setError("All fields required");
      return;
    }
    if (!fakeAuthenticate(index, ref)) {
      setError("Invalid credentials");
      return;
    }
    document.cookie = `proj_auth_token=1; path=/; SameSite=Lax`;
    const next = searchParams?.get("next") || "/dashboard";
    router.replace(next);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-sans bg-white">
      <div>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-neutral-900 text-start">
            Project Management System
          </h1>
          <p className="text-neutral-500 font-light ">
            Sign in with your student credentials
          </p>
        </div>
        <form onSubmit={handleLogin} className="w-full max-w-md ">
          <div className="mb-4">
            <label className="text-sm block mb-1 text-neutral-700">
              Index number
            </label>
            <input
              className="w-full input px-3 py-2 rounded border border-neutral-300 bg-neutral-50 outline-none focus:border-black"
              placeholder="UEB123456"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              autoFocus
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-sm block mb-1 text-neutral-700">
              Ref number
            </label>
            <input
              className="w-full input px-3 py-2 rounded border border-neutral-300 bg-neutral-50 outline-none focus:border-black"
              placeholder="UA2203382"
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="mb-4 p-2 text-sm rounded bg-red-100 text-red-600">
              {error}
            </div>
          )}
          <button
            className="w-full bg-black rounded-lg p-2 mt-2 text-white font-medium"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
