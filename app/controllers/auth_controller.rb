class AuthController < ApplicationController
	skip_before_action :require_login
	
	def login
		user = User.find_by(username: params[:username])
		if user && user.authenticate(params[:password])
			payload = {user_id: user.id}
			user.calendar.create if !user.calendar 
			token = encode_token(payload)
			render json: {user: user, jwt: token, success: "Welcome back, #{user.username}"}
		else
			render json: {failure: "Log in failed! Username or password invalid!"}
		end
	end
	
	def auto_login
		if session_user
			render json: session_user
		else
			render json:{errors: "No User Logged In"}
		end
	end
	# def auto_login
	# 	@token = params[:token]
	# 	user = User.find(JWT.decode(@token, "put your secret password here", true, algorithm: 'HS256')[0]["user_id"])
	# 	render json: user
	#   end
	
	# end