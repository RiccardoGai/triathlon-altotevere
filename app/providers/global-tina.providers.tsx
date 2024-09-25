'use client';
import { GlobalQuery, GlobalQueryVariables } from '@/tina/__generated__/types';
import { createContext, useContext } from 'react';
import { ITinaResponse } from '../models/tina-response.interface';

const GlobalTinaContext = createContext<
  ITinaResponse<GlobalQuery, GlobalQueryVariables>
>({
  data: { global: {} } as GlobalQuery,
  variables: { relativePath: '' },
  query: ''
});

export function useGlobalTinaContext() {
  return useContext(GlobalTinaContext);
}

export default function GlobalTinaProvider({
  children,
  globalResponse
}: {
  children: React.ReactNode;
  globalResponse: ITinaResponse<GlobalQuery, GlobalQueryVariables>;
}) {
  return (
    <GlobalTinaContext.Provider value={globalResponse}>
      {children}
    </GlobalTinaContext.Provider>
  );
}
