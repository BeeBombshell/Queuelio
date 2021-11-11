# OTP-flask-API

## Installation
```
#in app.py line 6 & 7 Add Your Email Credentials / prefer to use Secrets/.env variable
#if using Gmail allow access to less secure app in google-account settings
pip install -r requirements.txt
python app.py

```
## Usage
```
http request : localhost:5000/OTP?id=sample@mail.com
Json Return  : {"OTP":"3777","email":"sample@mail.com"}
#The same OTP is also send to the specified email.
