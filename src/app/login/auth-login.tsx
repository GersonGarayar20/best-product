'use client'
import { supabase } from '@/lib/supabaseClient'

const LoginConGoogle = () => {
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'http://localhost:3000/',

            }
        })

        if (error) {
            console.error('Error al iniciar sesión con Google:', error.message)
        }
    }

    return (
        <button onClick={handleLogin}>
            Iniciar sesión con Google
        </button>
    )
}

export default LoginConGoogle
