import React, { useState, useEffect } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import {CssBaseline, Container, Paper, Typography, Button, Alert, Box, Stepper, Step,StepLabel,
CircularProgress} from "@mui/material";

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

//  Component accepts onSubmit prop
export default function TechnologyAssessment({ onSubmit }) {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Base technology assessment schema
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

  // Value Chain Properties
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
    support_internal_Finance: {
      type: "object",
      title: "Finance",
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
    support_internal_Management: {
      type: "object",
      title: "Management",
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
    primary_marketing_productDevelopment: {
      type: "object",
      title: "Product Development",
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
    primary_marketing_marketing: {
      type: "object",
      title: "Marketing",
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
    primary_marketing_sales: {
      type: "object",
      title: "Sales",
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
    operations_inboundLogistics: {
      type: "object",
      title: "Inbound Logistics",
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
    operations_procurement: {
      type: "object",
      title: "Procurement",
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
    operations_production: {
      type: "object",
      title: "Production",
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
    operations_warehousing: {
      type: "object",
      title: "Warehousing",
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
    operations_outboundLogistics: {
      type: "object",
      title: "Outbound Logistics",
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
    operations_orderProcessing: {
      type: "object",
      title: "Order Processing",
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
    operations_distribution: {
      type: "object",
      title: "Distribution",
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
    operations_customerService: {
      type: "object",
      title: "Customer Service",
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
    }
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

  // UI Schemas
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
    {
      type: "Group",
      label: "Finance",
      elements: createTechControls("#/properties/valueChain/properties/support_internal_Finance")
    },
    {
      type: "Group",
      label: "Management",
      elements: createTechControls("#/properties/valueChain/properties/support_internal_Management")
    },
    // Primary Services -> Marketing & Sales
    { type: "Label", text: "Primary Services — Marketing and Sales" },
    {
      type: "Group",
      label: "Product Development",
      elements: createTechControls("#/properties/valueChain/properties/primary_marketing_productDevelopment")
    },
    {
      type: "Group",
      label: "Marketing",
      elements: createTechControls("#/properties/valueChain/properties/primary_marketing_marketing")
    },
    {
      type: "Group",
      label: "Sales",
      elements: createTechControls("#/properties/valueChain/properties/primary_marketing_sales")
    },
    // Operations
    { type: "Label", text: "Primary Services — Operations" },
    {
      type: "Group",
      label: "Inbound Logistics",
      elements: createTechControls("#/properties/valueChain/properties/operations_inboundLogistics")
    },
    {
      type: "Group",
      label: "Procurement",
      elements: createTechControls("#/properties/valueChain/properties/operations_procurement")
    },
    {
      type: "Group",
      label: "Production",
      elements: createTechControls("#/properties/valueChain/properties/operations_production")
    },
    {
      type: "Group",
      label: "Warehousing",
      elements: createTechControls("#/properties/valueChain/properties/operations_warehousing")
    },
    {
      type: "Group",
      label: "Outbound Logistics",
      elements: createTechControls("#/properties/valueChain/properties/operations_outboundLogistics")
    },
    {
      type: "Group",
      label: "Order Processing",
      elements: createTechControls("#/properties/valueChain/properties/operations_orderProcessing")
    },
    {
      type: "Group",
      label: "Distribution",
      elements: createTechControls("#/properties/valueChain/properties/operations_distribution")
    },
    {
      type: "Group",
      label: "Customer Service",
      elements: createTechControls("#/properties/valueChain/properties/operations_customerService")
    }
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
    //  validation for current step
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

  // handleSubmit  calls the onSubmit prop if provided
  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Technology Assessment submitted:", formData);
      
      //  onSubmit HANDLER
      if (onSubmit) {
        // Pass an object with 'schema' property 
        onSubmit({ schema: schema });
      } else {
        // Fallback: if no onSubmit prop provided, log to console
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

  // Render current step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="h6" gutterBottom color="primary">
              Assessment One: Technology Overview
            </Typography>
            
            {!formData.hasProduct && (
              <Alert severity="info" sx={{ mb: 3 }}>
                Please complete all required fields marked with *
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
            <Typography variant="h6" gutterBottom color="primary">
              Assessment Two: Porter's Value Chain Diagnostic
            </Typography>
            
            <Alert severity="warning" sx={{ mb: 3 }}>
              Fill in the technologies used for each business function and identify any gaps.
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
        return <Typography>Unknown step</Typography>;
    }
  };

  if (submitted) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper elevation={4} sx={{ p: 8, textAlign: "center" }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            <Typography variant="h5">Assessment Submitted Successfully!</Typography>
          </Alert>
          <Typography paragraph>
            Thank you for completing the Technology Assessment.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => {
              setSubmitted(false);
              setActiveStep(0);
            }}
          >
            Start New Assessment
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {ASSESSMENT_STEPS.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="subtitle1">{step.label}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Technology Assessment
          </Typography>

          {renderStepContent(activeStep)}

          {/* Navigation Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Previous
            </Button>
            
            <Box>
              {activeStep === ASSESSMENT_STEPS.length - 1 ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                  {isLoading ? "Submitting..." : "Submit Assessment"}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}