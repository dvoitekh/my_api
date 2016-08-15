class UsersController < ApplicationController
  def index
    render json: User.all
  end

  def create
    @user = User.create!(user_params)
    generate_token if @user.valid?
    render json: { id: @user.id, errors: @user.errors.full_messages.join(', ') }
  end

  def sign_in
    @user = User.where(email: user_params[:email], password: user_params[:password]).first
    if @user.present?
      generate_token
      render json: { id: @user.id }
    else
      render json: { id: 0, errors: 'Invalid credentials' }
    end
  end

  def destroy
    @user = User.find_by!(token: cookies[:token])
    cookies[:token] = nil
    @user.update(token: nil)
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def generate_token
    loop do
      @user.token = SecureRandom.uuid
      break unless User.exists?(token: @user.token)
    end
    cookies[:token] = @user.token if @user.save
  end
end
