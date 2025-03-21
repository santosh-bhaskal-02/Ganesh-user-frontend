import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function PersonalInfo() {
  const { profile } = useOutletContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex-grow p-8 flex justify-center">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
          <button
            className={`flex items-center px-4 py-2 rounded-lg ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white transition duration-300`}
            onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? <SaveIcon className="mr-2" /> : <EditIcon className="mr-2" />}
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>

        <div className="space-y-6">
          {/* First and Last Name */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.user.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-600 text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.user.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">Gender</label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.user.gender === "Male"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="text-blue-600"
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.user.gender === "Female"}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="text-blue-600"
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
            </div>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.user.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.user.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
