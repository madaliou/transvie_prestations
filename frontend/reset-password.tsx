import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';



export default async function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  
  
  useEffect(() => {
    if (token) {
      // Optionnel: vérifier la validité du token côté client
      setIsValidToken(true);
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const response = await fetch('/api/data');
    const data = await response.json(); // ✅
    console.log(data); 

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/auth/password-reset/reset', {
        token,
        newPassword,
      });

    if (data.success) {
        setMessage('Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.');
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        setMessage('Le lien de réinitialisation est invalide ou a expiré.');
      }
    } catch (error) {
      setMessage('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Lien de réinitialisation invalide
          </h2>
          <p className="mt-4 text-center text-gray-600">
            Le lien de réinitialisation est invalide ou a expiré.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Réinitialiser votre mot de passe
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              Nouveau mot de passe
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirmer le nouveau mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Réinitialisation en cours...' : 'Réinitialiser le mot de passe'}
            </button>
          </div>
          {message && (
            <div className={`text-sm ${message.includes('succès') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );

}

function isApiResponse(data: unknown) {
  throw new Error('Function not implemented.');
}
