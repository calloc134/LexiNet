import { Textarea, Card, CardBody, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { graphql } from "src/lib/generated";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, useMutation } from "urql";

type FormData = {
  text: string;
};
const chatGPTMutation = graphql(`
  mutation chatGPTMutation($text: String!) {
    chatGPT(text: $text) {
      text
    }
  }
`);

const getMyUser = graphql(`
  query getMyUser {
    getMyUser {
      user_uuid
      tickets_count
    }
  }
`);

const ChatPage = () => {
  // フォーム用フック
  const { register, handleSubmit } = useForm<FormData>();

  // 自分のユーザを取得するクエリ用フック
  const [result, executeQuery] = useQuery({ query: getMyUser });

  // ミューテーションフック
  const [data, executeMutation] = useMutation(chatGPTMutation);

  const onSubmit = async (data: FormData) => {
    const result = await executeMutation(data);

    if (result.error) {
      toast.error("エラーが発生しました", {
        icon: "🔥",
      });
    }

    if (result.data) {
      toast.success("送信に成功しました", {
        icon: "👏",
      });
      executeQuery();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card>
        <CardBody>
          <p>保持チケット枚数: {result.data?.getMyUser.tickets_count}</p>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea placeholder="テキストを入力してください" {...register("text", { required: true })} />
            <Button type="submit" />
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <p>{data.data?.chatGPT.text}</p>
        </CardBody>
      </Card>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
        }}
      />
    </div>
  );
};

export { ChatPage };
