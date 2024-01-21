import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  OperationVariables,
} from "@apollo/client";
import axios, { AxiosRequestConfig } from "axios";
import useAxios from "axios-hooks";

const BASE_URL = "http://localhost:3000/";

const axiosClient = axios.create({
  baseURL: BASE_URL + "api",
  timeout: 10000,
});

const useAppAxios = <T>(config: string | AxiosRequestConfig) => {
  const overrideConfig = typeof config === "string" ? { url: config } : config;
  return useAxios<T>({ baseURL: BASE_URL, timeout: 10000, ...overrideConfig });
};

const gqlClient = new ApolloClient({
  uri: BASE_URL + "graphql",
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
function fetchGraphqlMutation({
  variables,
  mutation,
}: // staffToken,

{
  variables: OperationVariables;
  mutation: DocumentNode;
  staffToken?: string;
}) {
  // const headers: any = {};

  // if (staffToken) {
  //   headers.staff_authorization = `${AUTH_HEADER}${staffToken}`;
  // }

  return gqlClient.mutate({
    variables,
    mutation,
    // context: {
    //   headers,
    // },
  });
}
export { axiosClient, gqlClient, useAppAxios, fetchGraphqlMutation };
