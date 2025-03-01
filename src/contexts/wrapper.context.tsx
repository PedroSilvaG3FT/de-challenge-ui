import React, { createContext } from "react";
import { AuthProvider } from "./auth.context";
import { ThemeProvider } from "./theme.context";
import { DayPickerProvider } from "react-day-picker";
import { EThemeType } from "@/modules/@shared/enums/theme.enum";

interface IWrapperProviderProps {
  children: React.ReactNode;
}

const WrapperContext = createContext({});

const WrapperProvider: React.FC<IWrapperProviderProps> = ({ children }) => {
  return (
    <WrapperContext.Provider value={{}}>
      <DayPickerProvider initialProps={{}}>
        <AuthProvider>
          <ThemeProvider defaultTheme={EThemeType.light}>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </DayPickerProvider>
    </WrapperContext.Provider>
  );
};

export { WrapperContext, WrapperProvider };
