'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function UsuarioDemo() {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', 1)
                .single()
            console.log('data', data);
            if (error) {
                console.error("Error al traer el usuario:", error.message)
            } else {
                setUserData(data)
            }
        }

        fetchUser()
    }, [])

    if (!userData) return <p>Cargando usuario...</p>

    return (
        <div>
            <h1>Usuario: {userData.full_name || 'Sin nombre'}</h1>
            <p>Email: {userData.email}</p>
            <p>Estado de suscripción: {userData.subscription_status}</p>
        </div>
    )
}
