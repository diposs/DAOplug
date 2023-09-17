import { useEffect, useState } from 'react';
import { PolybaseProvider,AuthProvider } from "@polybase/react";
import { Polybase } from "@polybase/client";
import { Auth } from "@polybase/auth";
import { ethPersonalSign } from '@polybase/eth'
import { useBoundStore3 } from '../stores/datastate'
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
//import Head from 'next/head';
import { MantineProvider, ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

const polybase = new Polybase({defaultNamespace: process.env.NEXT_PUBLIC_DB,}); 
const auth = typeof window !== "undefined" ? new Auth() : null;

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
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
   <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
     <MantineProvider theme={{ colorScheme, loader: 'oval' }} withGlobalStyles withNormalizeCSS>
      <PolybaseProvider polybase={polybase}>
       <AuthProvider auth={auth!} polybase={polybase}>
         <Component {...pageProps} />
        <Notifications />
       </AuthProvider>
      </PolybaseProvider>
     </MantineProvider>
    </ColorSchemeProvider>
  );
}

