import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const DynamicPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (slug) {
      fetch(`/api/data/${slug}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result); 
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [slug]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      {}
    </div>
  );
};

export default DynamicPage;
