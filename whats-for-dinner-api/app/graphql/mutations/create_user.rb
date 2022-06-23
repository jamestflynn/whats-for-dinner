module Mutations
  class CreateUser < BaseMutation
    # often we will need input types for specific mutation
    # in those cases we can define those input types in the mutation class itself
    class AuthProviderSignupData < Types::BaseInputObject
      argument :credentials, Types::AuthProviderCredentialsInput, required: false
    end

    argument :name, String, required: true
    argument :auth_provider, AuthProviderSignupData, required: false

    field :id, String, null: true
    field :name, String, null: true
    field :email, String, null: true
    field :errors, [String], null: false

    def resolve(name: nil, auth_provider: nil)
      user = User.new(
        {
          name: name,
          email: auth_provider&.[](:credentials)&.[](:email),
          password: auth_provider&.[](:credentials)&.[](:password)
        }
      )

      raise GraphQL::ExecutionError, user.errors.full_messages.join(', ') unless user.save

      context[:session][:user_id] = user.id

      { id: user.id, name: user.name, email: user.email, errors: [] }
    end
  end
end
