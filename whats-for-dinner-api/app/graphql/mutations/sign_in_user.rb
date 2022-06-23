module Mutations
  class SignInUser < BaseMutation
    null true

    argument :credentials, Types::AuthProviderCredentialsInput, required: false

    field :id, String, null: true
    field :name, String, null: true
    field :email, String, null: true

    def resolve(credentials: nil)
      return unless credentials

      user = User.find_by email: credentials[:email]

      raise GraphQL::ExecutionError, 'User does not exist' if user.nil?

      raise GraphQL::ExecutionError, 'Unable to login' unless user.authenticate(credentials[:password])

      context[:session][:user_id] = user.id

      { id: user.id, name: user.name, email: user.email }
    end
  end
end
