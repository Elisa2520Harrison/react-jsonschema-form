import React, { useState, useEffect } from "react";
import Form from "@rjsf/shadcn";
import validator from "@rjsf/validator-ajv8";

import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

// ================= CUSTOM DROPDOWN WIDGET =================
const CustomSelectWidget = (props) => {
  const { id, value, onChange, options } = props;
  const { enumOptions } = options;
  
  return (
    <select
      id={id}
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
    >
      <option value="" disabled>Select an option</option>
      {enumOptions.map(({ value, label }) => (
        <option key={value} value={value} className="bg-white text-gray-900">
          {label}
        </option>
      ))}
    </select>
  );
};

// ================= STEP CONFIG =================
const ASSESSMENT_STEPS = [
  { label: "Technology Assessment", description: "Please answer the following questions prior to completing the Technology Assessment exercise " },
  { label: "Value Chain Diagnostic", description: "Porter's Value Chain analysis" },
];

// ================= VALUE CHAIN SECTIONS - GROUPED STRUCTURE =================
const VALUE_CHAIN_GROUPS = [
  {
    group: "Support Services",
    functionalAreas: [
      {
        area: "Internal Operation",
        functions: ["HR", "Finance", "Management"]
      }
    ]
  },
  {
    group: "Primary Services",
    functionalAreas: [
      {
        area: "Marketing and Sales",
        functions: ["Product Development", "Marketing", "Sales"]
      },
      {
        area: "Operations",
        functions: [
          "Inbound Logistics",
          "Procurement", 
          "Production",
          "Warehousing",
          "Outbound Logistics",
          "Order Processing",
          "Distribution",
          "Customer Service"
        ]
      }
    ]
  }
];

// ================= HELPER FUNCTION TO GENERATE SCHEMA PROPERTIES =================
const generateValueChainProperties = () => {
  const properties = {};
  
  VALUE_CHAIN_GROUPS.forEach(group => {
    group.functionalAreas.forEach(area => {
      area.functions.forEach(func => {
        const key = func.replace(/\s+/g, '');
        properties[key] = {
          type: "object",
          title: func,
          properties: {
            tech1: { type: "string", title: "Technology 1" },
            purpose1: { type: "string", title: "Purpose 1" },
            tech2: { type: "string", title: "Technology 2" },
            purpose2: { type: "string", title: "Purpose 2" },
            tech3: { type: "string", title: "Technology 3" },
            purpose3: { type: "string", title: "Purpose 3" },
            tech4: { type: "string", title: "Technology 4" },
            purpose4: { type: "string", title: "Purpose 4" },
            gaps: { type: "string", title: "Gaps Identified", description: "Highlight tech needed for scale" },
          },
        };
      });
    });
  });
  
  return properties;
};

// ================= STEP 1 SCHEMA =================
const step1Schema = {
  type: "object",
  required: ["hasProduct", "productStage"],
  properties: {
    hasProduct: {
      type: "string",
      title: "1. Do you have a product?",
      enum: ["Yes", "No"],
    },
    productStage: {
      type: "string",
      title: "2. At what stage is your product?",
      enum: ["Prototype", "MVP", "Full Product", "In Development"],
    },
    techChallenges: {
      type: "string",
      title: "3. What technology challenges do you currently have?",
    },
    currentTechnologies: {
      type: "object",
      title: "4. Does your product currently use any of these technologies?",
      properties: {
        mobileApp: {
          type: "array",
          title: "Mobile App",
          items: {
            type: "string",
            enum: ["Machine Learning", "Internet of Things", "NFT"],
          },
          uniqueItems: true,
        },
        webApp: {
          type: "array",
          title: "Web App",
          items: {
            type: "string",
            enum: ["Visual Recognition", "Blockchain", "Other"],
          },
          uniqueItems: true,
        },
        ai: {
          type: "array",
          title: "AI",
          items: {
            type: "string",
            enum: ["Virtual/Augmented Reality", "Cryptocurrency", "Other"],
          },
          uniqueItems: true,
        },
      },
    },
    futureTechnologies: {
      type: "object",
      title: "5. Do you plan to incorporate any of these technologies?",
      properties: {
        mobileApp: {
          type: "array",
          title: "Mobile App",
          items: {
            type: "string",
            enum: ["Machine Learning", "Internet of Things", "NFT"],
          },
          uniqueItems: true,
        },
        webApp: {
          type: "array",
          title: "Web App",
          items: {
            type: "string",
            enum: ["Visual Recognition", "Blockchain", "Other"],
          },
          uniqueItems: true,
        },
        ai: {
          type: "array",
          title: "AI",
          items: {
            type: "string",
            enum: ["Virtual/Augmented Reality", "Cryptocurrency", "Other"],
          },
          uniqueItems: true,
        },
      },
    },
    roadmapFeatures: {
      type: "string",
      title: "6. What features do you have in your roadmap?",
    },
    hasCapabilities: {
      type: "string",
      title: "7. Do you have in-house capability?",
      enum: ["Yes", "No"],
    },
    resourcesNeeded: {
      type: "string",
      title: "8. What resources or capabilities do you need?",
    },
  },
};

