import { Button, Spacer } from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import LogoImg from "../../../assets/logo.svg";

export const Index = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start h-screen">
        <img src={LogoImg} alt="LEXINET" className="w-unit-8xl" />
        <h1 className="text-4xl font-bold">LEXINET</h1>
        <p className="text-xl">誰かに頼らない思想を君に。</p>
        <Spacer y={4} />
        <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
          <Link to="/auth/transactions">作成したトランザクション一覧の表示</Link>
        </Button>

        <Spacer y={4} />

        <Spacer y={4} />
      </div>
    </>
  );
};
