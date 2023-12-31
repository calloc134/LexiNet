import { useState } from "react";
import { Outlet, Link } from "@tanstack/react-router";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Button,
  Avatar,
  Tooltip,
  Spacer,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Login, Sun } from "tabler-icons-react";
import { MetaMaskButton } from "@metamask/sdk-react";
import { useAuthn } from "./lib/provider/authn/useAuthn";
import { Box } from "@mui/material";
import LogoImg from "./assets/logo.svg";
import { SideText } from "./components/SideText";

// 外枠のコンポーネント
export const Document = () => {
  // 認証しているかを取得
  const { isAuthenticated } = useAuthn();

  // ダークモードの設定
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark" : ""} text-foreground bg-background`}>
      <div className="h-screen flex flex-col">
        {/* ここで全画面の高さを設定 */}
        {/* 透明度50% すりガラス風にして影を付ける */}
        <Navbar height="100px" maxWidth="full" className="flex-shrink-0 bg-primary/30 backdrop-blur-sm shadow-xl rounded-b-lg px-5" shouldHideOnScroll>
          {/* ナビゲーションバーの高さを固定 */}
          <NavbarBrand>
            <Box sx={{ p: 1.5, pr: 2, pb: 1.8, borderRadius: 3 }} className={darkMode ? " hidden md:flex bg-background" : "md:flex"}>
              <Link to="/">
                <img src={LogoImg} style={{ height: "45px", width: "270px" }} />
              </Link>
            </Box>
          </NavbarBrand>
          <NavbarContent className="hidden xl:flex gap-12" justify="start">
            <div className="hidden md:flex gap-12">
              <NavbarItem>
                <Link to="/auth/chat">
                  <SideText primaryText="CHATS" secondaryText="チャット" />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link to="/auth/users">
                  <SideText primaryText="USERS" secondaryText="ユーザ" />
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link to="/auth/transactions">
                  <SideText primaryText="TRANSACTION" secondaryText="トランザクション" />
                </Link>
              </NavbarItem>
            </div>
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="flex gap-4">
              {/* 画面サイズが十分なとき */}
              <div className="hidden sm:flex sm:gap-4">
                <Tooltip content="Connect wallet" color="secondary" style={{ backgroundColor: "white" }}>
                  <Box className="hover:-translate-y-1 " sx={{ bgcolor: "#f66b0a", borderRadius: "10px" }}>
                    <MetaMaskButton />
                  </Box>
                </Tooltip>
                <Tooltip content="スタイル切替" color="secondary">
                  <Button color="secondary" variant="shadow" onClick={toggleDarkMode} className="hover:-translate-y-1 ">
                    <Sun size={20} />
                  </Button>
                </Tooltip>
                {isAuthenticated ? (
                  <Avatar isBordered as="button" className="transition-transform hover:-translate-y-1" color="secondary" name="Jason Hughes" size="md" />
                ) : (
                  <Tooltip content="ログイン/登録" color="secondary">
                    <Button variant="shadow" className="hover:-translate-y-1">
                      <Link to="/auth/transactions">
                        <Login size={20} />
                      </Link>
                    </Button>
                  </Tooltip>
                )}
              </div>
              {/* 画面サイズが十分でないとき */}
              <div className="flex sm:hidden gap-4">
                <NavbarMenuToggle />
                <NavbarMenu>
                  <NavbarMenuItem className="min-w-full flex gap-4">
                    <Tooltip content="Connect wallet" color="secondary" style={{ backgroundColor: "white" }}>
                      <Box className="hover:-translate-y-1 " sx={{ bgcolor: "#f66b0a", borderRadius: "10px" }}>
                        <MetaMaskButton />
                      </Box>
                    </Tooltip>
                  </NavbarMenuItem>
                  <NavbarMenuItem className="justify-between flex gap-4">
                    <Tooltip content="スタイル切替" color="secondary">
                      <Button color="secondary" variant="shadow" onClick={toggleDarkMode} className="hover:-translate-y-1 ">
                        <Sun size={20} />
                      </Button>
                    </Tooltip>
                  </NavbarMenuItem>
                  {isAuthenticated ? (
                    <NavbarMenuItem>
                      <Avatar isBordered as="button" className="transition-transform hover:-translate-y-1" color="secondary" name="Jason Hughes" size="md" />
                    </NavbarMenuItem>
                  ) : (
                    <NavbarMenuItem>
                      <Tooltip content="ログイン/登録" color="secondary">
                        <Button variant="shadow" className="hover:-translate-y-1">
                          <Link to="/auth/transactions">
                            <Login size={20} />
                          </Link>
                        </Button>
                      </Tooltip>
                    </NavbarMenuItem>
                  )}
                </NavbarMenu>
              </div>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="flex-grow overflow-auto">
          {/* ここで内側のコンポーネントを伸縮させる */}
          <Spacer y={12} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
