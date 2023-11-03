from flask import Blueprint, render_template
from datetime import timedelta
import firebase_admin
from firebase_admin import credentials, storage

# Your provided JSON as a dictionary
firebase_config = {
  "type": "service_account",
  "project_id": "frankie-s-sports-images",
  "private_key_id": "dc583cddc2fa97405e15e5438ea1edbfda22dfe1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG...[trimmed for brevity]...Jicw82A==-----END PRIVATE KEY-----",
  "client_email": "firebase-adminsdk-23k3y@frankie-s-sports-images.iam.gserviceaccount.com",
  "client_id": "115912095377977091633",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-23k3y%40frankie-s-sports-images.iam.gserviceaccount.com"
}

# Initialize Firebase
cred = credentials.Certificate(firebase_config)
firebase_admin.initialize_app(cred, {
    'storageBucket': 'frankie-s-sports-images.appspot.com'
})

site = Blueprint('site', __name__, template_folder='site_templates')

@site.route('/')
def home():
    return render_template('index.html')

@site.route('/images')
def images():
    # Assuming you have an image named "sample_image.jpg" in your Firebase Storage.
    image_name = "sample_image.jpg"
    bucket = storage.bucket()
    blob = bucket.blob(image_name)
    # Get the URL of the image
    image_url = blob.generate_signed_url(timedelta(seconds=300), method='GET') # URL will be valid for 5 minutes
   
    return render_template('images.html', image_url=image_url)

@site.route('/profile')
def profile():
    return render_template('profile.html')
