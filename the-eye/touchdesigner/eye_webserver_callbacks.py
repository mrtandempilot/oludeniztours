"""
THE EYE  <->  TouchDesigner  —  direct WebSocket link (no bridge needed)

Setup in TouchDesigner
  1. Add a Web Server DAT  (name: webserver1)
       Port: 9980      Active: On
       Callbacks DAT: this file (paste it into a Text DAT, e.g. webserver1_callbacks)
  2. Add two Table DATs:  eye_state  and  eye_params
       -> DAT to CHOP (first column = names, second = values) gives you channels
          such as  mix, master, blackout, bpm, beat  and every scene parameter
          (eyeSize, irisMorph, sfM, sfN1, ...). Wire those into your network.
  3. Open the dashboard. The TOUCHDESIGNER status turns CONNECTED and the
     DEMO MODE badge becomes LIVE · TD LINKED.

Sending audio levels / commands back to the dashboard
  Call from an Execute DAT (frameEnd) or a CHOP Execute DAT, e.g.:

      cb = op('webserver1_callbacks').module
      ch = op('audio_levels')            # CHOP with channels kick bass mid high synth
      cb.send(op('webserver1'), {'type': 'audio',
              'levels': {c.name: float(c[0]) for c in ch.chans()}})

      cb.send(op('webserver1'), {'type': 'control', 'target': 'btn:take', 'value': 1})
      cb.send(op('webserver1'), {'type': 'bpm', 'bpm': 128})

  Control targets are the same ids used for MIDI mapping:
      btn:take btn:cut btn:blackout btn:freeze btn:random btn:prev btn:next
      mix master trans.duration trans.intensity audio.reactivity param:<key>
"""

import json

_clients = set()


def send(webServerDAT, obj):
    """Send a JSON message to every connected dashboard."""
    data = json.dumps(obj)
    for client in list(_clients):
        try:
            webServerDAT.webSocketSendText(client, data)
        except Exception:
            _clients.discard(client)


def _write_table(dat, rows):
    if dat is None:
        return
    dat.clear()
    for k, v in rows.items():
        dat.appendRow([k, v])


# ---------------------------------------------------------------- callbacks
def onWebSocketOpen(webServerDAT, client, uri):
    _clients.add(client)
    debug('THE EYE dashboard connected', client)
    return


def onWebSocketClose(webServerDAT, client):
    _clients.discard(client)
    return


def onWebSocketReceiveText(webServerDAT, client, data):
    try:
        msg = json.loads(data)
    except ValueError:
        return
    kind = msg.get('type')

    if kind == 'frame':
        a = msg.get('a') or {}
        b = msg.get('b') or {}
        _write_table(op('eye_state'), {
            'mix': msg.get('mix', 0),
            'master': msg.get('master', 1),
            'blackout': msg.get('blackout', 0),
            'freeze': int(bool(msg.get('freeze'))),
            'bpm': msg.get('bpm', 120),
            'beat': msg.get('beat', 0),
            'transition': msg.get('transition', ''),
            'scene_a': a.get('name', ''),
            'scene_a_kind': a.get('kind', ''),
            'scene_b': b.get('name', ''),
            **{'audio_' + k: v for k, v in (msg.get('audio') or {}).items()},
        })
        _write_table(op('eye_params'), a.get('params') or {})

    elif kind == 'event':
        # name: take | cut | committed  — trigger TD-side transitions here
        debug('THE EYE event', msg.get('name'), msg.get('data'))

    elif kind == 'hello':
        debug('THE EYE protocol', msg.get('protocol'), 'params:', len(msg.get('params') or []))
    return


def onWebSocketReceiveBinary(webServerDAT, client, data):
    return


def onWebSocketReceivePing(webServerDAT, client, data):
    return


def onWebSocketReceivePong(webServerDAT, client, data):
    return


def onHTTPRequest(webServerDAT, request, response):
    response['statusCode'] = 200
    response['statusReason'] = 'OK'
    response['data'] = 'THE EYE TouchDesigner endpoint — connect via WebSocket.'
    return response


def onServerStart(webServerDAT):
    return


def onServerStop(webServerDAT):
    _clients.clear()
    return
