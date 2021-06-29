import Container from 'react-bootstrap/Container';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';

export default function App() {
  return (
    <OrderDetailsProvider>
      <Container>
        <OrderEntry />
      </Container>
    </OrderDetailsProvider>
  );
}