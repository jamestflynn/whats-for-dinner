class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :description
      t.string :image
      t.text :directions

      t.timestamps
    end
  end
end
