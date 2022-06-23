class CreateVotes < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.bigint :recipe_id, null: false
      t.bigint :user_id, null: false
      t.bigint :value, null: false

      t.timestamps
    end

    add_foreign_key(:votes, :users)
    add_foreign_key(:votes, :recipes)
  end
end
