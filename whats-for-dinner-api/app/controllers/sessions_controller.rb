class SessionsController < ApplicationController
  def destroy
    session.delete(:user_id)
    render json: {}, status: :ok
  end
end
