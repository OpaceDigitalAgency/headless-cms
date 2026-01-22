import fs from 'fs'
import path from 'path'

try {
    const envPath = path.resolve(process.cwd(), '.env')
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8')
        envConfig.split('\n').forEach(line => {
            // Simple parse: KEY=VAL
            // Ignore comments
            if (line.trim().startsWith('#')) return

            const [key, ...values] = line.split('=')
            const val = values.join('=') // Re-join if value contained =

            if (key && val && !process.env[key.trim()]) {
                process.env[key.trim()] = val.trim().replace(/^["']|["']$/g, '')
            }
        })
    }
} catch (e) {
    // ignore
}
