import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, '.env'))

class Config():
    '''
    Set config variables for the flask app
    Using Environment variables where available.
    Otherwise create the config variable if not done already
    '''

    FLASK_APP = os.getenv('FLASK_APP')
    FLASK_ENV = os.getenv('FLASK_ENV')
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'Any text as a secret key'

    # Replace these with your ElephantSQL connection details
    ELEPHANTSQL_USER = os.environ.get('ELEPHANTSQL_USER')
    ELEPHANTSQL_PASSWORD = os.environ.get('ELEPHANTSQL_PASSWORD')
    ELEPHANTSQL_HOST = os.environ.get('ELEPHANTSQL_HOST')
    ELEPHANTSQL_PORT = os.environ.get('ELEPHANTSQL_PORT')
    ELEPHANTSQL_DATABASE = os.environ.get('ELEPHANTSQL_DATABASE')

    # Constructing the ElephantSQL connection string
    SQLALCHEMY_DATABASE_URI = f"postgresql://{ELEPHANTSQL_USER}:{ELEPHANTSQL_PASSWORD}@{ELEPHANTSQL_HOST}:{ELEPHANTSQL_PORT}/{ELEPHANTSQL_DATABASE}"

    SQLALCHEMY_TRACK_NOTIFICATIONS = False
    
