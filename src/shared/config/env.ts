/**
 * Environment Variables Configuration
 * Provides typed access to environment variables with defaults and validation
 */

/**
 * Environment configuration interface
 */
export interface EnvironmentConfig {
    // Supabase configuration
    supabaseUrl: string;
    supabaseAnonKey: string;

    // API configuration
    apiTimeout: number; // milliseconds

    // Feature flags
    enableLogging: boolean;
    enablePerformanceMonitoring: boolean;

    // Environment name
    env: 'development' | 'staging' | 'production';
    isDevelopment: boolean;
    isProduction: boolean;
}

/**
 * Load and validate environment variables
 */
const loadEnvironmentConfig = (): EnvironmentConfig => {
    // Get environment name
    const env = (import.meta.env.MODE || 'development') as EnvironmentConfig['env'];

    // Get Supabase credentials from environment variables
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Get feature flags
    const enableLogging = import.meta.env.VITE_ENABLE_LOGGING === 'true';
    const enablePerformanceMonitoring = import.meta.env.VITE_ENABLE_PERF_MONITORING === 'true';

    // Get API configuration
    const apiTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

    // Validate required environment variables
    if (!supabaseUrl) {
        console.warn('VITE_SUPABASE_URL is not defined. Supabase features will be unavailable.');
    }
    if (!supabaseAnonKey) {
        console.warn('VITE_SUPABASE_ANON_KEY is not defined. Supabase features will be unavailable.');
    }

    const config: EnvironmentConfig = {
        supabaseUrl: supabaseUrl || '',
        supabaseAnonKey: supabaseAnonKey || '',
        apiTimeout,
        enableLogging,
        enablePerformanceMonitoring,
        env,
        isDevelopment: env === 'development',
        isProduction: env === 'production',
    };

    return config;
};

/**
 * Cached environment configuration
 */
export const ENV = loadEnvironmentConfig();

/**
 * Helper function to log environment configuration (in development only)
 */
export const logEnvironmentConfig = () => {
    if (ENV.isDevelopment && ENV.enableLogging) {
        console.log('Environment Configuration:', {
            env: ENV.env,
            supabaseUrl: ENV.supabaseUrl ? 'configured' : 'missing',
            supabaseAnonKey: ENV.supabaseAnonKey ? 'configured' : 'missing',
            apiTimeout: ENV.apiTimeout,
            enableLogging: ENV.enableLogging,
            enablePerformanceMonitoring: ENV.enablePerformanceMonitoring,
        });
    }
};

/**
 * Helper function to check if all required environment variables are configured
 */
export const isEnvironmentConfigured = (): boolean => {
    return !!ENV.supabaseUrl && !!ENV.supabaseAnonKey;
};
