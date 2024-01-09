import { createContext, useState } from 'react';

export const LoadingContext = createContext();

const LoadingContextProvider = ({ children }) => {
  const [loadingState, setIsLoadingState] = useState(false);

  return (
    <LoadingContext.Provider value={{ loadingState, setIsLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
