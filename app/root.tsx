import '@fontsource/inter';
//import { registerSW } from "virtual:pwa-register";
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { CircularProgress, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider} from 'react-redux';
import { persistor, store} from './store';
import { PersistGate } from "redux-persist/lib/integration/react";
import { useEffect, useState } from 'react';
import { auth } from './config/firebase/config';
import { useAppDispatch } from './store/hooks';
import { setUser } from './features/auth/authSlice';

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "manifest",
    href: "/logistics/manifest.webmanifest",
  },
];


//registerSW({ immediate: true });


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <base href="/logistics/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <PersistGate loading={typeof window !== "undefined"}  persistor={persistor}>
              {children}
          </PersistGate>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const theme = createTheme({
  palette:{
    mode:'dark'
  },
  colorSchemes: {
    light:{
      palette:{
        mode: 'light',
        primary: { main: '#6A3DE8' },
      }
    }, 
    dark:{
      palette:{
        mode: 'dark',
        primary: { main: '#6A3DE8' },
      }
    } 
  },
components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          transition: "background 0.3s ease",
        },
      }),
    },
  },
});
export default function App() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [authReady,setAuthReady] = useState(false)
  useEffect(()=>{
    const unsub = auth.onAuthStateChanged((user)=>{
      console.log("auth ready")
      if (user) {
        console.log("user found, redirecting to home")
        dispatch(setUser(user))
        navigate('home',{replace:true})
        setAuthReady(true)
        return
      }
      console.log("user not found, redirecting to login")
      navigate('/',{replace:true})
      setAuthReady(true)
    })
    return ()=> unsub()
  },[])
  if (!authReady) {
    return(
      <div className='grid place-content-center h-screen w-screen'>
        <CircularProgress/>
      </div>
    )
  }
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Outlet />
      </ThemeProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
