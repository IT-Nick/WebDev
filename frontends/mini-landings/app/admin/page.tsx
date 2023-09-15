"use client";
import React, { useEffect } from 'react';
import Loader from '@/components/shared/Loader/Loader';
import { useLoading } from '@/components/Providers/LoadingProvider';
import UserApprovalList from '@/components/admin/UserApprovalList';
import AddEventForm from '@/components/admin/AddEventForm';

// Главный компонент AdminPanel
const AdminPanel: React.FC = () => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <div className={`loader-container ${loading ? '' : 'fade-out'}`}>
        <Loader />
      </div>
      <div className={`grid grid-cols-2 gap-4 ${!loading ? 'fade-in' : 'fade-out'}`}>
        <div>
          <UserApprovalList />
        </div>
        <div>
          <AddEventForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
