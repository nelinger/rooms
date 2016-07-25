# rooms

Each workstation needs an AppEngine SDK:
https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python

How to run the local server:
From the rooms directory, run: dev_appserver.py .

Deploy to production:
appcfg.py -A roomstube -V v1 update ./