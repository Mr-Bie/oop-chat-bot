import path from 'path';
import { createReadStream, ReadStream } from 'fs';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';
import mime from 'mime';

export async function GET(request: Request) {
  const url = new URL(request.url); // Get the request URL
  const slug = url.pathname.replace('/api', ''); // Extract 'slug' from the query parameters

  console.log('URL', url);

  // Do not check validation for public files
  if (slug.startsWith('/uploads/public')) {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  if (!slug) {
    return NextResponse.json(
      { error: 'File path is required' },
      { status: 400 }
    );
  }

  // Base directory for your static files (uploads folder)
  const baseDir = path.join(process.cwd());

  // Construct the file path
  const filePath = path.join(baseDir, slug);

  // Step 1: Sanitize and validate the file path
  const sanitizedPath = path.resolve(filePath);

  // Prevent directory traversal attacks (e.g., ../../)
  if (!sanitizedPath.startsWith(baseDir)) {
    return NextResponse.json({ error: 'Invalid file path' }, { status: 400 });
  }

  console.log('File path: ', sanitizedPath);

  try {
    // Check if the file exists
    await fs.access(sanitizedPath);
    const fileStream = createReadStream(sanitizedPath);
    const fileName = path.basename(sanitizedPath);

    const fileExt = path.extname(fileName).toLowerCase();
    const mimeType =
      {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.txt': 'text/plain',
        '.pdf': 'application/pdf',
      }[fileExt] || 'application/octet-stream';

    const chunks: Buffer[] = [];
    for await (const chunk of fileStream) {
      chunks.push(chunk);
    }
    const blob = new Blob(chunks);

    return new Response(blob, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err) {
    console.error('File not found: ', err);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
