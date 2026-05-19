import React, { useState, useEffect } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { shadcnTheme } from "./shadcn-theme";

import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

// ================= STEP CONFIG =================
const ASSESSMENT_STEPS = [
  { label: "Technology Assessment", description: "Basic product information" },
  { label: "Value Chain Diagnostic", description: "Porter's Value Chain analysis" },
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
            enum: [
              "Virtual/Augmented Reality",
              "Cryptocurrency",
              "Other",
            ],
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
            enum: [
              "Virtual/Augmented Reality",
              "Cryptocurrency",
              "Other",
            ],
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
    "ui:widget": "select",
    "ui:options": {
      placeholder: "Select an option"
    }
  },

  productStage: {
    "ui:widget": "select",
  },

  // FIX #1: Textarea that grows and allows Enter key for new lines
  techChallenges: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 4,
      placeholder: "Enter your technology challenges (press Enter to add new lines)"
    }
  },

  // FIX #2: Checkboxes with proper spacing
  currentTechnologies: {
    "ui:options": {
      classNames: "border-0 p-0 m-0",
      label: false
    },
    mobileApp: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true,
        classNames: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      }
    },
    webApp: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true,
        classNames: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      }
    },
    ai: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true,
        classNames: "grid grid-cols-1 md:grid-cols-3 gap-6"
      }
    },
  },

  futureTechnologies: {
    "ui:options": {
      classNames: "border-0 p-0 m-0",
      label: false
    },
    mobileApp: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true,
        classNames: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      }
    },
    webApp: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true,
        classNames: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      }
    },
    ai: {
      "ui:widget": "checkboxes",
      "ui:options": {
        inline: true,
        classNames: "grid grid-cols-1 md:grid-cols-3 gap-6"
      }
    },
  },

  // FIX #3: Textarea for roadmap (grows with Enter key)
  roadmapFeatures: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 4,
      placeholder: "Enter your roadmap features (press Enter to add new lines)"
    }
  },

  hasCapabilities: {
    "ui:widget": "select",
    "ui:options": {
      placeholder: "Select an option"
    }
  },

  // FIX #4: Textarea for resources needed (grows with Enter key)
  resourcesNeeded: {
    "ui:widget": "textarea",
    "ui:options": {
      rows: 4,
      placeholder: "Enter resources or capabilities needed (press Enter to add new lines)"
    }
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

  const handleNext = () => setActiveStep((p) => p + 1);
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
        <h2 className="text-2xl font-bold mt-4">
          Assessment Submitted Successfully
        </h2>

        <Button className="mt-6" onClick={() => setSubmitted(false)}>
          Start New Assessment
        </Button>
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

          <div className="flex justify-between mt-8 pt-4 border-t">
            <Button onClick={handleBack} disabled={activeStep === 0}>
              Previous
            </Button>

            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}