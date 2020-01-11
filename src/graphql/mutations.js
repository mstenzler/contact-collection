/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserContact = `mutation CreateUserContact(
  $input: CreateUserContactInput!
  $condition: ModelUserContactConditionInput
) {
  createUserContact(input: $input, condition: $condition) {
    email
    name
    phone
    interests
    description
  }
}
`;
export const updateUserContact = `mutation UpdateUserContact(
  $input: UpdateUserContactInput!
  $condition: ModelUserContactConditionInput
) {
  updateUserContact(input: $input, condition: $condition) {
    email
    name
    phone
    interests
    description
  }
}
`;
export const deleteUserContact = `mutation DeleteUserContact(
  $input: DeleteUserContactInput!
  $condition: ModelUserContactConditionInput
) {
  deleteUserContact(input: $input, condition: $condition) {
    email
    name
    phone
    interests
    description
  }
}
`;
