"use client";
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface LoadingContextProps {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const defaultContextData: LoadingContextProps = {
  loading: true,
  setLoading: () => {},
};

const LoadingContext = createContext<LoadingContextProps>(defaultContextData);

export const useLoading = (): LoadingContextProps => {
  return useContext(LoadingContext);
};

interface LoadingProviderProps {
  children: ReactNode;
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }: LoadingProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
