class CreateRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    create_join_table :recipes, :ingredients, table_name: :recipe_ingredients do |t|
      t.index [:recipe_id, :ingredient_id], :unique => true, :name => 'by_recipe_and_ingredient'
      t.bigint :quantity, null: false

      t.timestamps
    end
  end
end
