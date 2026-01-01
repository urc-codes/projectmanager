import { Cpu, ArrowRight } from "lucide-react";
import { uenrlogo } from "@/public/images";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black font-sans selection:bg-blue-100">
      <header className="flex items-center justify-between px-6 py-5 border-b-2 border-black/30">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white p-2.5 flex items-center justify-center">
            <Cpu size={28} strokeWidth={1.5} />
          </div>
          <div className="flex flex-col leading-none space-y-1">
            <span className="font-bold text-xs uppercase tracking-[0.15em]">
              Department of
            </span>
            <span className="font-bold text-sm uppercase tracking-widest text-blue-700">
              Computer & Electrical Engineering
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-7/12 p-10 lg:p-20 flex flex-col justify-center items-start relative">
          <div className="absolute top-0 left-10 h-20 w-0.5 bg-black hidden lg:block"></div>

          <h1 className="text-6xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">
            STUDENT
            <br />
            PROJECT
            <br />
            <span
              className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-blue-900"
              style={{ WebkitTextStroke: "2px black" }}
            >
              SUBMISSION
            </span>
          </h1>

          <p className="text-lg font-medium max-w-md mb-12 leading-relaxed text-neutral-800 border-l-4 border-blue-600 pl-6">
            The official portal for capstone documentation, thesis archives, and
            peer review cycles.
          </p>

          <button className="group relative px-10 py-5 bg-black text-white text-lg font-bold tracking-wide overflow-hidden duration-0 cursor-pointer">
            <Link
              href="/login"
              className="inline-flex items-center justify-center "
            >
              <span>LOGIN TO PORTAL</span>
              <ArrowRight className="ml-4 w-5 h-5 group-hover:translate-x-2 transition-transform duration-200" />
            </Link>
          </button>
        </div>

        <div className="w-full lg:w-5/12 bg-blue-50 border-t-2 lg:border-t-0 lg:border-l-2 border-black/30 flex items-center justify-center relative p-10">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          ></div>

          <Image src={uenrlogo} alt="URC Logo" width={200} height={200} />
        </div>
      </main>

      <footer className="border-t border-black/30 bg-white px-6 py-4 flex flex-col md:flex-row justify-between items-center text-xs font-bold font-mono uppercase tracking-widest">
        <div className="mt-2 md:mt-0 flex items-center gap-2">
          <span className="ml-4 bg-black text-white px-2 py-0.5">
            CREATED BY URC
          </span>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
