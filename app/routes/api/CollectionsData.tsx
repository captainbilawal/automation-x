
// import { useState, useCallback, useEffect, } from "react";
// import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";
import { authenticate } from "../../shopify.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";




//Loader
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const url = new URL(request.url);
  const enterProduct = url.searchParams.get("enterProduct");

//   if (!enterProduct) return json({});


  const query = 
    `#graphql
  query getCollectionsByTitle($first: Int!, $query: String!) {
      collections(first: $first, query: $query) {
        edges {
          node {
            id
            title
            handle
            updatedAt
          }
        }
      }
    }
  `; const variables = {

      first: 10,
      query: `title:${enterProduct}*`

  }



  try {
       const response = await admin.graphql(query, { variables });
       const responseJson = await response.json();
      //  console.log("GraphQL Response:", JSON.stringify(responseJson, null, 2));
       const collectionTitle2 = responseJson.data!.collections!.edges[1].node.enterProduct;
    //   if (responseJson.data?.collections?.edges?.length > 0) {
    //     const collections = responseJson.data.collections.edges.map((edge: any) => edge.node.title);
    //     return json({ collections });
    //   }
    return json(collectionTitle2)

  // return json({ collections: [] });
  //  return json({ title: collectionTitle2 });

  //     if (responseJson.data && responseJson.data.collections && responseJson.data.collections.edges.length > 0) {
  //       const collectionTitle = responseJson.data.collections.edges[0].node.title;
  //       return json({ title: collectionTitle, collections: responseJson.data.collections.edges.map((edge: any) => edge.node)});
  //     } else {
  //       console.error("No collections found or unexpected response structure:", responseJson);
  //       return json({ title: "No collection found" });
  //     }
  } catch (error) {
    console.error("Error in loader function:", error);
    return json({ title: "Error fetching collection" });
  }
  
};