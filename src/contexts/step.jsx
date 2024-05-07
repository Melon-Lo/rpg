import { useState, createContext } from "react";

export const StepContext = createContext();

export default function StepContextProvider({ children }) {
  const [currentStep, setCurrentStep] = useState('主頁');

  return (
    <StepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </StepContext.Provider>
  )
}