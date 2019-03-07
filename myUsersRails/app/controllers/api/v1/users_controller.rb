module Api::V1
  class UsersController < ApplicationController
    def index
      @users = User.all
      render json: @users
    end

    def create
      @user = User.create(user_params)
      render json: @user
    end

    def show
      @user = User.find(params[:id])
 
      if stale?(last_modified: @user.updated_at) # muy importante
        render json: @user
      end
    end

    def destroy #destruir 
      @user = User.find(params[:id])
      if @user.destroy
        head :no_content, status: :ok
      else
         render json: @user.errors, status: :unprocessable_entity
      end
    end

    private

      def user_params
        params.require(:user).permit(:name)
      end
  end
end