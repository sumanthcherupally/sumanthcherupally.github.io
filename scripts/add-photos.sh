#!/bin/zsh
# Resize photos for the web and copy them into the site.
#
# Usage:
#   scripts/add-photos.sh travel "<Place>" "<Country>" <photo files...>
#   scripts/add-photos.sh hobbies <photo files...>
#
# Example:
#   scripts/add-photos.sh travel "San Diego" "United States" ~/Desktop/sd/*.HEIC
#
# Photos are scaled so the long edge is 1600px and saved as JPEG at quality 80
# (iPhone HEIC files work too). The saved copies don't keep the original metadata.
# For travel photos, the script reads the GPS location from each original photo and prints
# a line to paste into data/travel.js. Photos without a location print lat/lng as null:
# fill those in by hand (right-click the spot in Google Maps to copy coordinates).
set -e

kind="$1"; shift || true
if [[ "$kind" == "travel" ]]; then
  place="$1"; country="$2"; shift 2 || { echo "Need a place and a country"; exit 1; }
elif [[ "$kind" != "hobbies" ]]; then
  echo "First argument must be 'travel' or 'hobbies'"; exit 1
fi

out="$(cd "$(dirname "$0")/.." && pwd)/images/$kind"
mkdir -p "$out"

for f in "$@"; do
  name="$(basename "${f%.*}" | tr '[:upper:] ' '[:lower:]-').jpg"
  sips -s format jpeg -s formatOptions 80 -Z 1600 "$f" --out "$out/$name" >/dev/null

  if [[ "$kind" == "travel" ]]; then
    lat="$(mdls -raw -name kMDItemLatitude "$f" 2>/dev/null)"
    lng="$(mdls -raw -name kMDItemLongitude "$f" 2>/dev/null)"
    [[ "$lat" == "(null)" || -z "$lat" ]] && lat="null"
    [[ "$lng" == "(null)" || -z "$lng" ]] && lng="null"
    when="$(mdls -raw -name kMDItemContentCreationDate "$f" 2>/dev/null | cut -c1-7)"
    [[ "$when" == "(null)" ]] && when=""
    echo "  { src: \"images/travel/$name\", lat: $lat, lng: $lng, place: \"$place\", country: \"$country\", caption: \"\", date: \"$when\" },"
  else
    echo "    { src: \"images/hobbies/$name\", caption: \"\" },"
  fi
done
