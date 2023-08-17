import { Textarea, Card, CardBody, Button, Spinner } from "@nextui-org/react";
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
      <div className="flex flex-col w-8/12">
        <div className="space-y-4">
          <Card>
            <CardBody>
              {
                <div className="flex flex-col items-center justify-center">
                  {result.fetching ? <Spinner label="読み込み中..." color="primary" /> : <p>現在の保持チケット枚数: {result.data?.getMyUser.tickets_count}</p>}
                </div>
              }
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Textarea placeholder="テキストを入力してください" {...register("text", { required: true })} />
                <Button type="submit" variant="shadow" color="primary" className="w-full">
                  送信
                </Button>
              </form>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              {data.fetching ? (
                <div className="flex flex-col items-center justify-center">
                  <Spinner label="読み込み中..." color="primary" />
                </div>
              ) : (
                <p>{data.data?.chatGPT.text}</p>
              )}
            </CardBody>
          </Card>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 5000,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export { ChatPage };
