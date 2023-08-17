import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Table,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { graphql } from "src/lib/generated/gql";
import { FragmentType, useFragment } from "src/lib/generated";
import { useSendTransaction } from "@metamask/sdk-react";

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

  // トランザクション用フック
  const { data, isLoading, isSuccess, sendTransaction } = useSendTransaction({
    to: "0x57dc7A6D9Aa8cc04E8fb629C5AC298b02C85F1e4",
    value: BigInt(transaction.amount * 10 ** 18),
  });

  // モーダル用フック
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
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
                  <TableRow key="4">
                    <TableCell>作成日時</TableCell>
                    <TableCell>{transaction.created_at.toLocaleString("ja-JP")}</TableCell>
                  </TableRow>
                  <TableRow key="5">
                    <TableCell>更新日時</TableCell>
                    <TableCell>{transaction.updated_at.toLocaleString("ja-JP")}</TableCell>
                  </TableRow>
                  <TableRow key="6">
                    <TableCell>トランザクションハッシュ</TableCell>
                    <TableCell>{transaction.transaction_hash}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardBody>
        <CardFooter className="flex flex-col justify-end items-end">
          <Button color="primary" variant="shadow" onClick={onOpen}>
            トランザクション送信
          </Button>
        </CardFooter>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>トランザクションの送信</ModalHeader>
              <ModalBody>
                <p>トランザクションを送信しますか？</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={() => {
                    onClose();
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  onClick={() => {
                    sendTransaction();
                    onClose();
                  }}
                >
                  送信
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export { TransactionDetailCard };
