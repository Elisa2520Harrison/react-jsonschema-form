import React, { useState } from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import {
  CssBaseline,
  Container,
  Paper,
  Typography,
  Button,
  Alert,
  Box
} from "@mui/material";

export default function TechnologyAssessment() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({});

  /* ---------------------------
     ASSESSMENT 1: exactly as you provided
     --------------------------- */
  const baseSchema = {
    type: "object",
    title: "Technology Assessment",
    required: ["hasProduct", "productStage"],
    properties: {
      hasProduct: {
        type: "string",
        title: "1. Do you have a product?",
        enum: ["Yes", "No", "In Development"]
      },

      productStage: {
        type: "string",
        title: "2. At what stage is your product?",
        enum: ["Prototype", "MVP", "Full Product"]
      },

      techChallenges: {
        type: "string",
        title: "3. What technology challenges do you currently have? (list them)"
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
              vitualaugmentedReality: {
                type: "boolean",
                title: "Virtual/Augmented Reality"
              },
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
              virtualaugmentedreality: {
                type: "boolean",
                title: "Virtual/Augmented Reality"
              },
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
        enum: ["Yes", "No"]
      },

      resourcesNeeded: {
        type: "string",
        title: "8. If No, what resources or capabilities do you need?"
      }
    }
  };

  /* ---------------------------
     ASSESSMENT 2: Porter Value Chain (Option B - grouped vertical layout)
     Each function is an object with tech1..tech4, purpose1..purpose4, gaps
     --------------------------- */
  const valueChainProps = {
    // Support Services -> Internal Operation -> HR / Finance / Management
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

    // Primary Services -> Marketing and Sales -> Product Development, Marketing, Sales
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

    // Operations -> detailed functions
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

  // combine into final schema without touching your Assessment 1 fields
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

  /* ---------------------------
     UI Schemas
     - Assessment 1 UI: same as you had
     - Assessment 2 UI: grouped, explicit controls (no dropdowns)
     --------------------------- */
  const assessmentOneUISchema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/hasProduct" },
      { type: "Control", scope: "#/properties/productStage" },
      { type: "Control", scope: "#/properties/techChallenges" },

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

      { type: "Control", scope: "#/properties/roadmapFeatures" },
      { type: "Control", scope: "#/properties/hasCapabilities" },
      { type: "Control", scope: "#/properties/resourcesNeeded" }
    ]
  };

  // helper to build controls for a function object (keeps UI schema tidy)
  const functionControls = (basePath) => [
    { type: "Control", scope: `${basePath}/properties/tech1` },
    { type: "Control", scope: `${basePath}/properties/purpose1` },
    { type: "Control", scope: `${basePath}/properties/tech2` },
    { type: "Control", scope: `${basePath}/properties/purpose2` },
    { type: "Control", scope: `${basePath}/properties/tech3` },
    { type: "Control", scope: `${basePath}/properties/purpose3` },
    { type: "Control", scope: `${basePath}/properties/tech4` },
    { type: "Control", scope: `${basePath}/properties/purpose4` },
    { type: "Control", scope: `${basePath}/properties/gaps` }
  ];

  const assessmentTwoUISchema = {
    type: "VerticalLayout",
    elements: [
      // Support Services group
      { type: "Label", text: "Support Services — Internal Operation" },

      {
        type: "Group",
        label: "HR",
        elements: functionControls("#/properties/valueChain/properties/support_internal_HR")
      },

      {
        type: "Group",
        label: "Finance",
        elements: functionControls("#/properties/valueChain/properties/support_internal_Finance")
      },

      {
        type: "Group",
        label: "Management",
        elements: functionControls("#/properties/valueChain/properties/support_internal_Management")
      },

      // Primary Services -> Marketing & Sales
      { type: "Label", text: "Primary Services — Marketing and Sales" },

      {
        type: "Group",
        label: "Product Development",
        elements: functionControls("#/properties/valueChain/properties/primary_marketing_productDevelopment")
      },

      {
        type: "Group",
        label: "Marketing",
        elements: functionControls("#/properties/valueChain/properties/primary_marketing_marketing")
      },

      {
        type: "Group",
        label: "Sales",
        elements: functionControls("#/properties/valueChain/properties/primary_marketing_sales")
      },

      // Operations
      { type: "Label", text: "Primary Services — Operations" },

      {
        type: "Group",
        label: "Inbound Logistics",
        elements: functionControls("#/properties/valueChain/properties/operations_inboundLogistics")
      },

      {
        type: "Group",
        label: "Procurement",
        elements: functionControls("#/properties/valueChain/properties/operations_procurement")
      },

      {
        type: "Group",
        label: "Production",
        elements: functionControls("#/properties/valueChain/properties/operations_production")
      },

      {
        type: "Group",
        label: "Warehousing",
        elements: functionControls("#/properties/valueChain/properties/operations_warehousing")
      },

      {
        type: "Group",
        label: "Outbound Logistics",
        elements: functionControls("#/properties/valueChain/properties/operations_outboundLogistics")
      },

      {
        type: "Group",
        label: "Order Processing",
        elements: functionControls("#/properties/valueChain/properties/operations_orderProcessing")
      },

      {
        type: "Group",
        label: "Distribution",
        elements: functionControls("#/properties/valueChain/properties/operations_distribution")
      },

      {
        type: "Group",
        label: "Customer Service",
        elements: functionControls("#/properties/valueChain/properties/operations_customerService")
      }
    ]
  };

  // keep data in state so it persists across pages
  const handleChange = ({ data }) => {
    setFormData(data || {});
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Technology Assessment submitted:", formData);
    // replace console.log with your API call (axios/fetch) if needed
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" className="py-10">
        <Paper elevation={4} className="p-8 rounded-xl">
          <Typography variant="h4" gutterBottom>
            Technology Assessment
          </Typography>

          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Technology Assessment submitted successfully!
            </Alert>
          )}

          {step === 1 && (
            <>
              <Typography variant="h6" gutterBottom>
                Assessment One
              </Typography>

              <JsonForms
                schema={schema}
                uischema={assessmentOneUISchema}
                renderers={materialRenderers}
                cells={materialCells}
                data={formData}
                onChange={handleChange}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" onClick={() => setStep(2)}>
                  Next
                </Button>
              </Box>
            </>
          )}

          {step === 2 && (
            <>
              <Typography variant="h6" gutterBottom>
                Assessment Two — Porter's Value Chain Diagnostic
              </Typography>

              <JsonForms
                schema={schema}
                uischema={assessmentTwoUISchema}
                renderers={materialRenderers}
                cells={materialCells}
                data={formData}
                onChange={handleChange}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button variant="outlined" onClick={() => setStep(1)}>
                  Previous
                </Button>

                <Button variant="contained" color="success" onClick={handleSubmit}>
                  Submit
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}
