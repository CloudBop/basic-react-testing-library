import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
export default function ScoopOption({ name, imagePath, updateItemCount }) {
  const handleChange = (evt) => {
    updateItemCount(name, evt.target.value)
  }
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label column xs="6" style={{ textAlign: 'right' }}>{name}</Form.Label>

        <Col xs={"5"} style={{ textAlign: "left" }}>
          <Form.Control onChange={handleChange} type="number" defaultValue={0} />
        </Col>
      </Form.Group>
    </Col>
  );
}