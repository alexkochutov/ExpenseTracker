from http.server import HTTPServer
from api.controller import RESTController


def run(server_class=HTTPServer, handler_class=RESTController, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting server at http://127.0.0.1:{port}')
    httpd.serve_forever()


if __name__ == '__main__':
    run()