import { useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';

export function Home(){
  const history = useHistory();
  const {signInWithGoogle, user} = useAuth();

  async function handleCreateRoom(){
    if (!user){
      await signInWithGoogle();
    }
    history.push('/rooms/new');

  }



  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"></img>
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>tire suas dúvidas de audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Let me ask"/>
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Google img"/>
            Entre com a conta do Google
          </button>
          <div className="separator">
             ou entre em uma sala
          </div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            >
            
            </input>
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
          
        </div>
      </main>
    </div>  
  )
}