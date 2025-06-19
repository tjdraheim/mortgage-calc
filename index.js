
import { useState } from 'react';

export default function Home() {
  const [inputs, setInputs] = useState({
    homePrice: 800000,
    taxes: 4800,
    hoa: 0,
    credit: 'excellent',
    loanType: 'conventional',
    downPayment: 5,
    rate: 7.0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculateMonthlyPayment = () => {
    const loanAmount = inputs.homePrice * (1 - inputs.downPayment / 100);
    const monthlyRate = inputs.rate / 100 / 12;
    const n = 30 * 12;
    const principalAndInterest =
      (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));

    const monthlyTaxes = inputs.taxes / 12;
    const monthlyHOA = parseFloat(inputs.hoa);
    const pmi = inputs.downPayment < 20 ? (loanAmount * 0.008) / 12 : 0;

    const total = principalAndInterest + monthlyTaxes + monthlyHOA + pmi;
    return total.toFixed(2);
  };

  const calculateIncomeNeeded = () => {
    const monthlyPayment = parseFloat(calculateMonthlyPayment());
    return (monthlyPayment / 0.36).toFixed(0);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Mortgage Calculator</h1>

      {[
        { label: 'Home Price ($)', name: 'homePrice', type: 'number' },
        { label: 'Down Payment (%)', name: 'downPayment', type: 'number' },
        { label: 'Interest Rate (%)', name: 'rate', type: 'number', step: '0.01' },
        { label: 'Annual Property Taxes ($)', name: 'taxes', type: 'number' },
        { label: 'Monthly HOA ($)', name: 'hoa', type: 'number' },
      ].map(({ label, name, ...rest }) => (
        <div key={name} style={{ margin: '1rem 0' }}>
          <label>{label}</label>
          <input
            name={name}
            value={inputs[name]}
            onChange={handleChange}
            {...rest}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
      ))}

      {[
        { label: 'Credit Score Range', name: 'credit', options: ['excellent', 'good', 'fair'] },
        { label: 'Loan Type', name: 'loanType', options: ['conventional', 'fha', 'va'] },
      ].map(({ label, name, options }) => (
        <div key={name} style={{ margin: '1rem 0' }}>
          <label>{label}</label>
          <select
            name={name}
            value={inputs[name]}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      ))}

      <div style={{ marginTop: '2rem', fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center' }}>
        Monthly Payment: ${calculateMonthlyPayment()}
      </div>
      <div style={{ fontSize: '1.1rem', textAlign: 'center' }}>
        Est. Income Needed: ${calculateIncomeNeeded()} / year
      </div>
    </div>
  );
}
