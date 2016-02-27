class ToDoListItemsController < ApplicationController
  def index
  	to_do_list_id = params[:to_do_list_id]
  	@items = ToDoListItem.where(to_do_list_id: to_do_list_id)
  	render json: @items
  end

  def create
    @item = ToDoListItem.new(item_params)
    to_do_list_id = @item.to_do_list_id
    if @item.save
      @items = ToDoListItem.where(to_do_list_id: to_do_list_id)
    else
      #TODO: add errors
      @items = ToDoListItem.where(to_do_list_id: to_do_list_id)
    end
    render json: @items
  end

  def update
  	@item = ToDoListItem.find(params[:id])
  	to_do_list_id = params[:to_do_list_id]
    if @item.update(item_params)
      @items = ToDoListItem.where(to_do_list_id: to_do_list_id)
    else
      #TODO: add errors
      @items = ToDoListItem.where(to_do_list_id: to_do_list_id)
    end
    render json: @items
  end

  def destroy
    @item = ToDoListItem.find(params[:id])
    to_do_list_id = params[:to_do_list_id]
    @item.destroy
    @items = ToDoListItem.where(to_do_list_id: to_do_list_id)
    render json: @items
  end

  private

  def item_params
    params.require(:to_do_list_item).permit(:name, :plandate, :comment, :factdate, :to_do_list_id, :priority_id)
  end  

end
