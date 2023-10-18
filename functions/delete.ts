import { Table } from "sst/node/table";
import handler from "./core/handler";
import dynamodb from "./core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Posts.tableName,
    Key: {
      postID: "123",
      createdAt: event?.pathParameters?.id,
    },
  };

  await dynamodb.delete(params);

  return JSON.stringify({ status: true });
});
