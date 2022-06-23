module Types
  class MealPlanType < Types::BaseObject
    def self.authorized?(object, context)
      super && object.user == context[:current_user]
    end

    field :id, ID, null: false
    field :date, GraphQL::Types::ISO8601Date
    field :user_id, Integer
    field :recipe_id, Integer
    field :recipe, Types::RecipeType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
