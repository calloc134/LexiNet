import { useQuery, useMutation } from "urql";
import { graphql } from "src/lib/generated/gql";
import { TransactionCard } from "../components/TransactionCard";
import { Spinner, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useForm } from "react-hook-form";

// 利用されるクエリの定義
const GetAllTransactionsQuery = graphql(`
  query GetAllMyTransactionsQuery {
    getAllMyTransactions(limit: 10) {
      ...TransactionFragment
    }
  }
`);

// 利用されるミューテーションの定義
const CreateTransactionMutation = graphql(`
  mutation CreateTransactionMutation($amount: PositiveFloat!) {
    createTransaction(amount: $amount) {
      ...TransactionFragment
    }
  }
`);

const TransactionsPage = () => {
  // フォーム用のフックを用意
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ amountString: string }>();

  // graphqlに対してクエリを実行
  const [query_result] = useQuery({
    query: GetAllTransactionsQuery,
  });

  // ミューテーション用のフックを用意
  const [, executeMutation] = useMutation(CreateTransactionMutation);

  // モーダル用のフックを用意
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { data, fetching } = query_result;

  if (fetching)
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner label="読み込み中..." color="warning" />
      </div>
    );

  const onSubmit = async (data: { amountString: string }) => {
    // 量を整数に変換
    const amount = parseFloat(data.amountString);

    // graphqlに対してミューテーションを実行
    const { error } = await executeMutation({
      amount: amount,
    });

    // 成功したかどうかの判定
    if (!error) {
      // モーダルを開く
      onOpen();
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="flex flex-col items-between justify-between">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input className="w-8/12" placeholder="金額量" {...register("amountString")} />
          {errors.amountString && <span>This field is required</span>}
          <Button type="submit" variant="shadow" color="primary" className="w-full">
            送信
          </Button>
        </form>
      </div>
      <div className="flex flex-col w-8/12">
        {data?.getAllMyTransactions.map((transaction, i) => (
          <TransactionCard key={i} transaction={transaction} />
        ))}
      </div>
      <div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>トランザクション</ModalHeader>
                <ModalBody>トランザクションを作成しました。</ModalBody>
                <ModalFooter>
                  <Button onClick={onClose} variant="shadow">
                    閉じる
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
  // graphqlのフラグメントマスキングでやむを得ずmapのkeyでiを使っているので、少し心配
};

export { TransactionsPage };
