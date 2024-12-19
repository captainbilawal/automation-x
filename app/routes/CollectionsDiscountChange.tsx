import { useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate, } from "@remix-run/react";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { Button, } from "@shopify/polaris";
import { Link as RemixLink } from "@remix-run/react";
import { Card, Page, } from "@shopify/polaris";
import { title } from "process";



export const loader = async ({ request }: LoaderFunctionArgs) =>{
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
      `#graphql
      query {
        collection(id: "gid://shopify/Collection/325523406997") {
          id
          title
          handle
          updatedAt
        }
      }`,
    );
    const responseJson = await response.json();
    console.log("Loader Data:", responseJson);
    // const collection = responseJson.data!.collection!.title!;

  return json({ title: responseJson.data.collection.title });
  //  return collection;
}


const CollectionSearch = () => {

  const navigate = useNavigate();

  const data = useLoaderData<typeof loader>();
  console.log("useLoaderData Result:", data);

  // Assign the JSON data to a variable
  // const jsonData = JSON.stringify(data);
    

    return (
      <Page backAction={{onAction() {
        navigate(-1);
      }}} title = "Collection Discount">
      <Card>
      <Button onClick={()=>{console.log(data)}}>Print Data</Button>
      {/* <RemixLink to={"/"} ><Button tone="critical">Cancel</Button></RemixLink> */}
      </Card></Page>
    )


}

export default CollectionSearch;