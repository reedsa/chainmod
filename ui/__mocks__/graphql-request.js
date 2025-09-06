module.exports = {
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
  gql: (strings, ...values) =>
    typeof strings === "string"
      ? strings
      : strings.reduce(
          (acc, str, i) =>
            acc + str + (values[i] !== undefined ? values[i] : ""),
          ""
        ),
};
