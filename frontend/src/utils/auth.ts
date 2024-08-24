type userDataProps = {
  username: string;
  email: string;
  password: string;
};

type loginDataProps = {
  email: string;
  password: string;
};

export const registerUser = async (userData: userDataProps) => {
  const response = await fetch("http://localhost:8000/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Something went wrong" || data.message);
  }

  return data;
};

export const loginUser = async (userData: loginDataProps) => {
  const response = await fetch("http://localhost:8000/api/users/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorMessage = await response.text(); // baca teks respons
    throw new Error(errorMessage || "Something went wrong");
  }

  const data = await response.json(); // parse jika responsnya sukses

  return data;
};
