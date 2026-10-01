import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from '@apollo/server'

export const LoggingPlugin: ApolloServerPlugin = {
  async requestDidStart(
    requestContext,
  ): Promise<GraphQLRequestListener<any>> {
    const startedAt = Date.now()
    const label =
      requestContext.request.operationName ?? 'anonymous operation'
    return {
      async willSendResponse() {
        const ms = Date.now() - startedAt
        console.log(`GraphQL ${label} completed in ${ms}ms`)
      },
    }
  },
}
