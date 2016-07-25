# rooms

## New workstation (first time setup)

Install AppEngine SDK:
https://cloud.google.com/appengine/downloads#Google_App_Engine_SDK_for_Python

## Pull

```bash
git clone https://github.com/nelinger/rooms.git
```

## Run local server

```bash
dev_appserver.py .
```

## Deploy to production:

```bash
appcfg.py -A roomstube -V v1 update ./
```