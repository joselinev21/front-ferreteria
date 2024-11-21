import './stylePay.css'

const Processing = () => {
  return (
    /* From Uiverse.io by Pawelitto */
    <div className="containerPay">
      <div className="left-side">
        <div className="cardPay">
          <div className="cardPay-line"></div>
          <div className="buttons"></div>
        </div>
        <div className="post">
          <div className="post-line"></div>
          <div className="screen">
            <div className="dollar">$</div>
          </div>
          <div className="numbers"></div>
          <div className="numbers-line2"></div>
        </div>
      </div>
      <div className="right-side">
        <div className="new">Checkout</div>
      </div>
    </div>
  );
};

export default Processing;
