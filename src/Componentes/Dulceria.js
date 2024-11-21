import React, { useState } from 'react';
import '../Estilos/Payment.css';
import ConfirmationModal from '../ComponentesD/ConfirmationModal';
import HeaderClient from '../Componentes/HeaderClient';

function PaymentComponent() {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardImage, setCardImage] = useState('https://cdn.discordapp.com/attachments/1240772639409176603/1309034100228882493/image.png?ex=67401c82&is=673ecb02&hm=12dfff004161da98ffbc753935ef22dcd4b5075e45bb33c250ead037d74e5b9a&');
  const [showModal, setShowModal] = useState(false);

  const cardData = [
    {
      image: 'https://cdn.discordapp.com/attachments/1240772639409176603/1309026801296736256/image.png?ex=674015b5&is=673ec435&hm=e9e9fbdb8f49b71f6487187852a2fa192ec8ee16fd2ff81a0b3f89c8d8fa12f1&',
      cardNumber: '4111 1111 1111 1111',
      name: 'JOHN SMITH',
      expirationMonth: '10',
      expirationYear: '2025',
      cvc: '123'
    },
    {
      image: 'https://cdn.discordapp.com/attachments/1240772639409176603/1309026849460060230/image.png?ex=674015c1&is=673ec441&hm=cc20fd08cb56be394f824297e470079a18a1728671e8e5231f2d125a7ebe4765&',
      cardNumber: '3600 666633 3344',
      name: 'JOHN SMITH',
      expirationMonth: '10',
      expirationYear: '2025',
      cvc: '456'
    },
    {
      image: 'https://cdn.discordapp.com/attachments/1240772639409176603/1309032355725312031/image.png?ex=67401ae2&is=673ec962&hm=042296abba795bc351955a51e85cad177ad0fe613e368ebc7f606e80fac227eb&',
      cardNumber: '4973 1668 3346 9277',
      name: 'COLCHADO GERALDO',
      expirationMonth: '12',
      expirationYear: '2028',
      cvc: '931'
    }
  ];

  const handlePayment = () => {
    console.log('Payment details:', { cardNumber, name, expirationMonth, expirationYear, cvc });
    setShowModal(true);
  };

  const handleAutoComplete = () => {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    const randomCard = cardData[randomIndex];

    setCardNumber(randomCard.cardNumber);
    setName(randomCard.name);
    setExpirationMonth(randomCard.expirationMonth);
    setExpirationYear(randomCard.expirationYear);
    setCvc(randomCard.cvc);
    setCardImage(randomCard.image);
  };

  return (
    <div>
      <HeaderClient />
      <div className="payment-container">
        <h2 className="text-2xl font-bold mb-4">Información de pago</h2>
        <div className="card-image">
          <img src={cardImage} alt="Card" />
        </div>
        <div className="autocomplete-link mb-4" onClick={handleAutoComplete}>Autocompletar</div>
        <form className="payment-form">
          <div className="form-group">
            <label>Número de la tarjeta</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Fecha de expiración</label>
            <div className="expiration-fields">
              <select
                value={expirationMonth}
                onChange={(e) => setExpirationMonth(e.target.value)}
              >
                <option value="">Mes</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              <select
                value={expirationYear}
                onChange={(e) => setExpirationYear(e.target.value)}
              >
                <option value="">Año</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
            />
          </div>
          <button type="button" className="buy-button" onClick={handlePayment}>
            COMPRAR
          </button>
        </form>
        {showModal && <ConfirmationModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default PaymentComponent;
