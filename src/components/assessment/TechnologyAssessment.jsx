import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { shadcnTheme } from "./shadcn-theme";

// Shadcn UI components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle2 } from "lucide-react";

const ASSESSMENT_STEPS = [
  { label: "Technology Assessment", description: "Basic product information" },
  { label: "Value Chain Diagnostic", description: "Porter's Value Chain analysis" },
];

// Value Chain sections
const VALUE_CHAIN_SECTIONS = [
  { key: "hr", title: "HR" },
  { key: "finance", title: "Finance" },
  { key: "management", title: "Management" },
  { key: "productDevelopment", title: "Product Development" },
  { key: "marketing", title: "Marketing" },
  { key: "sales", title: "Sales" },
  { key: "inboundLogistics", title: "Inbound Logistics" },
  { key: "procurement", title: "Procurement" },
  { key: "production", title: "Production" },
  { key: "warehousing", title: "Warehousing" },
  { key: "outboundLogistics", title: "Outbound Logistics" },
  { key: "orderProcessing", title: "Order Processing" },
  { key: "distribution", title: "Distribution" },
  { key: "customerService", title: "Customer Service" },
];

export default function TechnologyAssessment({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 Schema
  const step1Schema = {
    type: "object",
    required: ["hasProduct", "productStage"],
    properties: {
      hasProduct: {
        type: "string",
        title: "1. Do you have a product?",
        enum: ["Yes", "No", "In Development"],
        enumNames: ["Yes", "No", "In Development"],
      },
      productStage: {
        type: "string",
        title: "2. At what stage is your product?",
        enum: ["Prototype", "MVP", "Full Product"],
        enumNames: ["Prototype", "MVP", "Full Product"],
      },
      techChallenges: {
        type: "string",
        title: "3. What technology challenges do you currently have?",
        description: "List your main technical challenges",
      },
      currentTechnologies: {
        type: "object",
        title: "4. Does your product currently use any of these technologies?",
        properties: {
          mobileApp: {
            type: "object",
            title: "Mobile App",
            properties: {
              machineLearning: { type: "boolean", title: "Machine Learning" },
              iot: { type: "boolean", title: "Internet of Things" },
              nft: { type: "boolean", title: "NFT" },
            },
          },
          webApp: {
            type: "object",
            title: "Web App",
            properties: {
              visualRecognition: { type: "boolean", title: "Visual Recognition" },
              blockchain: { type: "boolean", title: "Blockchain" },
              other: { type: "string", title: "Other" },
            },
          },
          ai: {
            type: "object",
            title: "AI",
            properties: {
              virtualAugmentedReality: { type: "boolean", title: "Virtual/Augmented Reality" },
              crypto: { type: "boolean", title: "Cryptocurrency" },
              other: { type: "string", title: "Other" },
            },
          },
        },
      },
      futureTechnologies: {
        type: "object",
        title: "5. Do you plan to incorporate any of these technologies?",
        properties: {
          mobileApp: {
            type: "object",
            title: "Mobile App",
            properties: {
              machineLearning: { type: "boolean", title: "Machine Learning" },
              iot: { type: "boolean", title: "Internet of Things" },
              nft: { type: "boolean", title: "NFT" },
            },
          },
          webApp: {
            type: "object",
            title: "Web App",
            properties: {
              visualRecognition: { type: "boolean", title: "Visual Recognition" },
              blockchain: { type: "boolean", title: "Blockchain" },
              other: { type: "string", title: "Other" },
            },
          },
          ai: {
            type: "object",
            title: "AI",
            properties: {
              virtualAugmentedReality: { type: "boolean", title: "Virtual/Augmented Reality" },
              crypto: { type: "boolean", title: "Cryptocurrency" },
              other: { type: "string", title: "Other" },
            },
          },
        },
      },
      roadmapFeatures: {
        type: "string",
        title: "6. What features do you have in your roadmap?",
      },
      hasCapabilities: {
        type: "string",
        title: "7. Do you have the capabilities in-house to build the products?",
        enum: ["Yes", "No"],
        enumNames: ["Yes", "No"],
      },
      resourcesNeeded: {
        type: "string",
        title: "8. If No, what resources or capabilities do you need?",
      },
    },
  };

  // Step 2 Schema
  const step2Schema = {
    type: "object",
    properties: VALUE_CHAIN_SECTIONS.reduce((acc, section) => {
      acc[section.key] = {
        type: "object",
        title: section.title,
        properties: {
          tech1: { type: "string", title: "Technology 1" },
          purpose1: { type: "string", title: "Purpose 1" },
          tech2: { type: "string", title: "Technology 2" },
          purpose2: { type: "string", title: "Purpose 2" },
          tech3: { type: "string", title: "Technology 3" },
          purpose3: { type: "string", title: "Purpose 3" },
          tech4: { type: "string", title: "Technology 4" },
          purpose4: { type: "string", title: "Purpose 4" },
          gaps: { 
            type: "string", 
            title: "Gaps Identified",
          },
        },
      };
      return acc;
    }, {}),
  };

  // UI Schemas 
  const step1UiSchema = {
    "ui:options": {
      "label": false
    },
    hasProduct: {
      "ui:widget": "select",
      "ui:placeholder": "Select product status",
    },
    productStage: {
      "ui:widget": "select",
      "ui:placeholder": "Select product stage",
    },
    techChallenges: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 4,
      },
    },
    currentTechnologies: {
      "ui:options": {
        className: "w-full"
      }
    },
    futureTechnologies: {
      "ui:options": {
        className: "w-full"
      }
    },
    roadmapFeatures: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 4,
      },
    },
    hasCapabilities: {
      "ui:widget": "select",
      "ui:placeholder": "Select capability status",
    },
    resourcesNeeded: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 4,
      },
    },
  };

  const step2UiSchema = {
    "ui:description": "Fill in technologies for each business function",
    "ui:options": {
      "label": false
    },
    ...Object.fromEntries(
      VALUE_CHAIN_SECTIONS.map(section => [
        section.key,
        {
          "ui:options": {
            className: "w-full"
          },
          tech1: { "ui:options": { className: "w-full" } },
          purpose1: { "ui:options": { className: "w-full" } },
          tech2: { "ui:options": { className: "w-full" } },
          purpose2: { "ui:options": { className: "w-full" } },
          tech3: { "ui:options": { className: "w-full" } },
          purpose3: { "ui:options": { className: "w-full" } },
          tech4: { "ui:options": { className: "w-full" } },
          purpose4: { "ui:options": { className: "w-full" } },
          gaps: { 
            "ui:widget": "textarea",
            "ui:options": { 
              rows: 3,
              className: "w-full"
            }
          },
        }
      ])
    ),
  };

  // UI Schema Logging
  useEffect(() => {
    const currentSchema = activeStep === 0 ? step1Schema : step2Schema;
    const currentUiSchema = activeStep === 0 ? step1UiSchema : step2UiSchema;
    
    console.log(" ====== TECHNOLOGY ASSESSMENT UI SCHEMA ======");
    console.log(`Step: ${activeStep + 1} - ${ASSESSMENT_STEPS[activeStep]?.label}`);
    console.log("\n UI Schema:");
    console.log(JSON.stringify(currentUiSchema, null, 2));
    console.log("\n JSON Schema:");
    console.log(JSON.stringify(currentSchema, null, 2));
    console.log("===============================================\n");
  }, [activeStep]);

  // Handle form change
  const handleFormChange = ({ formData }) => {
    setFormData(formData);
    localStorage.setItem("technologyAssessmentData", JSON.stringify(formData));
  };

  // Handle next step
  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.hasProduct || !formData.productStage) {
        alert("Please complete all required fields before proceeding.");
        return;
      }
    }
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  // Handle submission
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("✅ Form submitted:", formData);
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      localStorage.removeItem("technologyAssessmentData");
      setSubmitted(true);
      
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem("technologyAssessmentData");
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to load saved data:", error);
      }
    }
  }, []);

  if (submitted) {
    return (
      <div className="container max-w-2xl mx-auto py-12">
        <Card className="text-center shadow-xl border-green-200">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-700">
              Assessment Submitted Successfully!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Thank you for completing the Technology Assessment.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              size="lg"
              onClick={() => {
                setSubmitted(false);
                setActiveStep(0);
                setFormData({});
              }}
            >
              Start New Assessment
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <Card className="shadow-2xl border-0">
          <CardHeader className="border-b pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900">
              Technology Assessment
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Complete the assessment in {ASSESSMENT_STEPS.length} steps
            </CardDescription>
            
            {/* Progress Steps */}
            <div className="flex justify-between mt-8">
              {ASSESSMENT_STEPS.map((step, index) => (
                <div key={step.label} className="flex flex-col items-center flex-1">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold
                    ${index <= activeStep 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-400'
                    }
                    ${index === activeStep ? 'ring-4 ring-blue-200' : ''}
                  `}>
                    {index + 1}
                  </div>
                  <div className="mt-3 text-center px-2">
                    <div className="font-semibold text-gray-800">{step.label}</div>
                    <div className="text-sm text-gray-500 mt-1">{step.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardHeader>
          
          <CardContent className="pt-8">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {ASSESSMENT_STEPS[activeStep]?.label}
              </h2>
              
              {/* Alerts */}
              {activeStep === 0 && !formData.hasProduct && (
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertTitle>Information Required</AlertTitle>
                  <AlertDescription>
                    Please complete all required fields marked with *
                  </AlertDescription>
                </Alert>
              )}
              
              {activeStep === 1 && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTitle>Instructions</AlertTitle>
                  <AlertDescription>
                    Fill in the technologies used for each business function and identify any gaps.
                  </AlertDescription>
                </Alert>
              )}

              {/* RJSF Form */}
              <div className="w-full">
                <Form
                  schema={activeStep === 0 ? step1Schema : step2Schema}
                  uiSchema={activeStep === 0 ? step1UiSchema : step2UiSchema}
                  formData={formData}
                  onChange={handleFormChange}
                  validator={validator}
                  {...shadcnTheme}
                  className="w-full"
                >
                  <div></div>
                </Form>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-8 border-t">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Previous
                </Button>
                
                {activeStep === ASSESSMENT_STEPS.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Assessment"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}