import { LightningElement, wire } from 'lwc';
import { gql, graphql } from 'lightning/uiGraphQLApi';
export default class GraphQLAccountFetchTest extends LightningElement {
     results;
    errors;
    
    @wire(graphql, {
        query: gql`
          query AccountWithName {
            uiapi {
                query {
                    Account (first: 20) {
                        edges {
                            node {
                                Id
                                Name { 
                                    value
                                }
                            }
                        }
                    }
                }
            }
        }`
    })
    graphqlQueryResult({ data, errors }) {
        if (data) {
            this.results = data.uiapi.query.Account.edges.map(edge => edge.node);
        }
        this.errors = errors;
    }

}