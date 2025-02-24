"use client";

import Image from "next/image";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  return (
    <>
     

      {/* Lottie animace */}
      <div className="flex flex-col justify-center items-center h-screen">
        <Player
          autoplay
          loop
          src="/fox.json"
          style={{ height: "300px", width: "300px" }}
        />
        <div className="">

           <a href="/dashboard" className="text-xl font-bold  underline">
            Dashboard
          </a>
        </div>
      </div>
    </>
  );
}