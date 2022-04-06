
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const withImages = require('next-images')
const { createSecureHeaders } = require("next-secure-headers");
const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([withImages, {
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'markdown-loader'
    })
    return config
  },
  sassOptions: {
    outputStyle: 'expanded',
    indentWidth: 4,
    additionalData: `
        @use '@theme/vars' as *;
        @use '@theme/breakpoints' as *;
        @use '@theme/utilities' as utils;
      `
  },
  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ["en", "fr"],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path.
     */
    defaultLocale: process.env.DEFAULT_LANGUAGE || "en",
  },
  async headers() {
    // Default content security policy
    const defaults = process.env.NODE_ENV === 'development' ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"] : ["'self'"]
    // Add additional content security policy directives
    const firebase = [
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      'https://apis.google.com',
      'https://*.gstatic.com',
      'https://*.firebaseio.com',
      'https://*.firebasedatabase.app',
      'https://*.googleapis.com'
    ];
    const cspString =  defaults.concat(...firebase)
    return [{
      source: "/(.*)",
      headers: createSecureHeaders({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: cspString,
            styleSrc: cspString,
            scriptSrc: cspString
          },
        },
        forceHTTPSRedirect: [true, { maxAge: 60 * 60 * 24 * 4, includeSubDomains: true }],
        referrerPolicy: "same-origin",
      })
    }];
  },
}], {})
