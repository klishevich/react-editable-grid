class ToDoListItemsController < ApplicationController
  def index
  	to_do_list_id = params[:to_do_list_id]
  	@items = ToDoListItem.where(to_do_list_id: to_do_list_id)
  	render :json => @items
  end
end
