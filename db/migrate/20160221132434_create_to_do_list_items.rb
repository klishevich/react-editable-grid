class CreateToDoListItems < ActiveRecord::Migration
  def change
    create_table :to_do_list_items do |t|
      t.references :to_do_list, index: true, foreign_key: true
      t.references :priority, index: true, foreign_key: true
      t.string :name
      t.date :plandate
      t.string :comment
      t.date :factdate

      t.timestamps null: false
    end
  end
end
