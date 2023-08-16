import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { FragmentType, useFragment } from "src/lib/generated";
// 利用される投稿のフラグメントの定義
const TransactionDetailFragment = graphql(`
  fragment TransactionDetailFragment on Transaction {
    transaction_uuid
    transaction_hash
    tickets_count
    amount
    status
    created_at
    updated_at
  }
`);

const TransactionDetailCard = ({ transaction: transaction_frag }: { transaction: FragmentType<typeof TransactionDetailFragment> }) => {
  // フラグメントから投稿の情報を取得
  const transaction = useFragment(TransactionDetailFragment, transaction_frag);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
          <div className="flex justify-between col-span-2">
            <h1 className="text-2xl font-bold">{transaction.transaction_uuid}</h1>
          </div>
          <div className="flex justify-between col-span-4 md:col-span-10">
            <p className="text-xl">{transaction.transaction_hash}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end"></CardFooter>
    </Card>
  );
};

export { TransactionDetailCard };
