import { Container, CssBaseline } from '@mui/material';
import './App.css';
import Header from './components/Header';
import Book from './pages/Book';

function App() {
  return (
    <div>
      <Header />
      <CssBaseline>
        <Container maxWidth="xl">
          <Book />
        </Container>
      </CssBaseline>
    </div>
  );
}

export default App;
