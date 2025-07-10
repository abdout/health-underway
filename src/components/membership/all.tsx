'use client';

import { useState, useMemo } from "react";
import { columns } from "./column";
import { UserTable } from "./user-table";
import { ModalProvider } from "@/components/atom/modal/context";
import Modal from "@/components/atom/modal/modal";
import { Button } from "@/components/ui/button";

export default function AllUsers({ users: initialUsers, currentUserId }: { users: any[]; currentUserId: string }) {
  const [users, setUsers] = useState(initialUsers);

  // Callback to update a user's applicationStatus
  const updateUserStatus = (userId: string, newStatus: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, applicationStatus: newStatus } : user
      )
    );
  };

  // Callback to update a user's role
  const updateUserRole = (userId: string, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  // University, Locality, Position filter options
  const universityOptions = useMemo(() => {
    const set = new Set(users.map(u => u.university).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [users]);
  const localityOptions = useMemo(() => {
    const set = new Set(users.map(u => u.locality).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [users]);
  const positionOptions = useMemo(() => {
    const set = new Set(users.map(u => u.position).filter(Boolean));
    return ["ALL", ...Array.from(set)];
  }, [users]);

  // State for filters
  const [university, setUniversity] = useState<string>("ALL");
  const [locality, setLocality] = useState<string>("ALL");
  const [position, setPosition] = useState<string>("ALL");

  // Filter users based on selected university, locality, and position
  const filteredUsers = users.filter((user) => {
    const universityMatch = university === "ALL" || user.university === university;
    const localityMatch = locality === "ALL" || user.locality === locality;
    const positionMatch = position === "ALL" || user.position === position;
    return universityMatch && localityMatch && positionMatch;
  });

  // Create table columns with the callbacks
  const userColumns = useMemo(
    () => columns(updateUserStatus, updateUserRole), 
    [updateUserStatus, updateUserRole]
  );

  return (
    <ModalProvider>
      <div className="scroll-x mt-4">
        {/* Filters */}
       
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] rounded-lg border border-dashed mt-8 p-8 text-center">
            <h2 className="text-2xl font-semibold">No users found</h2>
            <p className="text-muted-foreground max-w-[500px] ">
              No registered users yet.
            </p>
          </div>
        ) : (
          <UserTable 
            columns={userColumns} 
            data={filteredUsers}
            statusOptions={[]}
            roleOptions={[]}
            onStatusChange={() => {}}
            onRoleChange={() => {}}
            currentStatus={""}
            currentRole={""}
          />
        )}
      </div>
    </ModalProvider>
  );
} 