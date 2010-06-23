class HomeController < ApplicationController
  layout "base"

  def index
    render :layout => false
  end

  def check_track
    # params[:track_uri]
    
    
    render :text => session
    
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
