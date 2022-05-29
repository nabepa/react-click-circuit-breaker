import { useState } from 'react';
import CircuitBreaker from './CircuitBreaker';
import './styles.css';

export default function App() {
  const [count, setCount] = useState(0);
  const handleClick: React.MouseEventHandler = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div className='App'>
      <p>{count}</p>
      <CircuitBreaker delayTime={500}>
        <button onClick={handleClick}>click</button>
      </CircuitBreaker>
    </div>
  );
}
