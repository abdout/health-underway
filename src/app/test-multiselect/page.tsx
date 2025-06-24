'use client';

import { useState, useEffect } from 'react';
import { MultiSelect, Option } from "@/components/atom/multi-select";

const TEST_OPTIONS: Option[] = [
  { label: "Leadership", value: "leadership" },
  { label: "Communication", value: "communication" },
  { label: "Teamwork", value: "teamwork" },
  { label: "Problem Solving", value: "problem-solving" },
];

export default function TestMultiselectPage() {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  useEffect(() => {
    console.log('TEST PAGE: Selected options changed:', selectedOptions);
  }, [selectedOptions]);

  const handleChange = (newSelected: Option[]) => {
    console.log('TEST PAGE: MultiSelect onChange called with:', newSelected);
    setSelectedOptions(newSelected);
  };

  const handleFocus = () => {
    console.log('TEST PAGE: MultiSelect focused');
  };

  const handleBlur = () => {
    console.log('TEST PAGE: MultiSelect blurred');
  };

  console.log('TEST PAGE: Rendering with selected:', selectedOptions);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">MultiSelect Test Page</h1>
          
          <div className="space-y-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test MultiSelect (Raw)
            </label>
            <div className="border p-4 bg-yellow-50">
              <p className="text-sm mb-2">Debug info:</p>
              <ul className="text-xs space-y-1 mb-4">
                <li>Total options: {TEST_OPTIONS.length}</li>
                <li>Selected count: {selectedOptions.length}</li>
                <li>Available options: {TEST_OPTIONS.filter(opt => !selectedOptions.some(sel => sel.value === opt.value)).length}</li>
              </ul>
              
              <MultiSelect
                options={TEST_OPTIONS}
                selected={selectedOptions}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Select skills..."
              />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium">Selected Values:</h3>
            <pre className="bg-gray-100 p-2 rounded mt-2 text-xs">
              {JSON.stringify(selectedOptions, null, 2)}
            </pre>
          </div>

          <div className="mt-4 space-x-2">
            <button 
              onClick={() => {
                console.log('TEST PAGE: Clearing selection');
                setSelectedOptions([]);
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Selection
            </button>
            
            <button 
              onClick={() => {
                console.log('TEST PAGE: Adding test selection');
                setSelectedOptions([TEST_OPTIONS[0]]);
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Leadership
            </button>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded">
            <h3 className="font-bold mb-2">Instructions:</h3>
            <ol className="text-sm space-y-1">
              <li>1. Open browser dev tools (F12)</li>
              <li>2. Go to Console tab</li>
              <li>3. Click on the MultiSelect input field above</li>
              <li>4. Check console for debug messages</li>
              <li>5. Report what you see in console</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
} 