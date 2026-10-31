"""Writes sky-reference.json from two independent libraries (astral for the sun, ephem for the
moon: Skyfield with the JPL DE421 ephemeris), so the browser's own calculations can be checked against them. Run once:
    pip install astral skyfield && python _src/test/make_reference.py"""
import datetime, json, pathlib
from zoneinfo import ZoneInfo
from skyfield import almanac
from skyfield.api import load
from astral import LocationInfo
from astral.sun import sun, dusk

places = [('New York', 40.7128, -74.006, 'America/New_York'), ('Phoenix', 33.4484, -112.074, 'America/Phoenix'),
          ('Anchorage', 61.2181, -149.9003, 'America/Anchorage'), ('Honolulu', 21.3069, -157.8583, 'Pacific/Honolulu'),
          ('London', 51.5074, -0.1278, 'Europe/London'), ('Sydney', -33.8688, 151.2093, 'Australia/Sydney')]
d = datetime.date(2026, 10, 31)
sun_rows = []
for name, lat, lon, tz in places:
    o = LocationInfo(name, '', tz, lat, lon).observer
    z = ZoneInfo(tz)
    s = sun(o, date=d, tzinfo=z)
    sun_rows.append({'name': name, 'lat': lat, 'lon': lon, 'tz': tz,
                     'sunset': s['sunset'].strftime('%H:%M:%S'), 'civil': s['dusk'].strftime('%H:%M:%S'),
                     'nautical': dusk(o, date=d, tzinfo=z, depression=12).strftime('%H:%M:%S')})
ts = load.timescale()
eph = load(str(pathlib.Path(__file__).with_name('de421.bsp')))
moon_rows = []
for utc in ['2026-10-31T23:00:00Z', '2026-10-26T12:00:00Z', '2026-11-09T00:00:00Z', '2025-10-31T23:00:00Z', '2027-10-31T23:00:00Z']:
    t = ts.utc(*[int(x) for x in utc[:10].split('-')], int(utc[11:13]))
    moon_rows.append({'utc': utc, 'lit': round(100 * float(almanac.fraction_illuminated(eph, 'moon', t)), 2)})
out = pathlib.Path(__file__).with_name('sky-reference.json')
out.write_text(json.dumps({'sun': sun_rows, 'moon': moon_rows}, indent=1) + '\n', encoding='utf-8', newline='\n')
print(out.read_text())
