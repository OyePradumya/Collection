import phonenumbers
from phonenumbers import geocoder , carrier, timezone
phonenumber = phonenumbers.parse("+917362918737")
print(geocoder.description_for_number(phonenumber,'en'))
print(carrier.name_for_number(phonenumber,'en'))
print(timezone.time_zones_for_number(phonenumber))
