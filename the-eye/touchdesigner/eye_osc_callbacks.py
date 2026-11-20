"""
THE EYE  ->  TouchDesigner  via the OSC bridge  (npm run bridge)

Numbers:  OSC In CHOP, Network Port 7000. Every numeric address becomes a
          channel:  eye/mix  eye/master  eye/blackout  eye/bpm  eye/beat
                    eye/param/eyeSize  eye/param/irisMorph ...
                    eye/audio/kick ... eye/audio/synth
Strings:  OSC In DAT, Network Port 7000, Callbacks DAT = this file, for scene
          names and transition events.

To drive the dashboard from TouchDesigner, use an OSC Out DAT / CHOP to
127.0.0.1:7001 with e.g.  /eye/control/btn/take 1   /eye/audio/kick 0.8
"""

import json


def onReceiveOSC(dat, rowIndex, message, bytes, timeStamp, address, args, peer):
    state = op('eye_strings')  # optional Table DAT
    if address in ('/eye/scene/a', '/eye/scene/a/kind', '/eye/scene/b', '/eye/transition'):
        if state is not None:
            key = address[5:].replace('/', '_')
            if state.row(key) is None:
                state.appendRow([key, args[0] if args else ''])
            else:
                state[key, 1] = args[0] if args else ''
    elif address.startswith('/eye/event/'):
        name = address[len('/eye/event/'):]
        data = json.loads(args[0]) if args else {}
        # take: data['transition'], data['duration'], data['from'], data['to']
        debug('THE EYE event', name, data)
    return
