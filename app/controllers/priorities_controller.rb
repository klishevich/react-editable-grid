class PrioritiesController < ApplicationController
  def index
  	@priorities = Priority.all
  	render json: @priorities
  end
end
