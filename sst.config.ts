import type { SSTConfig } from "sst";
import { Api, Bucket, RemixSite, Table } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "remix-sst-blog",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const bucket = new Bucket(stack, "Uploads");

      const table = new Table(stack, "Posts", {
        fields: {
          postID: "string",
          createdAt: "string",
        },
        primaryIndex: {
          partitionKey: "postID",
          sortKey: "createdAt",
        },
      });

      const api = new Api(stack, "Api", {
        defaults: {
          function: {
            bind: [table],
          },
        },
        routes: {
          "GET /posts": "functions/list.main",
          "POST /posts": "functions/create.main",
          "GET /posts/{id}": "functions/get.main",
          "PUT /posts/{id}": "functions/update.main",
          "DELETE /posts/{id}": "functions/delete.main",
          "GET /test": "functions/test.main",
        },
      });
      const site = new RemixSite(stack, "site", {
        bind: [bucket],
      });
      stack.addOutputs({
        url: site.url,
        ApiEndpoint: api.url,
      });
    });
  },
} satisfies SSTConfig;
