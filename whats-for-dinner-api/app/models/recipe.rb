class Recipe < ApplicationRecord
  has_and_belongs_to_many :ingredients, join_table: :recipe_ingredients
  has_many :meal_plans
end
