## Helper functions
- `shuffle_and_group_ca.js` - This script will get all the CAs Shuffle and group them so they can be assigned to mentors
- `get_new_ca.js` - This script is responsible for getting CAs who have registered after specific time
- `parse_referrals.js` - This script is responsible for parsing XLS files from YepDesk, adding the referrals to corresponding CAs and assigning points.
- `generate_ref_lookup.js` - This script will generate a ref_codes.json , which is used by parse_referrals.js to get the UID of CA from referral code.