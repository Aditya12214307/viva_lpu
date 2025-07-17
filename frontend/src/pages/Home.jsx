import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Todo App!</h1>
        <p className="mb-6 text-gray-700">Organize your tasks efficiently and stay productive.</p>
        <div className="flex flex-col gap-4">
          <Link to="/login" className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</Link>
          <Link to="/register" className="bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
