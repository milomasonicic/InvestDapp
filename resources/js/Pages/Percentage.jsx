
import React, { PureComponent } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, LabelList } from 'recharts';

export default function Percentage({ companyBalance, userBalance }) {
  const totalBalance = companyBalance + userBalance;
  const companyPercentage = 100;
  const userPercentage = (userBalance / totalBalance) * 100;

  const data = [
    { name: 'Company', percentage: companyPercentage },
    { name: 'User', percentage: userPercentage },
  ];

  return (
    <div className='w-[80%] h-[330px]
    mx-auto
    dark:bg-gray-700 bg-stone-100'>
      <ResponsiveContainer>
        <BarChart data={data} barSize={125}>
          <XAxis dataKey="name" />
          <XAxis />
         
          <Bar dataKey="percentage" radius={[5, 5, 0, 0]} fill="#8884d8">
            <LabelList dataKey="percentage" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
