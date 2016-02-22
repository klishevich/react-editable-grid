class ToDoListsController < ApplicationController
  def index
  	@todos = ToDoList.all
  end

  def edit
  	@todo=ToDoList.find(params[:id])
  end
end
