"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const AppointmentsContext = createContext();

export const useAppointments = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("appointments");
      if (stored) {
        setAppointments(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load appointments from localStorage", e);
    }
  }, []);

  // Save appointments to localStorage when they change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Add new appointment
  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setAppointments((prev) => [...prev, newAppointment]);
  };

  const cancelAppointment = (index) => {
    setAppointments((prev) =>
      prev.map((a, i) => (i === index ? { ...a, status: "Cancelled" } : a))
    );
  };

  return (
    <AppointmentsContext.Provider
      value={{ appointments, addAppointment, cancelAppointment }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
