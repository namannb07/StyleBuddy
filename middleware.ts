import createMiddleware from 'next-intl/middleware';

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

const locales = ['en', 'hi'];

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const {pathname} = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = 'en';
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
