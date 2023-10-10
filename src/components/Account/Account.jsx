import { useEffect, useState } from "react";

const AccountPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      try {
        const res = await fetch(
          "http://localhost:8080/account/account?email=${email}",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ email }),
          }
        );

        if (res.status === 200) {
          const jsonData = await res.json();
          setData(jsonData);
        } else {
          const errorMessage = await res.text();
          setError(errorMessage);
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching data.");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Account</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          {data ? (
            <ul>
              {data.map((item) => (
                <li key={item.id}>{item.name}</li>
                // Replace "propertyName" with the actual property name from your data
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AccountPage;
