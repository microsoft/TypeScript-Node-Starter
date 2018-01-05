# Note we depend on NODE_ENV being set to dictate which of the env variables below get loaded at runtime. 
# See README for more details

# Database connection strings below. You'll eventually have a lot of these!
# Get this from https://mlab.com/home after you've logged in and created a database
export MONGODB_URI="mongodb://<mlab_user>:<mlab_password>@<mlab_connection_url>"
# This is standard if you have mongodb running locally and you didn't change default ports
export MONGODB_URI_DEV="mongodb://localhost:27017"

# Put lots of randomness in these
export SESSION_SECRET="ashdfjhasdlkjfhalksdjhflak"
export SESSION_SECRET_DEV="ashdfjhasdlkjfhalksdjhflak"
