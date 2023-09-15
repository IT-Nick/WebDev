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

  // Загрузим данные с сервера
  useEffect(() => {
    fetch('/general-management/api/applications/list')
      .then((res) => res.json())
      .then((data) => setApplications(data))
      .catch((err) => console.error(err));
  }, []);
  // Одобрить заявку
  const approveApplication = (id: number) => {
    fetch('/general-management/api/applications/approve', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 'approved') {
        setApplications(applications.filter((app) => app.id !== id));
      }
    })
    .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Approval List</h1>
      <ul>
        {applications.map((application) => (
          <li key={application.id}>
            {application.full_name} ({application.email})
            <button onClick={() => approveApplication(application.id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserApprovalList;
