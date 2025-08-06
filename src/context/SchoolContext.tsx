"use client";
import { School } from "@/types/entities";
import { createContext, useState, useCallback } from "react";

type SchoolContextType = {
  school: School | null;
  login: (schoolID: string) => void;
  logout: () => void;
};

const SchoolContext = createContext<SchoolContextType | null>(null);

export function SchoolProvider({ children }: { children: React.ReactNode }) {
  const [school, setSchool] = useState<School | null>(null);

  const login = useCallback((schoolID: string) => {
    setSchool({ id: schoolID, name: "Demo School" } as School);
  }, []);

  const logout = useCallback(() => {
    setSchool(null);
  }, []);

  return (
    <SchoolContext.Provider value={{ school, login, logout }}>
      {children}
    </SchoolContext.Provider>
  );
}

export default SchoolContext;
