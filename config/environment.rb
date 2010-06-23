# Be sure to restart your server when you modify this file

# Specifies gem version of Rails to use when vendor/rails is not present
RAILS_GEM_VERSION = '2.3.5' unless defined? RAILS_GEM_VERSION

# Bootstrap the Rails environment, frameworks, and default configuration
require File.join(File.dirname(__FILE__), 'boot')

# Soundcloud API requires, needed for OAuth setup
gem 'soundcloud-ruby-api-wrapper'
require 'soundcloud'

gem 'haml'

Rails::Initializer.run do |config|
  # Settings in config/environments/* take precedence over those specified here.
  # Application configuration should go into files in config/initializers
  # -- all .rb files in that directory are automatically loaded.

  # Add additional load paths for your own custom dirs
  # config.load_paths += %W( #{RAILS_ROOT}/extras )

  # Specify gems that this application depends on and have them installed with rake gems:install
  # config.gem "bj"
  # config.gem "hpricot", :version => '0.6', :source => "http://code.whytheluckystiff.net"
  # config.gem "sqlite3-ruby", :lib => "sqlite3"
  # config.gem "aws-s3", :lib => "aws/s3"

  # Only load the plugins named here, in the order given (default is alphabetical).
  # :all can be used as a placeholder for all plugins not explicitly named
  # config.plugins = [ :exception_notification, :ssl_requirement, :all ]

  # Skip frameworks you're not going to use. To use Rails without a database,
  # you must remove the Active Record framework.
  # config.frameworks -= [ :active_record, :active_resource, :action_mailer ]

  # Activate observers that should always be running
  # config.active_record.observers = :cacher, :garbage_collector, :forum_observer

  # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
  # Run "rake -D time" for a list of tasks for finding time zone names.
  config.time_zone = 'UTC'

  # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
  # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}')]
  # config.i18n.default_locale = :de

  # SoundCloud API OAuth settings
  consumer_token = 'vh6FOjsncSNpr5npId5zA'
  consumer_secret = 'uaMzQoyYcbfY5TUVnoLyf1k2YtxmIXTEGBuispNPbI'
  $sc_host = 'soundcloud.com'
  
  consumer_token = 'izBVnBd0TuX0nzfnmK1ZA'
  consumer_secret = 'HjP6uzsqNVbvMFTKQwXFOtuYTO9tIVePxvlmOEASBY'
  $sc_host = 'soundcloud.dev'
  
  
  $sc_consumer = OAuth::Consumer.new(consumer_token, consumer_secret, {
      :site               => "http://api.#{$sc_host}",
      :scheme             => :query_string,
      :request_token_path => "/oauth/request_token",
      :access_token_path  => "/oauth/access_token",
      :authorize_path     => "/oauth/authorize"
    })
  # = Soundcloud.consumer(consumer_token, consumer_secret, , :scheme => :query_string)

end
