/**
 * Environment Variables Configuration
 * Provides typed access to environment variables with defaults and validation
 */

export const SUPABASE_REQUIRED_ENV_KEYS = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'] as const;
export const SUPABASE_ALTERNATE_CLIENT_KEY_ENV_KEYS = ['VITE_SUPABASE_PUBLISHABLE_KEY'] as const;

export type SupabaseEnvKey = (typeof SUPABASE_REQUIRED_ENV_KEYS)[number];

export interface EnvironmentConfig {
    supabaseUrl: string;
    supabaseAnonKey: string;
    apiTimeout: number;
    enableLogging: boolean;
    enablePerformanceMonitoring: boolean;
    env: 'development' | 'staging' | 'production';
    isDevelopment: boolean;
    isProduction: boolean;
}

export interface SupabaseEnvironmentContract {
    requiredKeys: readonly SupabaseEnvKey[];
    acceptedClientKeyEnvVars: readonly string[];
    browserEnvSource: 'import.meta.env';
    localDevelopmentPlacement: string;
    productionPlacement: string;
}

export const SUPABASE_ENV_CONTRACT: SupabaseEnvironmentContract = {
    requiredKeys: SUPABASE_REQUIRED_ENV_KEYS,
    acceptedClientKeyEnvVars: [
        ...SUPABASE_REQUIRED_ENV_KEYS.slice(1),
        ...SUPABASE_ALTERNATE_CLIENT_KEY_ENV_KEYS,
    ],
    browserEnvSource: 'import.meta.env',
    localDevelopmentPlacement: '.env.local in the Vite project root',
    productionPlacement: 'build-time environment variables in production',
};

type SupabaseEnvironmentProblem = {
    key: SupabaseEnvKey;
    message: string;
};

const isNonEmptyString = (value: string | undefined): value is string => {
    return typeof value === 'string' && value.trim().length > 0;
};

const isValidSupabaseUrl = (value: string): boolean => {
    try {
        const parsed = new URL(value);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
        return false;
    }
};

const collectSupabaseEnvironmentProblems = (
    supabaseUrl?: string,
    supabaseAnonKey?: string,
): SupabaseEnvironmentProblem[] => {
    const problems: SupabaseEnvironmentProblem[] = [];

    if (!isNonEmptyString(supabaseUrl)) {
        problems.push({
            key: 'VITE_SUPABASE_URL',
            message: 'VITE_SUPABASE_URL is missing.',
        });
    } else if (!isValidSupabaseUrl(supabaseUrl)) {
        problems.push({
            key: 'VITE_SUPABASE_URL',
            message: 'VITE_SUPABASE_URL must be a valid Supabase URL.',
        });
    }

    if (!isNonEmptyString(supabaseAnonKey)) {
        problems.push({
            key: 'VITE_SUPABASE_ANON_KEY',
            message:
                'A Supabase client key is missing. Define VITE_SUPABASE_ANON_KEY or VITE_SUPABASE_PUBLISHABLE_KEY.',
        });
    }

    return problems;
};

const describeSupabaseEnvironmentIssue = (
    supabaseUrl?: string,
    supabaseAnonKey?: string,
): string | null => {
    const problems = collectSupabaseEnvironmentProblems(supabaseUrl, supabaseAnonKey);

    if (problems.length === 0) {
        return null;
    }

    const problemSummary = problems.map((problem) => problem.message).join(' ');

    return [
        'Supabase is not configured for the browser client.',
        problemSummary,
        `Define the values in ${SUPABASE_ENV_CONTRACT.localDevelopmentPlacement} for local development or as ${SUPABASE_ENV_CONTRACT.productionPlacement}.`,
        `Vite only exposes ${SUPABASE_ENV_CONTRACT.browserEnvSource}.VITE_* variables to browser code.`,
    ].join(' ');
};

/**
 * Load and validate environment variables
 */
const loadEnvironmentConfig = (): EnvironmentConfig => {
    const env = (import.meta.env.MODE || 'development') as EnvironmentConfig['env'];
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
    const supabaseAnonKey =
        import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ||
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim();
    const enableLogging = import.meta.env.VITE_ENABLE_LOGGING === 'true';
    const enablePerformanceMonitoring = import.meta.env.VITE_ENABLE_PERF_MONITORING === 'true';
    const apiTimeout = parseInt(import.meta.env.VITE_API_TIMEOUT || '10000', 10);

    const configurationIssue = describeSupabaseEnvironmentIssue(supabaseUrl, supabaseAnonKey);

    if (configurationIssue) {
        console.warn(configurationIssue);
    }

    return {
        supabaseUrl: supabaseUrl || '',
        supabaseAnonKey: supabaseAnonKey || '',
        apiTimeout,
        enableLogging,
        enablePerformanceMonitoring,
        env,
        isDevelopment: env === 'development',
        isProduction: env === 'production',
    };
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
            supabaseContract: SUPABASE_ENV_CONTRACT,
        });
    }
};

export const getSupabaseConfigurationIssue = (): string | null => {
    return describeSupabaseEnvironmentIssue(ENV.supabaseUrl, ENV.supabaseAnonKey);
};

export const getSupabaseUserFacingUnavailableMessage = (
    featureName = 'RSVP registration',
): string => {
    return `${featureName} is temporarily unavailable. Please try again later.`;
};

/**
 * Helper function to check if all required environment variables are configured
 */
export const isEnvironmentConfigured = (): boolean => {
    return getSupabaseConfigurationIssue() === null;
};
