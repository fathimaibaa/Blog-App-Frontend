
import AuthContext from './context/AuthContext';
import Route from './route/Route'
import  { Toaster } from 'react-hot-toast';
import "quill/dist/quill.snow.css";

function App() {
  return (
    <div>
     <AuthContext>
     <Route/>
     <Toaster/>
     </AuthContext>
    </div>
  )
}

export default App
