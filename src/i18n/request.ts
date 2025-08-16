import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'es'].includes(locale as any)) {
    // This will be caught by the `notFound` function
    return {
      locale: 'en',
      messages: (await import(`../../messages/en.json`)).default
    };
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
