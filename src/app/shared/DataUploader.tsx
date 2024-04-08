
import React, { useState } from 'react';

interface FormData {
  title: string;
  price: number;
  description: string;
  category: string;
  mainImage: string;
  rating: number;
  reviews: number;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: 12,
    description: '',
    category: '',
    mainImage: '',
    rating: 1.2,
    reviews: 12
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/insertData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Data inserted successfully');
      } else {
        console.error('Failed to insert data');
      }
    } catch (error) {
      console.error('Failed to insert data:', error);
    }
  };

  return (
    <div>

    </div>
  );
}