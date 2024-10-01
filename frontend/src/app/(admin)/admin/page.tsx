"use client";
import AllUsersHook from "../../../hooks/AllUsersHook";
export default function Admin() {
  const { user, isLoading, error } = AllUsersHook();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div>
        <h1>Admin Page</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user.email}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
