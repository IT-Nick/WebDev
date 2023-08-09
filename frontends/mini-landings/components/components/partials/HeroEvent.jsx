import React, { useState } from "react";
import Image from "next/image";

const HeroEvent = () => {
  return (
      <div className="flex flex-row">
        <div className="hidden w-1/2 md:block">
          <Image src="/event1.jpg" alt="" width={500} height={500} />
        </div>
        <div className="p-4 text-center">
          <h1
            className="animate-pulse md:animate-none leading-tighter mb-4 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-6xl font-extrabold tracking-tighter text-transparent md:text-6xl"
            data-aos="zoom-y-out"
          >
            Твое крутое резюме начинается здесь

          </h1>
           <form className="mt-20">
            <label
              for="search"
              class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  class="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="search"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Найти мероприятие"
                required
              ></input>
              <button
                type="submit"
                class="absolute right-2.5 bottom-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Найти
              </button>
            </div>
          </form> 
        </div>

        <div className="hidden w-1/2 md:block">
          <Image src="/event2.jpg" alt="" width={500} height={500} />
        </div>
      </div>
  );
};

export default HeroEvent;
