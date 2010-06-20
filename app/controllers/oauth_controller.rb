gem 'soundcloud-ruby-api-wrapper'
require 'soundcloud'

class OauthController < ApplicationController
  def request_token
    callback_url = url_for :action => :access_token
    
    request_token = $sc_consumer.get_request_token(:oauth_callback => callback_url)
    session[:request_token] = request_token.token
    session[:request_token_secret] = request_token.secret
    authorize_url = "http://#{$sc_host}/oauth/authorize?oauth_token=#{request_token.token}&display=popup"
    redirect_to authorize_url
  end

  def access_token
    post_uri = if params[:oauth_token] == session[:request_token]
      request_token = OAuth::RequestToken.new($sc_consumer, session[:request_token], session[:request_token_secret])
      access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
      
      #sc = Soundcloud.register({:access_token => access_token, :site => "http://api.#{$sc_host}"})
      #me = sc.User.find_me
      #username = me.username
      
      session[:access_token] = access_token.token
      session[:access_token_secret] = access_token.secret
      session[:request_token] = session[:request_token_secret] = nil
      
      url = "http://api.#{$sc_host}/tracks" # ?track[title]=Recording&track[public]=true"
      req = Net::HTTP::Post.new(url)
      access_token.sign!(req)
    else
      logger.error 'ERROR: OauthController::access_token: authorization failed -' +
        'request token in session does not match token passed in params'
      username = ''
    end

    redirect_to "/sc-connect-complete.html?post_uri=#{CGI::escape(post_uri)}"
  end

end
