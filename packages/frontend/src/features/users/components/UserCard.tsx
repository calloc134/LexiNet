import { Link } from "@tanstack/react-router";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";
import { graphql } from "src/lib/generated/gql";

const UserFragment = graphql(`
  fragment UserFragment on User {
    user_uuid
    handle
    screen_name
  }
`);

const UserCard = ({ user }: { user: FragmentType<typeof UserFragment> }) => {
  const user_frag = useFragment(UserFragment, user);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
          <div className="flex justify-between col-span-2">
            <h1 className="text-2xl font-bold">{user_frag.screen_name}</h1>
          </div>
          <div className="flex justify-between col-span-4 md:col-span-10">
            <p className="text-xl">{user_frag.screen_name}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end">
        <div>
          <Button variant="shadow" className="rounded-full hover:-translate-y-1">
            <Link
              to="/auth/users/$user_uuid"
              params={{
                user_uuid: user_frag.user_uuid,
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

export { UserCard };
