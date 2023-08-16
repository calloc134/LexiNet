import { useQuery } from "urql";
import { graphql } from "src/lib/generated/gql";
import { TransactionCard } from "../components/TransactionCard";
import { Spinner } from "@nextui-org/react";

// 利用されるクエリの定義
const GetAllTransactionsQuery = graphql(`
  query GetAllMyTransactionsQuery {
    getAllMyTransactions(limit: 10) {
      ...TransactionFragment
    }
  }
`);

const TransactionsPage = () => {
  // graphqlに対してクエリを実行
  const [result] = useQuery({
    query: GetAllTransactionsQuery,
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
        {data?.getAllMyTransactions.map((transaction, i) => (
          <TransactionCard key={i} transaction={transaction} />
        ))}
      </div>
    </div>
  );
  // graphqlのフラグメントマスキングでやむを得ずmapのkeyでiを使っているので、少し心配
};

export { TransactionsPage };
