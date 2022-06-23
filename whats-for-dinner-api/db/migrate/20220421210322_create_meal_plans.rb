class CreateMealPlans < ActiveRecord::Migration[5.2]
  def change
    create_table :meal_plans do |t|
      t.date :date
      t.bigint :user_id
      t.bigint :recipe_id

      t.timestamps
    end

    add_foreign_key(:meal_plans, :users)
    add_foreign_key(:meal_plans, :recipes)
  end
end