// ================= STEP 1 UI SCHEMA =================
const step1UiSchema = {
  hasProduct: { 
    "ui:widget": "radio", 
    "ui:options": { 
      inline: true 
    } 
  },
  productStage: { 
    "ui:widget": CustomSelectWidget
  },
  techChallenges: { 
    "ui:widget": "textarea", 
    "ui:options": { rows: 4 } 
  },
  currentTechnologies: {
    mobileApp: { 
      "ui:widget": "checkboxes", 
      "ui:options": { inline: true } 
    },
    webApp: { 
      "ui:widget": "checkboxes", 
      "ui:options": { inline: true } 
    },
    ai: { 
      "ui:widget": "checkboxes", 
      "ui:options": { inline: true } 
    },
  },
  futureTechnologies: {
    mobileApp: { 
      "ui:widget": "checkboxes", 
      "ui:options": { inline: true } 
    },
    webApp: { 
      "ui:widget": "checkboxes", 
      "ui:options": { inline: true } 
    },
    ai: { 
      "ui:widget": "checkboxes", 
      "ui:options": { inline: true } 
    },
  },
  roadmapFeatures: { 
    "ui:widget": "textarea", 
    "ui:options": { rows: 4 } 
  },
  hasCapabilities: { 
    "ui:widget": "radio", 
    "ui:options": { 
      inline: true 
    } 
  },
  resourcesNeeded: { 
    "ui:widget": "textarea", 
    "ui:options": { rows: 4 } 
  },
};

// ================= STEP 2 SCHEMA =================
const step2Schema = {
  type: "object",
  title: "Value Chain Technology Diagnostic",
  description: "The diagnostic is built around Porter's value chain framework. It helps SMEs to list technology that is used for each corporate function and identify if effective or not.",
  properties: {
    valueChainData: {
      type: "object",
      properties: generateValueChainProperties(),
    },
  },
};

