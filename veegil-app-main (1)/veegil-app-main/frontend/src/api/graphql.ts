export type CreateUserInput = {
  name: string;
  email: string;
  passphrase: string;
};

export type LoginInput = {
  email: string;
  passphrase: string;
};

export type CreateTransactionInput = {
  amount: number;
  type: string;
};

export type Transaction = {
  id: string;
  amount: number;
  type: string;
  userId: string;
};

export type LoginResponse = {
  login: { accessToken: string };
};

export type TransactionsResponse = {
  transactions: Transaction[];
};

export type GraphQLResponse<T> = {
  data?: T;
  errors?: {
    message: string;
    extensions?: {
      code: string;
      originalError?: {
        error: string;
        message: string[];
        statusCode: number;
      };
    };
  }[];
};

export class GraphqlApi {
  constructor(private readonly uri: string) {}

  async registerUser(
    createUserInput: CreateUserInput
  ): Promise<GraphQLResponse<boolean>> {
    const query = `
      mutation RegisterUser($createUserInput: CreateUserInput!) {
        registerUser(createUserInput: $createUserInput)
      }
    `;
    const variables = { createUserInput };
    return this.sendRequest<boolean>(query, variables);
  }

  async login(loginInput: LoginInput): Promise<GraphQLResponse<LoginResponse>> {
    const query = `
      mutation Login($loginInput: LoginInput!) {
        login(loginInput: $loginInput) {
            accessToken
        }
      }
    `;
    const variables = { loginInput };
    return this.sendRequest<LoginResponse>(query, variables);
  }

  async createTransaction(
    createTransactionInput: CreateTransactionInput
  ): Promise<GraphQLResponse<boolean>> {
    const query = `
      mutation CreateTransaction($createTransactionInput: CreateTransactionInput!) {
        createTransaction(createTransactionInput: $createTransactionInput)
      }
    `;
    const variables = { createTransactionInput };
    return this.sendRequest<boolean>(query, variables);
  }

  async transactions(): Promise<GraphQLResponse<TransactionsResponse>> {
    const query = `
      query {
        transactions {
          id
          amount
          type
          userId
        }
      }
    `;
    return this.sendRequest<TransactionsResponse>(query);
  }

  private async sendRequest<T>(
    query: string,
    variables: Record<string, unknown> = {}
  ): Promise<GraphQLResponse<T>> {
    const accessToken = localStorage.getItem("accessToken");
    const headers: HeadersInit = { "Content-Type": "application/json" };
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }

    const response = await fetch(this.uri, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query, variables }),
    });

    return await response.json();
  }
}

export const graphqlApi = new GraphqlApi(
  import.meta.env.VITE_GRAPHQL_API_URI || "https://veegil-app-api.dystopian.dev/graphql"
);
