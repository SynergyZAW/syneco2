import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../data/api';

export default function Login() {
const navigate = useNavigate();
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState(null);
const [loading, setLoading] = useState(false);

async function handleSubmit(e) {
e.preventDefault();
setError(null);
setLoading(true);
const { error } = await supabase.auth.signInWithPassword({ email, password });
setLoading(false);
if (error) { setError(error.message); return; }
navigate('/patient');
}

return (
<div style={{ maxWidth: 380, margin: '10vh auto', fontFamily: 'system-ui' }}>
<h1>Sign in</h1>
<p style={{ color: '#666' }}>Access your Synergy Ecosystem portal.</p>
<form onSubmit={handleSubmit}>
<label>Email</label>
<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: 8, margin: '4px 0 12px' }} />
<label>Password</label>
<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: 8, margin: '4px 0 12px' }} />
{error && <p style={{ color: 'crimson' }}>{error}</p>}
<button type="submit" disabled={loading} style={{ width: '100%', padding: 10 }}>
{loading ? 'Signing in...' : 'Sign in'}
</button>
</form>
</div>
);
}
