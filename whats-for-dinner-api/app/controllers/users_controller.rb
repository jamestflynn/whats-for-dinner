class UsersController < ApplicationController
  def show
    return render json: { user: nil } unless current_user

    render json: { user: current_user }
  end
end
