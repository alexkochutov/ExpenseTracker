from http.server import BaseHTTPRequestHandler
from api import income_sources
import json

class RESTController(BaseHTTPRequestHandler):

    def _set_headers(self, status=200):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        if self.path == '/income-sources':
            status, respose = income_sources.get_sources()
        else:
            status, respose = 404, {'error': 'Not found'}
        self._set_headers(status)
        self.wfile.write(json.dumps(respose).encode())

    
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        if self.path == '/income-sources':
            status, response = income_sources.add_source(data)
        else:
            status, response = 404, {'error': 'Not found'}
        self._set_headers(status)
        self.wfile.write(json.dumps(response).encode())

    def do_PUT(self):
        segments = self.path.strip('/').split('/')
        item_id = int(segments[1])
        content_length = int(self.headers['Content-Length'])
        data = self.rfile.read(content_length)

        if len(segments) == 2 and segments[0] == 'income-sources':
            status, response = income_sources.update_source(item_id, data)
        else:
            status, response = 404, {'error': 'Not found'}

        self._set_headers(status)
        self.wfile.write(json.dumps(response).encode())

    def do_DELETE(self):
        segments = self.path.strip('/').split('/')
        item_id = int(segments[1])

        if len(segments) == 2 and segments[0] == 'income-sources':
            status, response = income_sources.delete_source(item_id)
        else:
            status, response = 404, {'error': 'Not found'}

        self._set_headers(status)
        self.wfile.write(json.dumps(response).encode())