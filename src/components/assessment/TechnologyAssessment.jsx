import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { shadcnTheme } from "./shadcn-theme";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, CheckCircle2 } from "lucide-react";

// ================= STEP CONFIG =================
const ASSESSMENT_STEPS = [
  { label: "Technology Assessment", description: "Basic product information" },
  { label: "Value Chain Diagnostic", description: "Porter's Value Chain analysis" },
];

// ================= VALUE CHAIN SECTIONS =================
const VALUE_CHAIN_SECTIONS = [
  // Support Services
  { group: "Support Services", area: "Internal Operation", function: "HR" },
  { group: "Support Services", area: "Internal Operation", function: "Finance" },
  { group: "Support Services", area: "Internal Operation", function: "Management" },
  
  // Primary Services - Marketing and Sales
  { group: "Primary Services", area: "Marketing and Sales", function: "Product Development" },
  { group: "Primary Services", area: "Marketing and Sales", function: "Marketing" },
  { group: "Primary Services", area: "Marketing and Sales", function: "Sales" },
  
  // Primary Services - Operations
  { group: "Primary Services", area: "Operations", function: "Inbound Logistics" },
  { group: "Primary Services", area: "Operations", function: "Procurement" },
  { group: "Primary Services", area: "Operations", function: "Production" },
  { group: "Primary Services", area: "Operations", function: "Warehousing" },
  { group: "Primary Services", area: "Operations", function: "Outbound Logistics" },
  { group: "Primary Services", area: "Operations", function: "Order Processing" },
  { group: "Primary Services", area: "Operations", function: "Distribution" },
  { group: "Primary Services", area: "Operations", function: "Customer Service" },
];

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
  hasProduct: { "ui:widget": "select", "ui:options": { placeholder: "Select an option" } },
  productStage: { "ui:widget": "select" },
  techChallenges: { "ui:widget": "textarea", "ui:options": { rows: 4 } },
  currentTechnologies: {
    "ui:options": { classNames: "border-0 p-0 m-0", label: false },
    mobileApp: { "ui:widget": "checkboxes", "ui:options": { inline: true, classNames: "grid grid-cols-3 gap-4 mb-6" } },
    webApp: { "ui:widget": "checkboxes", "ui:options": { inline: true, classNames: "grid grid-cols-3 gap-4 mb-6" } },
    ai: { "ui:widget": "checkboxes", "ui:options": { inline: true, classNames: "grid grid-cols-3 gap-4" } },
  },
  futureTechnologies: {
    "ui:options": { classNames: "border-0 p-0 m-0", label: false },
    mobileApp: { "ui:widget": "checkboxes", "ui:options": { inline: true, classNames: "grid grid-cols-3 gap-4 mb-6" } },
    webApp: { "ui:widget": "checkboxes", "ui:options": { inline: true, classNames: "grid grid-cols-3 gap-4 mb-6" } },
    ai: { "ui:widget": "checkboxes", "ui:options": { inline: true, classNames: "grid grid-cols-3 gap-4" } },
  },
  roadmapFeatures: { "ui:widget": "textarea", "ui:options": { rows: 4 } },
  hasCapabilities: { "ui:widget": "select", "ui:options": { placeholder: "Select an option" } },
  resourcesNeeded: { "ui:widget": "textarea", "ui:options": { rows: 4 } },
};

// ================= STEP 2 SCHEMA =================
const step2Schema = {
  type: "object",
  title: "Value Chain Technology Diagnostic",
  description: "The diagnostic is built around Porter's value chain framework. It helps SMEs to list technology that is used for each corporate function and identify if effective or not.",
  properties: {
    valueChainData: {
      type: "object",
      properties: VALUE_CHAIN_SECTIONS.reduce((acc, section) => {
        acc[section.function.replace(/\s+/g, '')] = {
          type: "object",
          title: section.function,
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
        return acc;
      }, {}),
    },
  },
};

// ================= STEP 2 UI SCHEMA (NO EXCESSIVE BORDERS) =================
const step2UiSchema = {
  valueChainData: {
    "ui:options": {
      classNames: "space-y-4",
    },
    ...Object.fromEntries(
      VALUE_CHAIN_SECTIONS.map(section => {
        const key = section.function.replace(/\s+/g, '');
        return [
          key,
          {
            // REMOVED: border, rounded-lg, shadow-sm - now just a simple bottom border
            "ui:options": {
              classNames: "pb-4 mb-4 border-b border-gray-200 last:border-b-0",
            },
            tech1: { "ui:options": { classNames: "w-full mb-2" } },
            purpose1: { "ui:options": { classNames: "w-full mb-3" } },
            tech2: { "ui:options": { classNames: "w-full mb-2" } },
            purpose2: { "ui:options": { classNames: "w-full mb-3" } },
            tech3: { "ui:options": { classNames: "w-full mb-2" } },
            purpose3: { "ui:options": { classNames: "w-full mb-3" } },
            tech4: { "ui:options": { classNames: "w-full mb-2" } },
            purpose4: { "ui:options": { classNames: "w-full mb-3" } },
            gaps: {
              "ui:widget": "textarea",
              "ui:options": {
                rows: 2,
                classNames: "w-full border border-blue-200 bg-blue-50 rounded-md p-2",
              },
            },
          },
        ];
      })
    ),
  },
};

// ================= COMPONENT =================
export default function TechnologyAssessment({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormChange = ({ formData }) => {
    setFormData(formData);
    localStorage.setItem("technologyAssessmentData", JSON.stringify(formData));
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.hasProduct || !formData.productStage) {
        alert("Please complete all required fields before proceeding.");
        return;
      }
    }
    setActiveStep((p) => p + 1);
  };
  
  const handleBack = () => setActiveStep((p) => p - 1);

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    onSubmit?.(formData);
    localStorage.removeItem("technologyAssessmentData");
    setSubmitted(true);
    setIsLoading(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem("technologyAssessmentData");
    if (saved) setFormData(JSON.parse(saved));
  }, []);

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <CheckCircle2 className="mx-auto text-green-600 w-12 h-12" />
        <h2 className="text-2xl font-bold mt-4">Assessment Submitted Successfully</h2>
        <Button className="mt-6" onClick={() => setSubmitted(false)}>Start New Assessment</Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg">
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
              {...shadcnTheme}
            >
              <div />
            </Form>
          </div>
        ) : (
          <div className="py-4">
            {/* Header Instructions */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">How to Use This Diagnostic</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                <li>1. For each area, list the technology you use and its purpose</li>
                <li>2. Identify areas where you believe you should be using technology but you're not</li>
                <li>3. Review each technology in use and determine if it will support your scale operations</li>
                <li>4. Where you don't use any technology but believe it is an important need for scale, indicate this in the key gaps column</li>
                <li>5. Do the same for situations where you have technology but believe it is not adequate to support your scale plan</li>
              </ul>
            </div>

            <Form
              schema={step2Schema}
              uiSchema={step2UiSchema}
              formData={formData}
              onChange={handleFormChange}
              validator={validator}
              {...shadcnTheme}
            >
              <div />
            </Form>
          </div>
        )}

        <div className="flex justify-between mt-8 pt-4 border-t">
          <Button onClick={handleBack} disabled={activeStep === 0}>Previous</Button>
          {activeStep === 0 ? (
            <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
              {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Submit Assessment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}