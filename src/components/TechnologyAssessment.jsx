import React from "react";
import { JsonForms } from "@jsonforms/react";
import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { CssBaseline, Container, Paper, Typography } from "@mui/material";

export default function TechnologyAssessment() {
  const schema = {
    type: "object",
    title: "Technology Assessment",
    required: ["hasProduct", "productStage"],
    properties: {
      hasProduct: {
        type: "string",
        title: "1. Do you have a product?",
        enum: ["Yes", "No" , "In Development"]
      },

      productStage: {
        type: "string",
        title: "2. At what stage is your product?",
        enum: ["Prototype" , "MVP" , "Full Product"]
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
              nft: { type: "boolean", title: "NFT" },            }
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
              vitualaugmentedReality: { type: "boolean", title: "Virtual/Augmented Reality" },
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
              nft: { type: "boolean", title: "NFT" },
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
              virtualaugmentedreality: {type: "boolean", title: "Virtual/Augmented Reality"},
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

  const uischema = {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/hasProduct" },
      { type: "Control", scope: "#/properties/productStage" },
      { type: "Control", scope: "#/properties/techChallenges" },

      {
        type: "Group",
        label: "Current Technologies",
        elements: [
          { type: "Control", scope: "#/properties/currentTechnologies" }
        ]
      },

      {
        type: "Group",
        label: "Future Technologies",
        elements: [
          { type: "Control", scope: "#/properties/futureTechnologies" }
        ]
      },

      { type: "Control", scope: "#/properties/roadmapFeatures" },
      { type: "Control", scope: "#/properties/hasCapabilities" },
      { type: "Control", scope: "#/properties/resourcesNeeded" }
    ]
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md" className="py-10">
        <Paper elevation={4} className="p-8 rounded-xl">
          <Typography variant="h4" gutterBottom>
            Technology Assessment
          </Typography>

          <JsonForms
            schema={schema}
            uischema={uischema}
            renderers={materialRenderers}
            cells={materialCells}
          />
        </Paper>
      </Container>
    </React.Fragment>
  );
}
