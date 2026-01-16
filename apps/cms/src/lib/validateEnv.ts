/**
 * Environment Variable Validation
 * 
 * Validates that all required environment variables are set before the CMS starts.
 * Provides helpful error messages to guide users in fixing configuration issues.
 */

interface EnvVar {
  name: string
  required: boolean
  description: string
  example?: string
}

const requiredEnvVars: EnvVar[] = [
  {
    name: 'DATABASE_URL',
    required: true,
    description: 'PostgreSQL connection string',
    example: 'postgresql://payload:payload_secret@localhost:5432/payload',
  },
  {
    name: 'PAYLOAD_SECRET',
    required: true,
    description: 'Secret key for JWT signing and encryption',
    example: 'Generate with: openssl rand -base64 32',
  },
  {
    name: 'PAYLOAD_PUBLIC_SERVER_URL',
    required: true,
    description: 'Public URL of the CMS server',
    example: 'http://localhost:3000',
  },
]

const optionalEnvVars: EnvVar[] = [
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    required: false,
    description: 'Public URL of the frontend site',
    example: 'http://localhost:3001',
  },
  {
    name: 'REVALIDATION_SECRET',
    required: false,
    description: 'Secret for on-demand revalidation',
    example: 'Generate with: openssl rand -base64 32',
  },
  {
    name: 'NODE_ENV',
    required: false,
    description: 'Node environment',
    example: 'development',
  },
]

export function validateEnv(): void {
  const missingVars: EnvVar[] = []
  const warnings: string[] = []

  // Check required variables
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar.name]) {
      missingVars.push(envVar)
    }
  }

  // Check optional but recommended variables
  for (const envVar of optionalEnvVars) {
    if (!process.env[envVar.name]) {
      warnings.push(`Optional: ${envVar.name} - ${envVar.description}`)
    }
  }

  // If there are missing required variables, show error and exit
  if (missingVars.length > 0) {
    console.error('\n❌ Missing required environment variables:\n')
    
    for (const envVar of missingVars) {
      console.error(`  ${envVar.name}`)
      console.error(`    Description: ${envVar.description}`)
      if (envVar.example) {
        console.error(`    Example: ${envVar.example}`)
      }
      console.error('')
    }

    console.error('📝 To fix this:')
    console.error('  1. Make sure you have a .env file in apps/cms/')
    console.error('  2. Copy apps/cms/.env.example to apps/cms/.env')
    console.error('  3. Fill in the required values')
    console.error('  4. Restart the CMS\n')
    console.error('Or run: make env-setup\n')

    process.exit(1)
  }

  // Show warnings for optional variables
  if (warnings.length > 0 && process.env.NODE_ENV === 'development') {
    console.warn('\n⚠️  Optional environment variables not set:')
    for (const warning of warnings) {
      console.warn(`  - ${warning}`)
    }
    console.warn('')
  }

  // Success message
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Environment variables validated successfully\n')
  }
}

