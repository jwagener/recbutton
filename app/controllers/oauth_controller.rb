# The two endpoints needed for OAuth authentication using the SoundCloud Ruby
# API wrapper.
#
# Note: $sc_consumer and $sc_host can be defined in your rails
# config/environment.rb file as follows:
#
# consumer_token = '[Your consumer token goes here]'
# consumer_secret = '[Your consumer secret goes here]'
# $sc_consumer = Soundcloud.consumer(consumer_token, consumer_secret "http://api.#{sc_host}")
# $sc_host = 'soundcloud.com' # could also be 'sandbox-soundcloud.com'
#
# (Your app is the "consumer" here and you can get your consumer token and 
#  consumer secret from your app's information page) 

gem 'soundcloud-ruby-api-wrapper'
require 'soundcloud'

class OauthController < ApplicationController
  # Gets an oauth request token from SoundCloud and redirects the user to the
  # SoundCloud authorization page. The request token and secret are stored in
  # the session so they can be retrieved by the access_token endpoint.
  def request_token
    callback_url = url_for :action => :access_token
    request_token = $sc_consumer.get_request_token(:oauth_callback => callback_url)
    session[:request_token] = request_token.token
    session[:request_token_secret] = request_token.secret
    authorize_url = "http://#{$sc_host}/oauth/authorize?oauth_token=#{request_token.token}&display=popup"
    redirect_to authorize_url
  end

  # After authentication at the SoundCloud authorization page, the user is
  # redirected to this endpoint, which completes the authorization request.
  def access_token
    if params[:oauth_token] == session[:request_token]
      request_token = OAuth::RequestToken.new($sc_consumer,
      session[:request_token],
      session[:request_token_secret])
      access_token = request_token.get_access_token(:oauth_verifier => params[:oauth_verifier])
      sc = Soundcloud.register({:access_token => access_token, :site => "http://api.#{$sc_host}"})
      # Now you can use the sc object to access user data
      me = sc.User.find_me
      username = me.username
      # Save the access token so other controllers can use it
      session[:access_token] = access_token.token
      session[:access_token_secret] = access_token.secret
      # Request token is no longer needed
      session[:request_token] = session[:request_token_secret] = nil
    else
      logger.error 'ERROR: OauthController::access_token: authorization failed -' +
        'request token in session does not match token passed in params'
      username = ''
    end
    # Redirecting to sc-connect-compete.html closes the popup window and
    # invokes your js callback. Params appended to this url will be passed to
    # the callback
    redirect_to "/sc-connect-complete.html?username=#{CGI::escape(username)}"
  end

end
