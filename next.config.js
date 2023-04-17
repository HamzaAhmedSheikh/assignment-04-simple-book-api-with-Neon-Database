/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    // PGHOST: 'ep-super-darkness-886460.us-east-2.aws.neon.tech',
    // PGDATABASE: 'neondb',
    // PGUSER:'hamzaahmedsheikh313',
    // PGPASSWORD:'afLBpPjT2Il1',
    // NEON_DATABASE_URL: 'postgres://hamzaahmedsheikh313:afLBpPjT2Il1@ep-super-darkness-886460.us-east-2.aws.neon.tech/neondb',
  }
}

module.exports = nextConfig
