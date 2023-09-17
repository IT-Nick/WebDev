import React, { useEffect, useState } from 'react';

// Определим интерфейс для типа Application
interface Application {
  id: number;
  email: string;
  institute: string;
  course: number;
  team_experience: boolean;
  best_skill: string;
  full_name: string;
}

// Компонент для списка пользователей
const UserApprovalList: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [modalData, setModalData] = useState<Application | null>(null);

  // Загрузим данные с сервера
  useEffect(() => {
    fetch('/general-management/api/applications/list')
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error(err));
  }, []);
// Одобрить заявку
const approveApplication = (id: number) => {
    const payload = JSON.stringify({ id });
  
    console.log("Sending to server:", payload);
  
    fetch('/general-management/api/applications/approve', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload,
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("Received from server:", data);
  
      if (data.status === 'approved') {
        setApplications(applications.filter((app) => app.id !== id));
      }
    })
    .catch((err) => console.error(err));
  };
  

  return (
    <div>
    <h1 className="text-2xl font-bold mb-4">User Approval List</h1>
    <ul className="space-y-4">
      {applications.map((application) => (
        <li 
          key={application.id} 
          className="shadow-md hover:shadow-lg p-4 border rounded-lg cursor-pointer"
          onClick={() => setModalData(application)}
        >
          <div className="flex justify-between items-center">
            <div>
              {application.full_name} ({application.email})
            </div>
            <button 
              className="bg-pink-500 text-white px-4 py-1 rounded-full"
              onClick={() => approveApplication(application.id)}
            >
              Approve
            </button>
          </div>
        </li>
      ))}
    </ul>

    {/* Modal */}
    {modalData && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-1/2">
          <h2 className="text-2xl font-bold mb-4">Application Details</h2>
          <p>Email: {modalData.email}</p>
          <p>Institute: {modalData.institute}</p>
          <p>Course: {modalData.course}</p>
          <p>Team Experience: {modalData.team_experience ? 'Yes' : 'No'}</p>
          <p>Best Skill: {modalData.best_skill}</p>
          <p>Full Name: {modalData.full_name}</p>
          <button 
            className="mt-4 bg-red-500 text-white px-4 py-1 rounded-full"
            onClick={() => setModalData(null)}
          >
            Close
          </button>
        </div>
      </div>
    )}
  </div>
  );
};

export default UserApprovalList;
