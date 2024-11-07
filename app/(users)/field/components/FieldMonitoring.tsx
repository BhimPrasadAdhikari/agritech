/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React from 'react';
import FieldMap from './FieldMap';
import FieldDataPanel from './FieldDataPanel';

const FieldMonitoring: React.FC = () => {
  const [coordinates, setCoordinates] = React.useState<{ lat: number; lng: number }[]>([]);

  const handleCoordinateUpdate = (newCoordinates: { lat: number; lng: number }[]) => {
    setCoordinates(newCoordinates);
  };

  return (
    <div className="min-h-screen bg-green-100 p-4">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Field Monitoring Setup</h1>
      <div className="flex gap-5 ">
        {/* <FieldMap onCoordinatesChange={handleCoordinateUpdate} /> */}
        <FieldDataPanel coordinates={coordinates} />
      </div>
    </div>
  );
};

export default FieldMonitoring;
