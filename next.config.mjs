/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['@prisma/client', 'bcrypt'],
    },
    // Can be safely removed in newer versions of Next.js
    future: {
        // by default, if you customize webpack config, they switch back to version 4.
        // Looks like backward compatibility approach.
        webpack5: true,
    },

    webpack(config) {
        config.resolve.fallback = {
            // if you miss it, all the other options in fallback, specified
            // by next.js will be dropped.
            ...config.resolve.fallback,
            child_process: false,
            'mock-aws-s3': false,
            'aws-sdk': false,

            fs: false, // the solution
        };

        return config;
    },
};

export default nextConfig;
