import { GraphQLResult, generateClient } from "aws-amplify/api";
import { getAccount as getAccountQuery } from "../../graphql/queries";
import { Amplify } from "aws-amplify";
import config from "../../amplifyconfiguration.json";

Amplify.configure(config);

const client = generateClient();

export default async function fetchAccount({ userId }: { userId: string }) {
  try {
    const res = await client.graphql({
      query: getAccountQuery,
      variables: {
        id: userId,
      },
    });

    return ((res as GraphQLResult).data as any).getAccount;
  } catch (error) {
    console.log(error);
    return (error as any).message;
  }
}
