import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { TransactionDetailCard } from "../components/TransactionDetailCard";
import { Spinner } from "@nextui-org/react";
import { useParams } from "@tanstack/react-router";

// 利用されるクエリの定義
const GetTransactionDetailQuery = graphql(`
  query GetTransactionDetailQuery($uuid: UUID!) {
    getTransactionByUUID(uuid: $uuid) {
      ...TransactionDetailFragment
    }
  }
`);

const TransactionDetailPage = () => {
  // パスパラメータの内容を取得
  const transaction_uuid = useParams({
    from: "/auth/transactions/$transactions_uuid",
  })?.transactions_uuid;

  // graphqlに対してクエリを実行
  const [result] = useQuery({
    query: GetTransactionDetailQuery,
    variables: {
      uuid: transaction_uuid,
    },
  });

  const { data, fetching } = result;

  if (fetching)
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner label="読み込み中..." color="warning" />
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <div className="flex flex-col w-8/12">
        {data ? <TransactionDetailCard transaction={data.getTransactionByUUID} /> : <div>トランザクションが見つかりませんでした</div>}
      </div>
    </div>
  );
};

export { TransactionDetailPage };
