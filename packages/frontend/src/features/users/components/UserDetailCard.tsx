import { Link } from "@tanstack/react-router";
import { graphql } from "src/lib/generated/gql";
import { Card, CardBody, CardFooter, Button } from "@nextui-org/react";
import { FragmentType, useFragment } from "src/lib/generated";

const UserDetailFragment = graphql(`
  fragment UserDetailFragment on User {
    user_uuid
    handle
    screen_name
    bio
    created_at
    updated_at
    role
  }
`);

const UserDetailCard = ({ user: user_frag }: { user: FragmentType<typeof UserDetailFragment> }) => {
  const user = useFragment(UserDetailFragment, user_frag);

  return (
    <Card isBlurred className="min-w-full m-2 bg-secondary backdrop-blur-sm" shadow="sm">
      <CardBody>
        <div className="grid grid-flow-col grid-cols-6 md:grid-cols-12 gap-2">
          <div className="flex justify-between col-span-2">
            <h1 className="text-2xl font-bold">{user.screen_name}</h1>
          </div>
          <div className="flex justify-between col-span-4 md:col-span-10">
            <p className="text-xl">{user.screen_name}</p>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-end items-end">
        <div>
          <Button variant="shadow" className="rounded-full hover:-translate-y-1">
            <Link
              to="/auth/users/$user_uuid"
              params={{
                user_uuid: user.user_uuid,
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

export { UserDetailCard };
