/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserContact = `query GetUserContact($email: AWSEmail!) {
  getUserContact(email: $email) {
    email
    name
    phone
    interests
    description
  }
}
`;
export const listUserContacts = `query ListUserContacts(
  $email: AWSEmail
  $filter: ModelUserContactFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listUserContacts(
    email: $email
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      email
      name
      phone
      interests
      description
    }
    nextToken
  }
}
`;
