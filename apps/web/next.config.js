//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {
    svgr: false,
  },
  // Experimental features for better performance
  experimental: {
    // Use source files directly in development for better DX
    externalDir: true,
  },
  // Ensure transpilation of monorepo packages
  transpilePackages: ['@hanapp-ph/commons'],
  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: (() => {
          try {
            return process.env.NEXT_PUBLIC_SUPABASE_URL
              ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
              : 'placeholder.supabase.co';
          } catch {
            return 'placeholder.supabase.co';
          }
        })(),
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
