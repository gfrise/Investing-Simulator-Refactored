import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AppContext } from './AppContext';

const LineChartComponent: React.FC = () => {
  const context = React.useContext(AppContext)

  return (
    <figure>
    <LineChart
      width={1200}
      height={400}
      data={context.state.mese}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="variation" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
    </figure>
  );
};

export default LineChartComponent;