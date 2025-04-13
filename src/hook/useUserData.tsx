import { supabase } from '@/lib/supabaseClient';
import { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
type MinimalUser = {
    id: string;
    email: string;
    avatar_url: string | null;
};

function parseUser(user: User): MinimalUser {
    return {
        id: user.id,
        email: user.email ?? '',
        avatar_url: user.user_metadata?.avatar_url ?? null
    }
}

function useUserData() {
    const [user, setUser] = useState<MinimalUser | null>(null);

    useEffect(() => {

        const getUser = async () => {
            const { data } = await supabase.auth.getUser()
            if (data?.user) {              
                const currentUser = parseUser(data.user);
                setUser(currentUser);

            } else {
                console.log("No hay usuario autenticado");
            }
        }


        getUser();


    }, []);


    return  user;
}

export default useUserData;