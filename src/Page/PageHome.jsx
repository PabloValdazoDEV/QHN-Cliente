import { useNavigate } from "react-router";

const PageHome = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Home</h2>
      <p className="text-gray-600 mb-4">Esta es la página principal.</p>
    </div>
  );
};

export default PageHome;
