import os, http.server, socketserver

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)  # the site folder (parent of .claude)
PORT = int(os.environ.get("PORT", "8231"))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # dev server: never cache, so edits to css/js/html show on every reload
        self.send_header("Cache-Control", "no-store, max-age=0")
        super().end_headers()

with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"serving {ROOT} on {PORT}")
    httpd.serve_forever()
