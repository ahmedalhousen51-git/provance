const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;

// أنواع الملفات المدعومة
const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.htm': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
    const now = new Date().toISOString();
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    console.log(`[${now}] ${req.method} ${pathname}`);

    let filePath;
    
    // التعامل مع المسار الرئيسي
    if (pathname === '/') {
        filePath = path.join(__dirname, 'public', '_index.html');
    } else {
        filePath = path.join(__dirname, 'public', pathname);
    }

    // إصلاح مسار الملفات إذا كان الطلب للملفات مباشرة
    if (pathname.startsWith('/')) {
        filePath = path.join(__dirname, 'public', pathname);
    }

    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <h1>404 - الصفحة غير موجودة</h1>
                    <p>الملف ${pathname} غير موجود.</p>
                    <p>جاري تحميل _index.html تلقائياً...</p>
                    <script>
                        setTimeout(() => window.location.href = '/', 2000);
                    </script>
                `);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end('<h1>500 - خطأ في الخادم</h1>');
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على: http://localhost:${PORT}`);
    console.log(`📂 يتم تحميل: _index.html`);
});