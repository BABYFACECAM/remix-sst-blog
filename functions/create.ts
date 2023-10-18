import { v4 as uuidv4 } from "uuid";
import { Table } from "sst/node/table";
import handler from "./core/handler";
import dynamodb from "./core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    postImg: "",
    title: "",
    description: "",
    content: "",
    tags: [],
    author: "",
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.Posts.tableName,
    Item: {
      postID: uuidv4(),
      createdAt: Date.now(),
      postImg: data.postImg,
      title: data.title,
      description: data.description,
      content: data.content,
      tags: data.tags,
      author: data.author,
    },
  };

  await dynamodb.put(params);

  return JSON.stringify(params.Item);
});
