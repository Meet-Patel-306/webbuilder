"use client";

import { Agency, User } from "@/generated/prisma";
import React, { createContext, useContext, useEffect, useState } from "react";

// provider interface
interface ModelProviderProp {
  children: React.ReactNode;
}

// model data type
export type ModelData = {
  user?: User;
  agency?: Agency;
};

// model cobtext type
export type ModelContextType = {
  data: ModelData;
  isOpen: boolean;
  setOpen: (model: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
};

export const ModelContext = createContext<ModelContextType>({
  data: {},
  isOpen: false,
  setOpen: (model: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
});

export const ModelProvider = ({ children }: ModelProviderProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<ModelData>({});
  const [showingModel, setShowingModel] = useState<React.ReactNode>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const setOpen: ModelContextType["setOpen"] = async (model, fetchData) => {
    if (model) {
      if (fetchData) {
        const newData = await fetchData();
        setData({ ...data, ...newData });
      }
      setShowingModel(model);
      setIsOpen(true);
    }
  };
  const setClose: ModelContextType["setClose"] = () => {
    setIsOpen(false);
    setData({});
  };

  if (!isMounted) return null;

  return (
    <ModelContext.Provider value={{ data, setClose, setOpen, isOpen }}>
      {children}
      {showingModel}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within the model provider.");
  }
  return context;
};
