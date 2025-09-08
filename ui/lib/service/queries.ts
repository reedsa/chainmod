import { gql } from "graphql-request";

export const GET_TOP_TOKENS = gql`
  query topTokens($network: evm_network, $time_ago: DateTime!) {
    EVM(network: $network) {
      DEXTradeByTokens(
        orderBy: { descendingByField: "usd" }
        limit: { count: 10 }
        where: {
          TransactionStatus: { Success: true }
          Block: { Time: { since: $time_ago } }
        }
      ) {
        Trade {
          Currency {
            Symbol
            SmartContract
            Fungible
            Name
          }
          Amount(maximum: Block_Number)
          AmountInUSD(maximum: Block_Number)
        }
        pairs: uniq(of: Trade_Side_Currency_SmartContract)
        dexes: uniq(of: Trade_Dex_SmartContract)
        amount: sum(of: Trade_Amount)
        usd: sum(of: Trade_AmountInUSD)
        buyers: uniq(of: Trade_Buyer)
        sellers: uniq(of: Trade_Sender)
        count
      }
    }
  }
`;
