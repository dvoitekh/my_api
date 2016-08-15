class DeviseCreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :email,              null: false, default: ""
      t.string :password, null: false, default: ""
      t.string :token, default: ""

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
    add_index :users, :token, unique: true
  end
end
