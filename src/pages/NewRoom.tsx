import { Link }  from 'react-router-dom';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export function NewRoom(){

  const { user} = useAuth();
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
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
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

          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link> 
          </p>
          
        </div>
      </main>
    </div>  
  )
}