"use client";

import React, { useState } from 'react';

export default function SignUp() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://auth-service.example.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        window.location.href = 'http://general-page.example.com'; // Пример перенаправления после регистрации
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      setError('Произошла ошибка при регистрации. Пожалуйста, попробуйте ещё раз.');
    }
  };

  return (
    <section className="grid h-screen place-content-center bg-slate-900 text-slate-300">
      <div className="mb-10 text-center text-indigo-400">
        <h1 className="text-3xl font-bold tracking-widest">team.mpei.ru</h1>
        <p>
          <span className="font-bold">Регистрация</span> в{' '}
          <span className="font-bold">Системе</span> сборной.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-6">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Логин"
          className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          className="w-80 appearance-none rounded-full border-0 bg-slate-800/50 p-2 px-4 focus:bg-slate-800 focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleSignUp}
          className="rounded-full bg-indigo-500 p-2 px-4 text-white hover:bg-orange-500"
        >
          Зарегистрироваться
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>
    </section>
  );
}