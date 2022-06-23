class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.bigint :user_id
      t.string :uuid

      t.timestamps
    end

    add_column :users, :session_id, :string
    add_foreign_key :sessions, :users
  end
end
