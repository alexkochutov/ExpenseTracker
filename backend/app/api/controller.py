from http.server import BaseHTTPRequestHandler
import json
import api.income_sources as income_sources


class RESTController(BaseHTTPRequestHandler):


    def _parse_path(self):
        return self.path.strip('/').split('/')
    

    def _get_data(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        return json.loads(post_data)


    def _send_response(self, status, response):
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        if response is not None:
            self.wfile.write(json.dumps(response).encode())


    def do_GET(self):
        segments = self._parse_path()
        match segments:
            case ['income-sources']:
                status, response = income_sources.get_sources()
            case ['income-sources', id] if id.isdigit():
                status, response = income_sources.get_source_by_id(id)
            case _:
                status, response = 404, {'error': 'Not found'}
        self._send_response(status, response)

    
    def do_POST(self):
        segments = self._parse_path()
        data = self._get_data()
        match segments:
            case ['income-sources']:
                status, response = income_sources.add_source(data)
            case _:
                status, response = 404, {'error': 'Not found'}
        self._send_response(status, response)


    def do_PUT(self):
        segments = self._parse_path()
        data = self._get_data()
        match segments:
            case ['income-sources', id] if id.isdigit():
                status, response = income_sources.update_source(id, data)
            case _:
                status, response = 404, {'error': 'Not found'}
        self._send_response(status, response)


    def do_DELETE(self):
        segments = self._parse_path()
        match segments:
            case ['income-sources', id] if id.isdigit():
                status, response = income_sources.delete_source(id)
            case _:
                status, response = 404, {'error': 'Not found'}
        self._send_response(status, response)


    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()