"use client";

import {
  Page,
  TextField,
  Card,
  Text,
  Icon,
  Layout,
  BlockStack,
  InlineStack,
  LegacyStack,
  FormLayout,
  Box,
  Select,
  ChoiceList,
  LegacyCard,
  Filters,
  DataTable,
  Divider,
  InlineError,
  Link as PolarisLink,
  Form,
  ButtonGroup,
  Button,
  List,
} from "@shopify/polaris";
import { useState, useCallback, useEffect, } from "react";
import {
  DiscountIcon,
  ProductAddIcon,
  SearchIcon,
} from "@shopify/polaris-icons";
import "@shopify/polaris/build/esm/styles.css";
// import { Shopify, LATEST_API_VERSION } from "@shopify/shopify-api";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData, useNavigate, useActionData, } from "@remix-run/react";
import { Link as RemixLink } from "@remix-run/react";



export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const campaignName = formData.get("campaignName")
  // const selectDiscountType = String(formData.get("selectDiscountType"))
  // const enterDiscount = String(formData.get("enterDiscount"))
  // const selectProductType = String(formData.get("selectProductType"))
  // const enterProduct = String(formData.get("enterProduct"))

  return json({ success: true, campaignName, /*selectDiscountType, enterDiscount, selectProductType, enterProduct*/ });
}



