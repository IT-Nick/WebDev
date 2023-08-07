import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import Image from "next/image";

function Logo() {
  return (
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <div className="flex items-center font-display text-2xl">
            <Image
              src="/favicon.svg"
              alt="Team logo"
              width="50"
              height="50"
              className="mr-2 hover:animate-spin animate-pulse"
            ></Image>
            <div className="flex flex-col">
              <p className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-400">ИНТЕЛЛЕКТУАЛЬНАЯ</p>
              <p className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-red-500">СБОРНАЯ МЭИ</p>
            </div>
          </div>
        </div>
  );
}

const config: DocsThemeConfig = {
  logo: <Logo />,
  chat: {
    link: 'https://discord.com',
  },
  footer: {
    text: 'МЭИ. Документация к сборной',
  },
  search: {
    placeholder: 'Найти документацию',
  },
  toc: {
    title: 'На этой странице',
  },
  editLink: {
    text: "",
  },
  feedback: {
    content: "",
  },
  themeSwitch: {
    useOptions() {
      return {
        light: 'Светлая',
        dark: 'Темная',
        system: 'Система'
      }
    }
  }
}

export default config
