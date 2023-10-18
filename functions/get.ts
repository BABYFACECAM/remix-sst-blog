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

  const result = await dynamodb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  return JSON.stringify(result.Item);
});
