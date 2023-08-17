import { useState } from "react";
import { Outlet, Link } from "@tanstack/react-router";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Avatar, Tooltip, Spacer } from "@nextui-org/react";
import { Login, Sun } from "tabler-icons-react";
import { MetaMaskButton } from "@metamask/sdk-react";
import { useAuthn } from "./lib/provider/authn/useAuthn";
import { Box } from "@mui/material";
import LogoImg from "./assets/logo.png";
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
            <Link to="/">
              <img src={LogoImg} style={{ height: "35%", width: "35%" }} />
            </Link>
          </NavbarBrand>
          <NavbarContent className="hidden sm:flex gap-12" justify="start">
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
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem className="sm:flex gap-4">
              <Tooltip content="Connect wallet" color="secondary" style={{ backgroundColor: "white" }}>
                <Button color="secondary" variant="shadow" className="hover:-translate-y-1 " style={{ backgroundColor: "#f66b0a" }}>
                  <Box sx={{ boxShadow: "none" }}>
                    <MetaMaskButton />
                  </Box>
                </Button>
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
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <div className="flex-grow overflow-auto">
          {/* ここで内側のコンポーネントを伸縮させる */}
          <Spacer y={40} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};
