#encoding: utf-8
puts 'Delete Priorities'
Priority.delete_all

puts 'Delete ToDoListItems'
ToDoListItem.delete_all

puts 'Delete ToDoLists'
ToDoList.delete_all

puts 'Create Priorities'
Priority.create([
  {name: "Low"},
  {name: "Average"},
  {name: "High"}
])

puts 'Create ToDoLists'
ToDoList.create([
  { name: "Food to Buy List"},
  { name: "Movies to Watch List"}
])

FoodList = ToDoList.first
MoviesList = ToDoList.second

puts 'FoodList items creation'

ToDoListItem.create([
  { to_do_list_id: FoodList.id, name: "Milk", plandate: "2016-03-01", comment: "Critical", factdate: "2016-03-01"},
  { to_do_list_id: FoodList.id, name: "Bread", plandate: "2016-03-01"}
])

puts 'MoviesList items creation'

ToDoListItem.create([
  { to_do_list_id: MoviesList.id, name: "Star Wars: The Force Awakens", plandate: "2016-03-02", comment: "Watch with Friends", factdate: "2016-03-03"},
  { to_do_list_id: MoviesList.id, name: "Deadpool", plandate: "2016-03-04"}
])