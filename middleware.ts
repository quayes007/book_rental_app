import { NextRequest, NextResponse } from 'next/server';

const protectedPaths = [
  { method: 'POST', path: '/api/v1/books' },
  { method: 'GET', path: '/api/v1/books'},
  { method: 'POST', path: '/api/v1/books/:id/borrow' },
  { method: 'POST', path: '/api/v1/books/:id/order' }
  // Add more protected routes as needed
];

export const middleware = async (req: NextRequest) => {  
  const isProtected = protectedPaths.some(route => {
    const pathRegex = new RegExp(`^${route.path.replace(':id', '\\d*')}$`);
    return route.method === req.method && pathRegex.test(req.nextUrl.pathname);
  });

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.headers.get('authorization')?.split(' ')[1];
  console.log('token ', token)
  if (!token) {
    return NextResponse.json({ message: 'No token provided', code: 401 });
  }

  try {
    (req as any).token = token; // Attach user to request
  } catch (error:any) {
    return NextResponse.json({ message: error.message, code: 401 });
  }
};
