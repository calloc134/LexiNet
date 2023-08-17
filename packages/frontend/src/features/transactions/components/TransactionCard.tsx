import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, CardHeader } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { graphql } from "src/lib/generated/gql";

// 利用される投稿のフラグメントの定義
const TransactionFragment = graphql(`
  fragment TransactionFragment on Transaction {
    transaction_uuid
    tickets_count
    amount
    status
  }
`);

const TransactionCard = ({ transaction: transaction_frag }: { transaction: FragmentType<typeof TransactionFragment> }) => {
  // フラグメントから投稿の情報を取得
  const transaction = useFragment(TransactionFragment, transaction_frag);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardHeader>
        <h1 className="text-2xl font-bold">{transaction.transaction_uuid}</h1>
      </CardHeader>
      <CardBody>
        <div className="flex justify-between">
          <div className="flex w-full bg-background rounded-xl">
            <Table hideHeader removeWrapper aria-label="トランザクションステータス表">
              <TableHeader>
                <TableColumn>hoge</TableColumn>
                <TableColumn>fuga</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>金額量</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>チケット数</TableCell>
                  <TableCell>{transaction.tickets_count}</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>ステータス</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end">
        <div>
          <Button color="primary" variant="shadow" className="rounded-full hover:-translate-y-1">
            <Link
              to="/auth/transactions/$transactions_uuid"
              params={{
                transactions_uuid: transaction.transaction_uuid,
              }}
            >
              詳細を見る
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export { TransactionCard };
