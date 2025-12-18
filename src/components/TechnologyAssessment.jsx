import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";

// Remove Material-UI imports and replace with shadcn components
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const ASSESSMENT_STEPS = [
  { label: "Technology Assessment", description: "Basic product information" },
  { label: "Value Chain Diagnostic", description: "Porter's Value Chain analysis" }
];

const createTechControls = (path) => [
  { type: "Control", scope: `${path}/properties/tech1` },
  { type: "Control", scope: `${path}/properties/purpose1` },
  { type: "Control", scope: `${path}/properties/tech2` },
  { type: "Control", scope: `${path}/properties/purpose2` },
  { type: "Control", scope: `${path}/properties/tech3` },
  { type: "Control", scope: `${path}/properties/purpose3` },
  { type: "Control", scope: `${path}/properties/tech4` },
  { type: "Control", scope: `${path}/properties/purpose4` },
  { 
    type: "Control", 
    scope: `${path}/properties/gaps`,
    options: { multi: true }
  }
];

export default function TechnologyAssessment({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Base technology assessment schema (unchanged)
  const baseSchema = {
    type: "object",
    title: "Technology Assessment",
    required: ["hasProduct", "productStage"],
    properties: {
      hasProduct: {
        type: "string",
        title: "1. Do you have a product?",
        enum: ["Yes", "No", "In Development"],
        enumNames: ["Yes", "No", "In Development"]
      },
      productStage: {
        type: "string",
        title: "2. At what stage is your product?",
        enum: ["Prototype", "MVP", "Full Product"],
        enumNames: ["Prototype", "MVP", "Full Product"]
      },
      techChallenges: {
        type: "string",
        title: "3. What technology challenges do you currently have?",
        description: "List your main technical challenges"
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
              nft: { type: "boolean", title: "NFT" }
            }
          },
          webApp: {
            type: "object",
            title: "Web App",
            properties: {
              visualRecognition: { type: "boolean", title: "Visual Recognition" },
              blockchain: { type: "boolean", title: "Blockchain" },
              other: { type: "string", title: "Other" }
            }
          },
          ai: {
            type: "object",
            title: "AI",
            properties: {
              virtualAugmentedReality: { type: "boolean", title: "Virtual/Augmented Reality" },
              crypto: { type: "boolean", title: "Cryptocurrency" },
              other: { type: "string", title: "Other" }
            }
          }
        }
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
              nft: { type: "boolean", title: "NFT" }
            }
          },
          webApp: {
            type: "object",
            title: "Web App",
            properties: {
              visualRecognition: { type: "boolean", title: "Visual Recognition" },
              blockchain: { type: "boolean", title: "Blockchain" },
              other: { type: "string", title: "Other" }
            }
          },
          ai: {
            type: "object",
            title: "AI",
            properties: {
              virtualAugmentedReality: { type: "boolean", title: "Virtual/Augmented Reality" },
              crypto: { type: "boolean", title: "Cryptocurrency" },
              other: { type: "string", title: "Other" }
            }
          }
        }
      },
      roadmapFeatures: {
        type: "string",
        title: "6. What features do you have in your roadmap?"
      },
      hasCapabilities: {
        type: "string",
        title: "7. Do you have the capabilities in-house to build the products?",
        enum: ["Yes", "No"],
        enumNames: ["Yes", "No"]
      },
      resourcesNeeded: {
        type: "string",
        title: "8. If No, what resources or capabilities do you need?"
      }
    }
  };

  // Value Chain Properties (unchanged)
  const valueChainProps = {
    support_internal_HR: {
      type: "object",
      title: "HR",
      properties: {
        tech1: { type: "string", title: "Tech 1" },
        purpose1: { type: "string", title: "Purpose 1" },
        tech2: { type: "string", title: "Tech 2" },
        purpose2: { type: "string", title: "Purpose 2" },
        tech3: { type: "string", title: "Tech 3" },
        purpose3: { type: "string", title: "Purpose 3" },
        tech4: { type: "string", title: "Tech 4" },
        purpose4: { type: "string", title: "Purpose 4" },
        gaps: { type: "string", title: "Gaps Identified" }
      }
    },
    // ... (all other valueChainProps remain unchanged - too long to include here)
  };

  // Combined schema
  const schema = {
    ...baseSchema,
    properties: {
      ...baseSchema.properties,
      valueChain: {
        type: "object",
        title: "Porter's Value Chain Diagnostic",
        properties: valueChainProps
      }
    }
  };

  // UI Schemas (unchanged)
  const assessmentOneUISchema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/hasProduct" },
      { type: "Control", scope: "#/properties/productStage" },
      { 
        type: "Control", 
        scope: "#/properties/techChallenges",
        options: { multi: true, rows: 3 }
      },
      {
        type: "Group",
        label: "Current Technologies",
        elements: [{ type: "Control", scope: "#/properties/currentTechnologies" }]
      },
      {
        type: "Group",
        label: "Future Technologies",
        elements: [{ type: "Control", scope: "#/properties/futureTechnologies" }]
      },
      { 
        type: "Control", 
        scope: "#/properties/roadmapFeatures",
        options: { multi: true, rows: 3 }
      },
      { type: "Control", scope: "#/properties/hasCapabilities" },
      { 
        type: "Control", 
        scope: "#/properties/resourcesNeeded",
        rule: {
          effect: "SHOW",
          condition: {
            scope: "#/properties/hasCapabilities",
            schema: { const: "No" }
          }
        }
      }
    ]
  };

  const assessmentTwoUISchema = {
    type: "VerticalLayout",
    elements: [
      // Support Services group
      { type: "Label", text: "Support Services — Internal Operation" },
      {
        type: "Group",
        label: "HR",
        elements: createTechControls("#/properties/valueChain/properties/support_internal_HR")
      },
      // ... (all other UI schema elements remain unchanged)
    ]
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("technologyAssessmentData");
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse saved data:", error);
      }
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem("technologyAssessmentData", JSON.stringify(formData));
    }
  }, [formData]);

  const handleChange = ({ data, errors }) => {
    if (errors && errors.length > 0) {
      console.warn("Form validation errors:", errors);
      return;
    }
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    // Validation for current step
    if (activeStep === 0) {
      if (!formData.hasProduct || !formData.productStage) {
        alert("Please fill in all required fields before proceeding.");
        return;
      }
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Technology Assessment submitted:", formData);
      
      // Call onSubmit handler
      if (onSubmit) {
        onSubmit({ schema: schema });
      } else {
        console.log("No onSubmit prop provided. Schema would be:");
        console.log(JSON.stringify(schema));
      }
      
      // Clear localStorage after successful submission
      localStorage.removeItem("technologyAssessmentData");
      
      setSubmitted(true);
      setFormData({});
      
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Failed to submit. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate progress percentage
  const progressValue = ((activeStep + 1) / ASSESSMENT_STEPS.length) * 100;

  // Render current step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Assessment One: Technology Overview
            </h2>
            
            {!formData.hasProduct && (
              <Alert className="mb-6">
                <AlertTitle>Information Required</AlertTitle>
                <AlertDescription>
                  Please complete all required fields marked with *
                </AlertDescription>
              </Alert>
            )}
            
            <JsonForms
              schema={schema}
              uischema={assessmentOneUISchema}
              renderers={materialRenderers}
              cells={materialCells}
              data={formData}
              onChange={handleChange}
            />
          </>
        );
        
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold text-primary mb-4">
              Assessment Two: Porter's Value Chain Diagnostic
            </h2>
            
            <Alert variant="warning" className="mb-6">
              <AlertTitle>Important Instructions</AlertTitle>
              <AlertDescription>
                Fill in the technologies used for each business function and identify any gaps.
              </AlertDescription>
            </Alert>
            
            <JsonForms
              schema={schema}
              uischema={assessmentTwoUISchema}
              renderers={materialRenderers}
              cells={materialCells}
              data={formData}
              onChange={handleChange}
            />
          </>
        );
        
      default:
        return <p className="text-lg">Unknown step</p>;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <Alert variant="success" className="mb-6">
            <AlertTitle className="text-2xl">Assessment Submitted Successfully!</AlertTitle>
            <AlertDescription className="mt-2">
              Thank you for completing the Technology Assessment.
            </AlertDescription>
          </Alert>
          <Button 
            className="mt-4"
            onClick={() => {
              setSubmitted(false);
              setActiveStep(0);
            }}
          >
            Start New Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {activeStep + 1} of {ASSESSMENT_STEPS.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progressValue)}%
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {/* Stepper Labels */}
        <div className="flex justify-between mb-10">
          {ASSESSMENT_STEPS.map((step, index) => (
            <div 
              key={step.label} 
              className={`text-center ${index <= activeStep ? 'opacity-100' : 'opacity-50'}`}
            >
              <div className={`text-lg font-semibold ${index === activeStep ? 'text-primary' : 'text-gray-700'}`}>
                {step.label}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {step.description}
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Technology Assessment
          </h1>

          {renderStepContent(activeStep)}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              disabled={activeStep === 0}
              onClick={handleBack}
              className="min-w-[120px]"
            >
              Previous
            </Button>
            
            <div>
              {activeStep === ASSESSMENT_STEPS.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="min-w-[180px] bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : "Submit Assessment"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="min-w-[120px]"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}