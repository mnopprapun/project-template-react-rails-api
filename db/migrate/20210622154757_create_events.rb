class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events do |t|
      t.integer :calendar_id
      # t.integer :user_id
      t.string :title
      t.datetime :start
      t.datetime :end

      t.timestamps
    end
  end
end
