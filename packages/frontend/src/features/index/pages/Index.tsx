import { Button, Spacer } from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import LogoImg from "../../../assets/logo.svg";

export const Index = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen">
        <img src={LogoImg} alt="LEXINET" className="w-unit-8xl" />
        <p className="text-xl">AI for ALL</p>
        <p className="text-xl">AIの力を全ての人へ</p>
        <Spacer y={4} />
        <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
          <Link to="/auth/chat">チャットにアクセス</Link>
        </Button>

        <Spacer y={4} />

        <Spacer y={4} />
      </div>
    </>
  );
};
