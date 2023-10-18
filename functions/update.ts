import { Table } from "sst/node/table";
import handler from "./core/handler";
import dynamodb from "./core/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const params = {
    TableName: Table.Posts.tableName,
    Key: {
      postID: "123",
      createdAt: event?.pathParameters?.id,
    },

    UpdateExpression:
      "SET postImg = :postImg, title = :title, description = :description, content = :content, tags = :tags, author = :author",
    ExpressionAttributeValues: {
      ":postImg": data.postImg || null,
      ":title": data.title || null,
      ":description": data.description || null,
      ":content": data.content || null,
      ":tags": data.tags || null,
      ":author": data.author || null,
    },

    ReturnValues: "ALL_NEW",
  };

  await dynamodb.update(params);

  return JSON.stringify({ status: true });
});
