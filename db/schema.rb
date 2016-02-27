# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160221132434) do

  create_table "priorities", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "to_do_list_items", force: :cascade do |t|
    t.integer  "to_do_list_id"
    t.integer  "priority_id"
    t.string   "name"
    t.date     "plandate"
    t.string   "comment"
    t.date     "factdate"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "to_do_list_items", ["priority_id"], name: "index_to_do_list_items_on_priority_id"
  add_index "to_do_list_items", ["to_do_list_id"], name: "index_to_do_list_items_on_to_do_list_id"

  create_table "to_do_lists", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
