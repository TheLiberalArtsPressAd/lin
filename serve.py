#!/usr/bin/env python3
"""本機預覽用靜態伺服器。

用法：
    python serve.py            # http://127.0.0.1:8000
    python serve.py 8080       # 指定連接埠
"""
import http.server
import os
import socketserver
import sys
import webbrowser

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        sys.stdout.write("[web] " + (fmt % args) + "\n")


if __name__ == "__main__":
    os.chdir(ROOT)
    with socketserver.ThreadingTCPServer(("127.0.0.1", PORT), Handler) as httpd:
        url = f"http://127.0.0.1:{PORT}/"
        print(f"天堂ARPG 官方資料庫已啟動： {url}")
        print("按 Ctrl+C 結束。")
        try:
            webbrowser.open(url)
        except Exception:
            pass
        httpd.serve_forever()
