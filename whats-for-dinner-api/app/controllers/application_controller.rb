class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  skip_before_action :verify_authenticity_token

  def authenticted!
    current_user.present?
  end

  def current_user
    return nil unless session[:user_id]

    return @current_user if @current_user

    begin
      @current_user = User.find(session[:user_id])
    rescue ActiveRecord::RecordNotFound
      session.delete(:user_id)
      nil
    end
  rescue StandardError
    nil
  end

  def not_found
    render json: { error: 'not_found' }
  end
end