const DiscountDetails = () => {

  //Loader Data & Components funtions Definitions

  // const data = useLoaderData();
  // console.log("useLoaderData Result:", data);


  const fetcher = useFetcher();
  const navigate = useNavigate();



  //useState variables
  const [campaignName, setCampaignName] = useState("");
  const [enterDiscount, setEnterDiscount] = useState("");
  const [selectDiscountType, setSelectDiscountType] = useState("");
  const [productSelectionType, setProductSelectionType] = useState("");
  const [enterProduct, setEnterProduct] = useState<string>("");
  const [results, setResults] = useState<any[]>([]); // State for storing enterProduct results
  const [collectionContent, setCollectionContent] = useState(false);
  // const [collectionList, setCollectionList] = useState(data)




  //Callback Functions

  const handleCampaignName = useCallback(
    (campaignName: string) => setCampaignName(campaignName),
    []
  );

  const handleEnterDiscount = useCallback(
    (enterDiscount: string) => setEnterDiscount(enterDiscount),
    []
  );

  const handleSelectChange = useCallback(
    (selectDiscountType: string) => setSelectDiscountType(selectDiscountType),
    []
  );

  const handleProductSelectionType = useCallback(
    (productSelectionType: string) => setProductSelectionType(productSelectionType),
    []
  );

  const handleCollectionContent = useCallback(
    (collectionContent: boolean) => setCollectionContent(collectionContent),
    []
  );
  // const handleCollectionList = useCallback(
  //   (collectionList: string) => setCollectionList(collectionList),
  //   []);

  const handleEnterProduct = useCallback(
    async (enterProduct: string) => {
      
      setEnterProduct(enterProduct); // Update the query state

      if (enterProduct.trim()) {
        try {
          const res = await fetch(`/api/CollectionsData?enterProduct=${encodeURIComponent(enterProduct)}`); // Fetch search results
          const data = await res.json();
          setResults(data); // Update the results state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setResults([]); // Clear results if input is empty
      }
    },
    [] // No dependencies here since the function doesn't depend on other variables
  );



  //Big Callback Functions

  // const handleEnterProduct = useCallback(
  //   (value: string) => {setEnterProduct(value);
  //     if (value && productSelectionType === "collections") {
  //       fetcher.load(`?enterProduct=${encodeURIComponent(value)}`);
  //     }
  //   },
  //   [fetcher, productSelectionType]
  // );




  //Arrays & Objects


  const optionsDiscountType = [
    { label: "Percentage", value: "percentage" },
    { label: "Fixed Price", value: "fixed-price" },
    { label: "New Price", value: "new-price" },
  ];

  const optionsProductSelectionType = [
    { label: "Products & Variants", value: "products-and-variants" },
    { label: "Collections", value: "collections" },
    { label: "Tags", value: "tags" },
    { label: "Product Type", value: "product-type" },
    { label: "Vendor Type", value: "vendor-type" },
    { label: "All Products", value: "all-products" },
  ];







 

 


  //useEffect Hooks
  // useEffect(() => {
  //   if (productSelectionType === "collections" && enterProduct !== "") {
  //     console.log("Are Collections")
  //     // setIsLoading(true); // Set loading state
  //     const timeoutId = setTimeout(() => { // Debounce the fetch
  //         fetcher.load(`?enterProduct=${encodeURIComponent(enterProduct)}`);
  //     }, 300); // 300ms delay

  //     return () => clearTimeout(timeoutId); // Clear timeout on unmount or value change
  //   } else {
  //     setCollectionList([]);
  //   }
  // }, [productSelectionType, enterProduct, fetcher]);





  // useEffect(() => {
  //   if (productSelectionType === "collections") {
  //     console.log("Collection")
  //     if (enterProduct !== "" && enterProduct === data /*|| enterProduct === data.title.toLowerCase() || enterProduct === data.title.toUpperCase()*/) {
  //       console.log("Collection Products")
  //       setCollectionContent(true);

  //       // return

  //     } else {
  //       setCollectionContent(false);
  //     }
  //   } else if (productSelectionType === "products-and-variants") {
  //     setCollectionContent(false);
  //     if (enterProduct !== '') {
  //       setCollectionContent(true)

  //     }
  //   } else if (productSelectionType === "tags") {
  //     setCollectionContent(false);
  //     if (enterProduct !== '') {
  //       setCollectionContent(true)

  //     }
  //   } else if (productSelectionType === "product-type") {
  //     setCollectionContent(false);
  //     if (enterProduct !== '') {
  //       setCollectionContent(true)

  //     }
  //   } else if (productSelectionType === "vendor-type") {
  //     setCollectionContent(false);
  //     if (enterProduct !== '') {
  //       setCollectionContent(true)

  //     }
  //   } else if (productSelectionType === "all-products") {
  //     setCollectionContent(false);
  //     if (enterProduct !== '') {
  //       setCollectionContent(true)

  //     }
  //   }

  //   else {
  //     console.log("input something")
  //     // setEnterProduct('');
  //   }



  // }, [productSelectionType, enterProduct]);


  //Handling Form Data

  const handleSubmit = useCallback(() => {
    const formData = new FormData();
    formData.append("campaignName", campaignName);
    formData.append("selectDiscountType", selectDiscountType);
    formData.append("enterDiscount", enterDiscount);
    formData.append("productSelectionType", productSelectionType);
    formData.append("enterProduct", enterProduct);

    fetcher.submit(formData, { method: "post" });
  }, [campaignName, selectDiscountType, enterDiscount, productSelectionType, enterProduct, fetcher]);

  const actionData = useActionData<typeof action>();





  // useEffect(() => {
  //   if (optionsProductSelectionType[1]) {
  //     alert("data")
  //   }



  // }, [optionsProductSelectionType])





  return (
    <Page backAction={{
      onAction() {
        navigate(-1);
      }
    }} title="Discount Details" fullWidth>
      {/* <Button onClick={handleGoBack}>&larr;</Button> */}
      <Layout>
        <Layout.Section>
          <Form method="post" onSubmit={handleSubmit}>
            <LegacyCard sectioned>
              {/* <RemixLink to={"/"} >CollectionDiscountChange</RemixLink> */}
              {/* <Button onClick={()=>{console.log(data)}}>Print Data</Button> */}
              <TextField
                placeholder="e.g. 20% off"
                label="Campaign Name"
                value={campaignName}
                type="text"
                onChange={handleCampaignName}
                autoComplete="off"
              />
              <Text as="p">Customer won't see it!</Text>
            </LegacyCard>
            <LegacyCard sectioned>
              <Text as="h3" variant="bodyMd">
                <span style={{ display: "inline-flex" }}>
                  <Icon source={DiscountIcon} tone="base" />
                  Discount
                </span></Text>
              <FormLayout>
                <FormLayout.Group>
                  <Select
                    label=""
                    options={optionsDiscountType}
                    onChange={handleSelectChange}
                    value={selectDiscountType}
                  />
                  <TextField
                    placeholder="Enter Discount"
                    label=""
                    value={enterDiscount}
                    type="number"
                    onChange={handleEnterDiscount}
                    suffix="%"
                    autoComplete="off"
                  />
                </FormLayout.Group>
              </FormLayout>
            </LegacyCard>
            <LegacyCard sectioned>
              <Text as="h3" variant="bodyMd">
                <span style={{ display: "inline-flex" }}>
                  <Icon source={ProductAddIcon} tone="base" />
                  Products & Variants
                </span></Text>
              <FormLayout>
                <FormLayout.Group>
                  <Select
                    label=""
                    options={optionsProductSelectionType}
                    onChange={handleProductSelectionType}
                    value={productSelectionType}
                  />
                  <TextField
                    placeholder="Enter Name"
                    label=""
                    value={enterProduct}
                    onChange={handleEnterProduct}
                    // suffix="%"
                    autoComplete="off"
                  />
                  {/* <InlineStack gap="300" blockAlign="center"> */}
                  <Button /*onClick={fetchedProducts}*/>Browse</Button>
                  {/* </InlineStack> */}
                </FormLayout.Group>
              </FormLayout>
            </LegacyCard></Form>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <LegacyCard title="Discount Preview" sectioned>
            {/* <Text as="h1" variant="bodyMd">
              <span style={{ fontWeight: "bold", display: "inline-flex" }}>
                Discount Preview
              </span>
            </Text> */}
            <Divider />
            <Text as="h2" variant="bodyMd">
              <span
                style={{
                  fontWeight: "600",
                  display: "inline-flex",
                  marginTop: "10px",
                }}
              >
                On Product Page
              </span>
            </Text>

            <Card background="bg-surface-active">
              {/* <div style={{  width: '90%' }}>    */}
              <Text as="p" variant="bodyMd">
                <span style={{ display: "inline-flex", marginTop: "10px" }}>
                  For products without "compare-at price"
                </span>
              </Text>
              {/* </div> */}
              <Text as="p" variant="bodyMd">
                <span
                  style={{ display: "inline-flex", marginTop: "10px" }}
                ></span>
              </Text>
            </Card>
          </LegacyCard>
        </Layout.Section>

        {collectionContent && <Layout.Section>
          <Card roundedAbove="sm">
            <BlockStack gap="200">
              <Text as="h2" variant="headingSm">
                Available Collections
              </Text>
              <BlockStack gap="200">
                <Text as="h3" variant="headingSm" fontWeight="medium">
                  Items
                </Text>
                <List>
                  <List.Item>{collectionList}</List.Item>
                  <List.Item>{collectionList}</List.Item>
                </List>
              </BlockStack>
              <InlineStack align="end">
                <ButtonGroup>
                  <Button
                    variant="secondary"
                    tone="critical"
                    onClick={() => { }}
                    accessibilityLabel="Cancel shipment"
                  >
                    Cancel shipment
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => { }}
                    accessibilityLabel="Add tracking number"
                  >
                    Add tracking number
                  </Button>
                </ButtonGroup>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>}
      </Layout>
      <div style={{ marginTop: "15px" }}>
        <ButtonGroup>
          <Button onClick={() => { navigate(-1); }}>Cancel</Button>
          <Button variant="primary" onClick={() => {
            console.log({
              campaignName,
              selectDiscountType,
              enterDiscount,
              productSelectionType,
              enterProduct,
            });
            handleSubmit();
          }} >Save</Button>
        </ButtonGroup></div>
    </Page>
  );
};

export default DiscountDetails;
function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

