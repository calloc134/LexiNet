import { Textarea, Card, CardBody, Button, Spinner, Chip } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { graphql } from "src/lib/generated";
import toast, { Toaster } from "react-hot-toast";
import { useQuery, useMutation } from "urql";
import { Box, Container, Stack, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import LogoImg from "../../../assets/logo.png";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import { useState } from "react";

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
  // ページ状態管理
  const [isInitial, setIsInitial] = useState(true);

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
      setIsInitial(false);
      executeQuery();
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          {isInitial ? (
            <Stack justifyContent={"center"} sx={{ height: "85vh" }}>
              <Box>
                <Stack alignItems="center">
                  <Stack direction="row" alignItems="flex-end" spacing={2} sx={{ mb: 5 }}>
                    <Typography variant="h5">Generate sentences Powered by</Typography>
                    <img src={LogoImg} alt="LexiChain" style={{ height: "35px", width: "210px", marginBottom: "4px" }} />
                  </Stack>
                </Stack>
                <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" spacing={2}>
                  <Chip variant="bordered" color="primary" startContent={<CreditScoreIcon />}>
                    残チケット数：{result.data?.getMyUser.tickets_count ?? "読み込み中"}
                  </Chip>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Textarea
                    placeholder="テキストを入力"
                    {...register("text", { required: true, minLength: 1 })}
                    variant="faded"
                    radius="lg"
                    minRows={5}
                    style={{ fontSize: "18px", padding: "10px", paddingTop: "30px" }}
                  />
                </Stack>
                <Stack alignItems="center" sx={{ mt: 6 }}>
                  <Button
                    type="submit"
                    variant="shadow"
                    color="primary"
                    size="lg"
                    className="p-7"
                    startContent={data.fetching ? null : <SendIcon />}
                    isLoading={data.fetching}
                  >
                    <Typography variant="h6">Generate</Typography>
                  </Button>
                </Stack>
              </Box>
            </Stack>
          ) : (
            <Stack justifyContent="space-between" sx={{ height: "85vh" }}>
              <Box sx={{ height: "70px" }}>
                {data.data ? (
                  <>
                    <Card>
                      <CardBody>
                        {data.fetching ? (
                          <div className="flex flex-col items-center justify-center">
                            <Spinner color="primary" />
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
                  </>
                ) : null}
              </Box>
              <Box>
                <Stack direction="row" alignItems="flex-end" justifyContent="flex-start" spacing={2}>
                  <Chip variant="bordered" color="primary" startContent={<CreditScoreIcon />}>
                    残チケット数：{result.data?.getMyUser.tickets_count ?? "読み込み中"}
                  </Chip>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Textarea
                    placeholder="テキストを入力"
                    {...register("text", { required: true, minLength: 1 })}
                    variant="faded"
                    radius="lg"
                    minRows={2}
                    style={{ fontSize: "18px", padding: "10px", paddingTop: "30px" }}
                  />
                  <Button
                    type="submit"
                    variant="shadow"
                    color="primary"
                    size="lg"
                    startContent={data.fetching ? null : <SendIcon />}
                    isLoading={data.fetching}
                  />
                </Stack>
              </Box>
            </Stack>
          )}
        </form>
      </Container>
    </>
  );
};

export { ChatPage };
