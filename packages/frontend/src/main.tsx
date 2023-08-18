import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { NextUIProvider } from "@nextui-org/react";

import { router } from "./route";
import { AuthnProvider } from "./lib/provider/authn/AuthnProvider";
import { UrqlProvider } from "./lib/provider/urql/UrqlProvider";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { is_dev } from "./env";
import "src/index.css";
import { Box } from "@mui/material";

export const Main = () => {
  return (
    <>
      <RouterProvider router={router} />
      {
        // @ts-expect-error routerの型のエラーを無視
        is_dev && <TanStackRouterDevtools router={router} />
      }
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthnProvider>
      <MetaMaskProvider
        sdkOptions={{
          dappMetadata: {
            name: "ほげほげまん",
            url: "https://calloc.tech",
          },
          checkInstallationImmediately: false,
        }}
      >
        <UrqlProvider>
          <NextUIProvider>
            <Box className="fontfamily">
              <Main />
            </Box>
          </NextUIProvider>
        </UrqlProvider>
      </MetaMaskProvider>
    </AuthnProvider>
  </React.StrictMode>
);
