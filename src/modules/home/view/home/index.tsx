import { hot } from 'react-hot-loader';
import gql from 'graphql-tag';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Query } from 'react-apollo';
import { IFeedback } from 'src/apollo/types/Feedback';

const feedbackList = gql`
  query {
    feedbackList {
      id
      message
    }
  }
`;

interface Data {
  feedbackList: IFeedback[];
}

export const HomePage: React.FC<any> = () => {
  return (
    <div>
      <br />
      <br />
      <FormattedMessage id="app.components.BlockLink.documentation" />
      <br />
      <FormattedMessage id="Analytics" />
      <br />
      <br />
      <Query<Data> query={feedbackList}>
        {({ loading, error, data }) => {
          if (loading) {
            return `loading: ${loading}`;
          }
          if (error) {
            return 'Error';
          }
          console.log('data: ', data);
          return 'Success';
        }}
      </Query>
      <br />
      <br />
      <br />
      Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.
    </div>
  );
};

export default hot(module)(HomePage);
