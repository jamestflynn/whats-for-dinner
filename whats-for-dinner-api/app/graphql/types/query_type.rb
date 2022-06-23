module Types
  class QueryType < Types::BaseObject
    # /meal_plans
    field :meal_plans, [Types::MealPlanType], null: false

    def meal_plans
      MealPlan.includes(:recipe).all
    end

    field :meal_plan, [Types::MealPlanType], null: false do
      argument :id, ID, required: true
    end

    def meal_plan(id:)
      MealPlan.where(id: id)
    end

    # /recipes
    field :recipes, [Types::RecipeType], null: false

    def recipes
      Recipe.all
    end

    field :recipe, [Types::RecipeType], null: false do
      argument :id, ID, required: true
    end

    def recipe(id:)
      Recipe.where(id: id)
    end

    # /users
    field :user, Types::UserType, null: false

    def user
      return unless context[:current_user]

      User.includes(meal_plans: :recipe).find(context[:current_user].id)
    end
  end
end
