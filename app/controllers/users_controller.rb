class UsersController < ApplicationController

  def index
    render json: User.all
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render json: { id: @user.id }
    else
      render json: { id: 0, errors: @user.errors.full_messages.join(', ') }
    end
  end

  def destroy
    User.find(params[:id]).delete
  end

  def user_params
    params.require(:user).permit(:id, :email, :password)
  end
end
