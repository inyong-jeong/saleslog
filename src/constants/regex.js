export const regex = {
  'email': /[A-z0-9.]+@[A-z0-9]+\.[A-z0-9]{1,}/g,
  'password': /[A-z0-9!@#$%^&*()-_+=~`;:]{8,20}/g,
  'password_signin': /.{2,20}/g,
  'name': /[A-z가-힣]+/g,
  'ph2': /[0-9]{3,4}/g,
  'ph3': /[0-9]{3,4}/g,
  'organization_title': /[가-힣, ]{2,}/g,
  'ceo_name': /[가-힣,A-z ]{2,}/g,
  'address_detail': /[가-힣,A-z ]{2,}/g,
  'ph1_corp': /[0-9]{2,4}/g,
  'ph2_corp': /[0-9]{3,4}/g,
  'fax1': /[0-9]{2,3}/g,
  'fax2': /[0-9]{4}/g,
  'fax3': /[0-9]{4}/g,
  'registration_number': /[0-9]{10}/g,
  'organization_code': /[0-9]{11}/g
};