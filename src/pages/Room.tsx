import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import logoImg from '../assets/images/logo.svg';

import '../styles/rooms.scss';
import { FormEvent, useEffect, useState } from 'react';
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

type FirebaseQuestions = Record<string,{
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>

type Question = {
  id: string;
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}

type RoomParams = {
  id: string;
}

export function Room(){
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');
  
  const roomId = params.id;

  useEffect( () => {
    const roomRef = database.ref(`/rooms/${roomId}`);    

    roomRef.once('value', room => {
      const databaseRoom = room.val();
      const fireBaseQuestions = databaseRoom.questions as FirebaseQuestions;

      const parsedQuestions = Object.entries(fireBaseQuestions).map( ([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  async function handleCreateNewQuestion(event: FormEvent){

    if ( newQuestion.trim() === ''){
      return;
    }

    if (!user){
      throw new Error('Precisa logar');
    }
    event.preventDefault();
    const questionRef = database.ref(`rooms/${roomId}/questions`);
    
    const firebaseQuestion = await questionRef.push({
      content: newQuestion,
      author:{
        id: user?.id,
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    });

    setNewQuestion('');
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
           <img src={logoImg} alt="Letmeask"></img>
           <RoomCode code={params.id} />
        </div>
      </header>

      <main >
        <div className="room-title">
          <h1> Sala {title}</h1>
          { questions.length > 0 && (<span>{questions.length} pergunta(s)</span>)}          
        </div>

        <form onSubmit={handleCreateNewQuestion}>
          <textarea placeholder="O que você quer saber?" onChange={ event => setNewQuestion(event.target.value)} value={newQuestion}/>
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
              </div>
            ) : (<span> Para enviar uma pergunta <button>faça seu login</button>.</span>) }
            
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}