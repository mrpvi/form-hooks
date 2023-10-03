import './styles/app.scss';
import ControlledForm from './Components/ControlledForm';
import UncontrolledForm from './Components/UncontrolledForm';

function App() {
    
  
    return (
      <div className='container'>
        <ControlledForm />
        <UncontrolledForm />
      </div>
    );
}
  
export default App;