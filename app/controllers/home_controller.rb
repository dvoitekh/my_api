class HomeController < ApplicationController
  def index
  end

  def access
    render json: cookies[:token].present? ? { id: User.find_by(token: cookies[:token])&.id } : { id: 0 }
  end
end
