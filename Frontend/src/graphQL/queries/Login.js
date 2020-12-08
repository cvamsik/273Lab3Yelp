import { gql } from 'apollo-boost';

postLoginQuery = gql`
query login($username: String!,$password:String!){
    LoginCredentials(username: $username,password:$password) {
        user_type
        _id
        email_id
    }
}
`;