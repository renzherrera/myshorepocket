import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';  // Correct picker
import { TextInput } from 'react-native-paper';  // Import Paper components
import Animated, { FadeInRight } from 'react-native-reanimated';

type Props = {};

const Page = (props: Props) => {
  const [formData, setFormData] = useState({
    housekeepingRequest: "",
    itSupportType: "",
    maintenanceDate: "",
    leaveReason: "",
    equipmentType: "",
    facilityBookingDate: "",
    onboardingDetails: ""
  });

  const payload = {
    status: true,
    forms: [
      {
        id: 7,
        name: "Housekeeping Request",
        control_type_name: "text", // Text field for description
        description: "Please provide a description of your housekeeping request.",
        hidden_controls: []
      },
      {
        id: 8,
        name: "IT Support Request",
        control_type_name: "dropdown", // Dropdown field for issue category
        options: [
          { label: "Hardware Issue", value: "hardware" },
          { label: "Software Issue", value: "software" },
          { label: "Network Issue", value: "network" },
          { label: "Other", value: "other" },
        ],
        description: "Please select the type of issue you are facing.",
        hidden_controls: []
      },
      {
        id: 11,
        name: "Maintenance Request",
        control_type_name: "date", // Date picker for scheduling maintenance
        description: "Please choose a date for the requested maintenance.",
        hidden_controls: []
      },
      {
        id: 12,
        name: "Leave Request",
        control_type_name: "text", // Text field for leave reason
        description: "Please provide a reason for your leave request.",
        hidden_controls: []
      },
      {
        id: 13,
        name: "Equipment Repair Request",
        control_type_name: "dropdown", // Dropdown for equipment type
        options: [
          { label: "Computer", value: "computer" },
          { label: "Printer", value: "printer" },
          { label: "Air Conditioning Unit", value: "ac_unit" },
          { label: "Other", value: "other" },
        ],
        description: "Please select the equipment that needs repair.",
        hidden_controls: []
      },
      {
        id: 14,
        name: "Facility Booking Request",
        control_type_name: "date", // Date picker for booking facility
        description: "Select the date and time for your facility booking.",
        hidden_controls: []
      },
      {
        id: 15,
        name: "Employee Onboarding Request",
        control_type_name: "text", // Text input for additional information
        description: "Provide any additional details regarding the onboarding process.",
        hidden_controls: []
      },
    ],
  };
  

  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [selectedField, setSelectedField] = useState<any>(null);

  const handleWorkflowChange = (value: string | null) => {
    setSelectedWorkflow(value);
    const selectedForm = payload.forms.find(form => form.id.toString() === value);
    setSelectedField(selectedForm);
  };

  const workflowItems = payload.forms.map((form) => ({
    label: form.name,
    value: form.id.toString(),
  }));

  const renderField = () => {
    if (!selectedField) return null;

    switch (selectedField.control_type_name) {
      case 'text':
        return (
          <TextInput
            label="Enter Details"
            mode="outlined"
            style={{ marginBottom: 16 }}
          />
        );
      case 'dropdown':
        return (
          <RNPickerSelect
            onValueChange={(value) => console.log(value)}  // Handle dropdown value
            items={selectedField.options}
            style={pickerSelectStyles}
            placeholder={{
              label: "Select an option...",
              value: null,
            }}
          />
        );
      case 'date':
        return (
          <TextInput
            label="Select Date"
            mode="outlined"
            style={{ marginBottom: 16 }}
            // Ideally, you would use a date picker here
          />
        );
      default:
        return null;
    }
  };
  const handleSubmit = () => {
    // This is where you handle form submission
    console.log("Form Submitted", formData);
    // You can perform your API call or logic here
  };

  return (
    <View className="flex-1 justify-start items-center bg-gray-100 p-5">
      <Image
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/001/991/656/original/customer-service-flat-design-concept-illustration-icon-support-call-center-help-desk-hotline-operator-abstract-metaphor-can-use-for-landing-page-mobile-app-free-vector.jpg' }} // Replace with a valid image URL
        className="w-64 h-40 object-contain mb-5"
      />
      
      <Text className="text-4xl font-bold text-blue-900 mb-3">ShoreHub Helpdesk</Text>
      
      <Text className="text-lg text-gray-600 text-center mb-5">
        Please select the appropriate workflow for your request.
      </Text>
      
      <View className="w-full mb-5">
        <Text className="text-xl text-gray-800 mb-2">Select Workflow</Text>
        <RNPickerSelect
          onValueChange={handleWorkflowChange}
          items={workflowItems}
          value={selectedWorkflow}
          style={pickerSelectStyles}
          placeholder={{
            label: "Select a workflow...",
            value: null,
          }}
        />
      </View>

      {selectedWorkflow && (
        <View className="w-full mt-5">
          <Text className="text-xl text-gray-800 mb-2">Additional Information</Text>
          {renderField()}
        </View>
      )}
      {/* Submit Button with Animation */}
      <Animated.View
        className="bg-blue-600 mt-12 rounded-lg px-24 w-full py-2"
        entering={FadeInRight.delay(700).duration(500)} // Applying fade-in animation
      >
        <TouchableOpacity onPress={handleSubmit}>
          <Text className="text-center my-2 text-white">Submit</Text>
        </TouchableOpacity>
      </Animated.View>

      <View className="mt-4 p-3  w-full items-center">
        <Text className="text-sm text-blue-500">
          Need assistance? Contact support at: support@example.com
        </Text>
      </View>
    </View>
  );
};

export default Page;

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
    width: '100%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: '#333',
    width: '100%',
  },
};
