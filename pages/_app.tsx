import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { PolybaseProvider,AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { ethPersonalSign } from '@polybase/eth'
import { useBoundStore3 } from '../stores/datastate'

const polybase = new Polybase({defaultNamespace: process.env.NEXT_PUBLIC_DB,}); 
const auth = typeof window !== "undefined" ? new Auth() : null;
const myCache = createEmotionCache({ key: 'mantine' });

export default function App({ Component, pageProps }: AppProps) {
 const { pvKey } = useBoundStore3();
  useEffect(() => {
    polybase.signer(async (data) => {
     if(pvKey != null){
      return {
        h: 'eth-personal-sign',
        sig: ethPersonalSign(pvKey, data)
      }
     }else{
      return {
        h: 'eth-personal-sign',
        sig: await auth!.ethPersonalSign(data),
      }
    }
    })
   },[pvKey]);

 
  return (
     <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        emotionCache={myCache}
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
     >
      <PolybaseProvider polybase={polybase}>
       <AuthProvider auth={auth!} polybase={polybase}>
         <Component {...pageProps} />
       </AuthProvider>
      </PolybaseProvider>
     </MantineProvider>
  );
}
