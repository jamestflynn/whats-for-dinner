module Types
  class UserType < Types::BaseObject
    def self.authorized?(object, context)
      super && object == context[:current_user]
    end

    field :id, ID
    field :email, String
    field :name, String
    field :password, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :meal_plans, [Types::MealPlanType], null: false
  end
end
