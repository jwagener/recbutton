# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_soundboard_session',
  :secret      => 'fb022ac95a56db2a96c76b825c6efe59d80beea9db12d24bbd5f804387044c0c25b6c117c43371072438d7d011db240ea3b662d55f274b2c6a53cb7104a4f588'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
