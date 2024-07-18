import React, { useState } from 'react';

interface SortOptionProps {
  onSortChange: (criteria: string, order: string) => void;
}

export const SortOption = ({ onSortChange }: SortOptionProps) => {
  const [criteria, setCriteria] = useState('id');
  const [order, setOrder] = useState('asc');

  const handleCriteriaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCriteria = event.target.value;

    setCriteria(newCriteria);
    onSortChange(newCriteria, order);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = event.target.value;

    setOrder(newOrder);
    onSortChange(criteria, newOrder);
  };

  return (
    <div className="sort-options">
      <label htmlFor="criteria">Sort by:</label>
      <select id="criteria" value={criteria} onChange={handleCriteriaChange}>
        <option value="id">ID</option>
        <option value="name">Name</option>
      </select>
      <label htmlFor="order">Order:</label>
      <select id="order" value={order} onChange={handleOrderChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};
