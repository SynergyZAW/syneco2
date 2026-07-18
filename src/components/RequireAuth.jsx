import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../data/api';

export default function RequireAuth({ children }) {
const [status, setStatus] = useState('checking');

useEffect(() => {
let active = true;
supabase.auth.getSession().then(({ data }) => {
if (!active) return;
setStatus(data.session ? 'authed' : 'anon');
});
const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
if (active) setStatus(session ? 'authed' : 'anon');
});
return () => { active = false; sub.subscription.unsubscribe(); };
}, []);

if (status === 'checking') {
return <div style={{ padding: 40, fontFamily: 'system-ui' }}>Loading...</div>;
}
if (status === 'anon') {
return <Navigate to="/login" replace />;
}
return children;
}
