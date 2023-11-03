from flask import Blueprint, render_template
import firebase_admin
from firebase_admin import credentials, storage

# Initialize Firebase
cred = credentials.Certificate("path/to/your/firebase/credentials.json") # This is a JSON key you get from Firebase Console
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
