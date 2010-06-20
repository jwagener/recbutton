class HomeController < ApplicationController
  layout "base"

  def index
    if session[:access_token] && session[:access_token_secret] 
      access_token = OAuth::AccessToken.new($sc_consumer,
                                            session[:access_token],
                                            session[:access_token_secret])
      sc = Soundcloud.register({:access_token => access_token, 
                                :site => "http://api.#{$sc_host}"})
      begin
        @me = sc.User.find_me
        @avatar_url = @me.avatar_url
        @public_tracks = []
        @private_tracks = []
        @me.tracks.each do |track|
          if track.sharing == 'private' #todo: helper method
            @private_tracks << track
          else
            @public_tracks << track
          end
        end
      rescue
        # bad access token / secret ? logout and start over
        redirect_to :action => 'logout'
      end
    else
      redirect_to :action => 'login'
    end
  end

  def login
    if session[:access_token] && session[:access_token_secret] 
      redirect_to :action => 'index'
    end
  end

  def logout
    session[:access_token] = nil
    session[:access_token_secret] = nil
    redirect_to :action => 'index'
  end

end