// ================= CUSTOM GROUPED FORM COMPONENT =================
const GroupedValueChainForm = ({ formData, onChange }) => {
  const handleFieldChange = (funcKey, fieldName, value) => {
    const newFormData = { ...formData };
    if (!newFormData.valueChainData) newFormData.valueChainData = {};
    if (!newFormData.valueChainData[funcKey]) newFormData.valueChainData[funcKey] = {};
    newFormData.valueChainData[funcKey][fieldName] = value;
    onChange({ formData: newFormData });
  };

  const getFieldValue = (funcKey, fieldName) => {
    return formData?.valueChainData?.[funcKey]?.[fieldName] || '';
  };

  return (
    <div>
      {VALUE_CHAIN_GROUPS.map((group, groupIdx) => (
        <div key={groupIdx} className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-500">
            {group.group}
          </h3>
          {group.functionalAreas.map((area, areaIdx) => (
            <div key={areaIdx} className="mb-6 ml-4">
              <h4 className="text-lg font-semibold text-gray-700 mb-3 pl-2 border-l-4 border-gray-400">
                {area.area}
              </h4>
              <div className="space-y-6">
                {area.functions.map((func, funcIdx) => {
                  const funcKey = func.replace(/\s+/g, '');
                  
                  return (
                    <div key={funcIdx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h5 className="text-md font-medium text-gray-900 mb-3">{func}</h5>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Technology 1</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'tech1')}
                            onChange={(e) => handleFieldChange(funcKey, 'tech1', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., CRM Software"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose 1</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'purpose1')}
                            onChange={(e) => handleFieldChange(funcKey, 'purpose1', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Track customer interactions"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Technology 2</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'tech2')}
                            onChange={(e) => handleFieldChange(funcKey, 'tech2', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Accounting Software"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose 2</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'purpose2')}
                            onChange={(e) => handleFieldChange(funcKey, 'purpose2', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Manage finances"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Technology 3</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'tech3')}
                            onChange={(e) => handleFieldChange(funcKey, 'tech3', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Project Management Tool"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose 3</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'purpose3')}
                            onChange={(e) => handleFieldChange(funcKey, 'purpose3', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Track project progress"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Technology 4</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'tech4')}
                            onChange={(e) => handleFieldChange(funcKey, 'tech4', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Communication Platform"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose 4</label>
                          <input
                            type="text"
                            value={getFieldValue(funcKey, 'purpose4')}
                            onChange={(e) => handleFieldChange(funcKey, 'purpose4', e.target.value)}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Team communication"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Gaps Identified</label>
                          <textarea
                            value={getFieldValue(funcKey, 'gaps')}
                            onChange={(e) => handleFieldChange(funcKey, 'gaps', e.target.value)}
                            rows={3}
                            className="w-full bg-white border border-gray-300 rounded-md p-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="What technology gaps exist? What technology is needed for scaling?"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ================= MAIN COMPONENT =================
export default function TechnologyAssessment({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = ({ formData }) => {
    console.log("Form data updated:", formData);
    if (formData && typeof formData === 'object') {
      setFormData(formData);
      localStorage.setItem("technologyAssessmentData", JSON.stringify(formData));
    }
  };

  const handleNext = () => {
    if (activeStep === 0) {
      console.log("Current formData on Next:", formData);
      if (!formData.hasProduct) {
        alert("Please select whether you have a product (Yes/No)");
        return;
      }
      if (!formData.productStage) {
        alert("Please select your product stage");
        return;
      }
    }
    setActiveStep((p) => p + 1);
  };
  
  const handleBack = () => setActiveStep((p) => p - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Final form data:", formData);
    onSubmit?.(formData);
    localStorage.removeItem("technologyAssessmentData");
    setSubmitted(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem("technologyAssessmentData");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
          setFormData(parsed);
        }
      } catch (e) {
        console.error("Error loading saved data:", e);
      }
    }
  }, []);
  

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <CheckCircle2 className="mx-auto text-green-600 w-12 h-12" />
        <h2 className="text-2xl font-bold mt-4">Assessment Submitted Successfully</h2>
        <p className="text-gray-600 mt-2">Thank you for completing the technology assessment.</p>
        <Button className="mt-6" onClick={() => {
          setSubmitted(false);
          setFormData({});
          setActiveStep(0);
        }}>
          Start New Assessment
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b pb-4 mb-6">
          <h2 className="text-2xl font-bold">{ASSESSMENT_STEPS[activeStep].label}</h2>
          <p className="text-gray-600 mt-1">{ASSESSMENT_STEPS[activeStep].description}</p>
        </div>

        {activeStep === 0 ? (
          <div className="py-4">
            <Form
              schema={step1Schema}
              uiSchema={step1UiSchema}
              formData={formData}
              onChange={handleFormChange}
              validator={validator}
              omitExtraData={true}
              liveValidate={false}
              noHtml5Validate={true}
            >
              <div style={{ display: 'none' }} />
            </Form>
          </div>
        ) : (
          <div className="py-4">
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Use This Diagnostic</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                <li>1. For each function, list the technology you use and its purpose</li>
                <li>2. Identify areas where you believe you should be using technology but you're not</li>
                <li>3. Review each technology in use and determine if it will support your scale operations</li>
                <li>4. Where you don't use any technology but believe it is an important need for scale, indicate this in the key gaps column</li>
                <li>5. Do the same for situations where you have technology but believe it is not adequate to support your scale plan</li>
              </ul>
            </div>

            <GroupedValueChainForm
              formData={formData}
              onChange={handleFormChange}
            />
          </div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t">
          <Button 
            onClick={handleBack} 
            disabled={activeStep === 0}
            variant="outline"
          >
            Previous
          </Button>
          {activeStep === 0 ? (
            <Button 
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : null}
              {isLoading ? "Submitting..." : "Submit Assessment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}